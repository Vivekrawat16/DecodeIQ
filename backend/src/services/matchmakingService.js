import { v4 as uuidv4 } from 'uuid';

// In-Memory Queue (Replace with Redis List for Production)
const queue = [];

export const setupMatchmaking = (io, socket) => {
    socket.on("matchmaking:join", () => {
        // Prevent double queueing
        const existingIndex = queue.findIndex(u => u.socketId === socket.id);
        if (existingIndex !== -1) return;

        // console.log(`User joined queue: ${socket.user.username}`);

        // Add user to queue
        const player = {
            socketId: socket.id,
            userId: socket.userId,
            username: socket.user.username,
            rating: socket.user.rating || 1200, // Default rating
        };

        queue.push(player);

        // Check if we have a match
        if (queue.length >= 2) {
            const player1 = queue.shift();
            const player2 = queue.shift();

            const roomId = uuidv4();

            // Notify both players
            io.to(player1.socketId).emit("matchmaking:match_found", {
                roomId,
                opponent: { username: player2.username, userId: player2.userId }
            });

            io.to(player2.socketId).emit("matchmaking:match_found", {
                roomId,
                opponent: { username: player1.username, userId: player1.userId }
            });

            console.log(`Match created: ${roomId} (${player1.username} vs ${player2.username})`);
        } else {
            socket.emit("matchmaking:waiting");
        }
    });

    socket.on("matchmaking:leave", () => {
        const index = queue.findIndex(u => u.socketId === socket.id);
        if (index !== -1) {
            queue.splice(index, 1);
            // console.log(`User left queue: ${socket.user.username}`);
        }
    });

    socket.on("disconnect", () => {
        // Cleanup queue on disconnect
        const index = queue.findIndex(u => u.socketId === socket.id);
        if (index !== -1) {
            queue.splice(index, 1);
        }
    });
};
