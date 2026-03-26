import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { Search, Users, Zap, Code2 } from "lucide-react";

export default function MatchPage() {
    const { socket, isConnected } = useSocket();
    const navigate = useNavigate();
    const [status, setStatus] = useState("idle"); // idle, searching, found

    useEffect(() => {
        if (!socket) return;

        socket.on("matchmaking:waiting", () => {
            setStatus("searching");
        });

        socket.on("matchmaking:match_found", ({ roomId, opponent }) => {
            setStatus("found");
            // Short delay to show "Found!" state
            setTimeout(() => {
                navigate(`/room/${roomId}`);
            }, 1500);
        });

        return () => {
            socket.off("matchmaking:waiting");
            socket.off("matchmaking:match_found");
        };
    }, [socket, navigate]);

    const handleFindMatch = () => {
        if (!isConnected) return alert("Socket not connected!");
        setStatus("searching");
        socket.emit("matchmaking:join");
    };

    const handleCancel = () => {
        setStatus("idle");
        socket.emit("matchmaking:leave");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6">
            <div className="max-w-2xl w-full text-center space-y-12">

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Competitive Pair Programming</h1>
                    <p className="text-lg text-base-content/60">
                        Match with a peer, solve problems real-time, and improve your rating.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-lg">
                        <div className="size-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
                            <Users className="size-6" />
                        </div>
                        <h3 className="font-bold mb-2">1 vs 1</h3>
                        <p className="text-sm text-base-content/60">Pair up with a random opponent of similar skill.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-lg">
                        <div className="size-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto mb-4">
                            <Zap className="size-6" />
                        </div>
                        <h3 className="font-bold mb-2">Live Coding</h3>
                        <p className="text-sm text-base-content/60">Real-time synchronized editor with video chat.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-lg">
                        <div className="size-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                            <Code2 className="size-6" />
                        </div>
                        <h3 className="font-bold mb-2">Rank Up</h3>
                        <p className="text-sm text-base-content/60">Win matches to increase your global ELO rating.</p>
                    </div>
                </div>

                <div className="relative">
                    {status === "idle" && (
                        <button
                            onClick={handleFindMatch}
                            className="px-12 py-6 rounded-full bg-primary text-white text-xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 mx-auto"
                        >
                            <Search className="size-6" />
                            Find Match
                        </button>
                    )}

                    {status === "searching" && (
                        <div className="flex flex-col items-center gap-6 animate-fade-in">
                            <div className="relative">
                                <div className="size-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl">🔍</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Searching for opponent...</h3>
                                <button
                                    onClick={handleCancel}
                                    className="text-sm text-base-content/60 hover:text-error transition-colors"
                                >
                                    Cancel Search
                                </button>
                            </div>
                        </div>
                    )}

                    {status === "found" && (
                        <div className="flex flex-col items-center gap-6 animate-fade-in-up">
                            <div className="size-24 rounded-full bg-success/20 text-success flex items-center justify-center">
                                <Users className="size-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-success">Match Found!</h3>
                            <p className="text-base-content/60">Redirecting to room...</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
