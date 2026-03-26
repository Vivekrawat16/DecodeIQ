const ROOM_STATES = {
    MATCHED: "MATCHED",
    READY: "READY",
    CODING: "CODING",
    RESULT: "RESULT",
};

const DURATION_SECONDS = 30 * 60; // 30 minutes

// In-Memory Room Store
const rooms = new Map();

export const setupRoomManager = (io, socket) => {

    // Helper to broadcast state
    const broadcastState = (roomId) => {
        const room = rooms.get(roomId);
        if (!room) return;
        io.to(roomId).emit("room:state_update", {
            state: room.state,
            endTime: room.endTime,
            users: room.users,
        });
    };

    socket.on("room:join", ({ roomId }) => {
        socket.join(roomId);

        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                state: ROOM_STATES.MATCHED,
                users: [],
                submissions: {}, // { userId: { code, score, passed, time } }
                endTime: null,
            });
        }

        const room = rooms.get(roomId);

        // Add User (if not exists)
        const existingUser = room.users.find(u => u.userId === socket.userId);
        if (!existingUser) {
            room.users.push({
                socketId: socket.id,
                userId: socket.userId,
                username: socket.user.username,
                rating: socket.user.rating,
                status: "connected", // connected, ready, disconnected
                progress: 0, // 0-100% (test cases passed)
            });
        } else {
            existingUser.socketId = socket.id;
            existingUser.status = "connected";
        }

        // Auto-start if 2 users are present (Simulating 'READY' phase skipped for speed)
        if (room.users.length === 2 && room.state === ROOM_STATES.MATCHED) {
            room.state = ROOM_STATES.CODING;
            room.endTime = Date.now() + (DURATION_SECONDS * 1000);

            console.log(`Room ${roomId}: Starting Match!`);
        }

        broadcastState(roomId);
    });

    // --- COMPETITIVE SIGNALS ---

    socket.on("signal:typing", ({ roomId, isTyping }) => {
        socket.to(roomId).emit("opponent:typing", { isTyping });
    });

    socket.on("signal:focus", ({ roomId, hasFocus }) => {
        // Anti-Cheat Logging could go here
        socket.to(roomId).emit("opponent:focus", { hasFocus });
    });

    // --- SUBMISSION ---

    socket.on("code:submit", async ({ roomId, code }) => {
        const room = rooms.get(roomId);
        if (!room || room.state !== ROOM_STATES.CODING) return;

        // TODO: Call Execution Service here
        // For now, mock a result
        const passed = Math.floor(Math.random() * 5);
        const total = 5;
        const isSuccess = passed === total;

        const result = {
            passed,
            total,
            success: isSuccess,
            runtime: Math.floor(Math.random() * 100) + "ms",
        };

        // Notify user
        socket.emit("code:result", result);

        // Notify opponent (without revealing code)
        socket.to(roomId).emit("opponent:progress", {
            passed,
            total,
            percent: (passed / total) * 100
        });

        // If success, mark finished
        if (isSuccess) {
            room.submissions[socket.userId] = {
                code,
                score: 100,
                time: Date.now(),
                ...result
            };

            // Check if game over (both finished or timeout logic)
            if (Object.keys(room.submissions).length === room.users.length) {
                room.state = ROOM_STATES.RESULT;
                broadcastState(roomId);
                io.to(roomId).emit("match:ended", { scores: room.submissions });
            }
        }
    });


    // --- CHAT ---
    socket.on("chat:send", ({ roomId, text }) => {
        const user = rooms.get(roomId)?.users.find(u => u.userId === socket.userId);
        socket.to(roomId).emit("chat:message", {
            text,
            sender: user ? user.username : "Opponent",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    });

    // --- WebRTC ---
    socket.on("signal", ({ roomId, signal, to }) => {
        io.to(to).emit("signal", { signal, from: socket.id });
    });

    socket.on("room:leave", ({ roomId }) => {
        const room = rooms.get(roomId);
        if (room) {
            const user = room.users.find(u => u.userId === socket.userId);
            if (user) user.status = "disconnected";
            broadcastState(roomId);
        }
    });
};
