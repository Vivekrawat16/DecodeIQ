import { Server } from "socket.io";
import { ENV } from "../lib/env.js";
import { setupMatchmaking } from "../services/matchmakingService.js";
import { setupRoomManager } from "../services/roomManager.js";

export const setupSocketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: ENV.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    // --- AUTH MIDDLEWARE ---
    io.use((socket, next) => {
        const { user } = socket.handshake.auth;

        if (!user) {
            return next(new Error("Authentication error: No user provided"));
        }

        socket.user = user;
        socket.userId = user.id;
        next();
    });

    // In-memory map: inviteCode -> { hostSocketId, problem, difficulty }
    const sessionRooms = new Map();

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.user?.username} (${socket.id})`);

        // ------- MATCHMAKING (Random + Competitive Room) -------
        setupMatchmaking(io, socket);
        setupRoomManager(io, socket);

        // ------- SESSION ROOM: Join by Invite Code -------

        // Host creates a session room (after creating via REST API)
        socket.on("session:create_room", ({ sessionId, inviteCode }) => {
            socket.join(`session:${inviteCode}`);
            sessionRooms.set(inviteCode, {
                sessionId,
                hostSocketId: socket.id,
                participants: [socket.id],
            });
            socket.emit("session:room_created", { inviteCode });
        });

        // Participant joins by invite code
        socket.on("session:join_room", ({ inviteCode }) => {
            const room = sessionRooms.get(inviteCode);
            if (!room) {
                return socket.emit("session:error", { message: "Invalid invite code. Room not found." });
            }
            if (room.participants.length >= 2) {
                return socket.emit("session:error", { message: "Session is full." });
            }

            room.participants.push(socket.id);
            socket.join(`session:${inviteCode}`);

            // Notify host that peer joined (trigger WebRTC offer)
            io.to(room.hostSocketId).emit("session:peer_joined", {
                peerSocketId: socket.id,
                user: socket.user,
            });

            socket.emit("session:joined_room", {
                inviteCode,
                hostSocketId: room.hostSocketId,
                sessionId: room.sessionId,
            });
        });

        // ------- WebRTC SIGNALING -------
        // Relay SDP offer/answer and ICE candidates between two peers
        socket.on("webrtc:signal", ({ to, signal }) => {
            io.to(to).emit("webrtc:signal", {
                from: socket.id,
                signal,
            });
        });

        // ------- In-Session Chat (Socket.io messages) -------
        socket.on("session:chat", ({ inviteCode, text }) => {
            const msg = {
                text,
                sender: socket.user?.username || "Anonymous",
                senderId: socket.id,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            io.to(`session:${inviteCode}`).emit("session:chat_message", msg);
        });

        // ------- Session End -------
        socket.on("session:end", ({ inviteCode }) => {
            io.to(`session:${inviteCode}`).emit("session:ended");
            sessionRooms.delete(inviteCode);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            // Cleanup session rooms where this socket was host
            for (const [code, room] of sessionRooms.entries()) {
                if (room.hostSocketId === socket.id) {
                    io.to(`session:${code}`).emit("session:ended");
                    sessionRooms.delete(code);
                } else {
                    room.participants = room.participants.filter(id => id !== socket.id);
                }
            }
        });
    });

    return io;
};
