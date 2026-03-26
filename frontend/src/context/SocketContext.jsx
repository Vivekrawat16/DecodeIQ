import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const { authUser: user, isLoading } = useAuthContext();
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // isLoading=true means auth is still being fetched → wait
        // Only connect when auth is resolved AND a user exists
        if (isLoading || !user) return;

        const newSocket = io("http://localhost:3000", {
            auth: {
                user: {
                    id: user._id,
                    username: user.name || "Anonymous",
                    rating: 1200,
                },
            },
            reconnectionAttempts: 5,
            autoConnect: true,
        });

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
            setIsConnected(true);
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        newSocket.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            setSocket(null);
            setIsConnected(false);
        };
    }, [user, isLoading]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
