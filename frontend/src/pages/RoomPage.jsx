import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import Editor from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { MicOff, VideoOff, PhoneOff, Code2, Send, Mic, Video } from "lucide-react";
import CompetitionHeader from "../components/Room/CompetitionHeader";
import ResultModal from "../components/Room/ResultModal";
import SimplePeer from "simple-peer";

export default function RoomPage() {
    const { roomId } = useParams();
    const { socket } = useSocket();
    const navigate = useNavigate();

    // State
    const [roomState, setRoomState] = useState("MATCHED");
    const [code, setCode] = useState("// Start coding your solution...");
    const [opponentStatus, setOpponentStatus] = useState({ isTyping: false });
    const [timeLeft, setTimeLeft] = useState(0);
    const [results, setResults] = useState(null);
    const [outcome, setOutcome] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [users, setUsers] = useState([]);

    // WebRTC
    const [stream, setStream] = useState(null);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const myVideo = useRef();
    const peerVideo = useRef();
    const connectionRef = useRef();

    // --- SOCKET HANDLERS ---
    const handleRoomState = useCallback((data) => {
        setRoomState(data.state);
        if (data.users) setUsers(data.users);
        if (data.endTime) setTimeLeft(Math.max(0, Math.floor((data.endTime - Date.now()) / 1000)));
    }, []);

    const handleOpponentProgress = useCallback((data) => setOpponentStatus(prev => ({ ...prev, ...data })), []);
    const handleOpponentTyping = useCallback(({ isTyping }) => setOpponentStatus(prev => ({ ...prev, isTyping })), []);

    const handleChatMessage = useCallback((msg) => {
        setMessages(prev => [...prev, msg]);
    }, []);

    const handleMatchEnded = useCallback(({ scores }) => {
        setRoomState("RESULT");
        const myId = socket.userId;
        const myScore = scores[myId];
        const opponentId = Object.keys(scores).find(id => id !== myId);
        if (myScore && scores[opponentId]) {
            setResults({ myScore, opponentScore: scores[opponentId] });
            if (myScore.passed > scores[opponentId].passed) setOutcome("WIN");
            else if (myScore.passed < scores[opponentId].passed) setOutcome("LOSS");
            else setOutcome("DRAW");
        }
    }, [socket]);

    // --- WEBRTC LOGIC ---
    const pendingSignals = useRef([]);

    useEffect(() => {
        if (!socket) return;

        const ICE_SERVERS = {
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
            ],
        };

        // 1. Get User Media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) myVideo.current.srcObject = currentStream;

                const makePeer = (initiator, toSocketId) => {
                    if (connectionRef.current) connectionRef.current.destroy();

                    const peer = new SimplePeer({
                        initiator,
                        trickle: true,
                        stream: currentStream,
                        config: ICE_SERVERS,
                    });

                    peer.on("signal", (signal) => {
                        socket.emit("webrtc:signal", { to: toSocketId, signal, roomId });
                    });

                    peer.on("stream", (remoteStream) => {
                        if (peerVideo.current) peerVideo.current.srcObject = remoteStream;
                    });

                    peer.on("error", (err) => console.error("Peer error:", err));
                    peer.on("connect", () => console.log("Peer connected!"));

                    connectionRef.current = peer;

                    // Drain buffered signals
                    while (pendingSignals.current.length > 0) {
                        peer.signal(pendingSignals.current.shift());
                    }
                };

                // When a NEW user joins our room → we are the initiator
                socket.on("room:user_joined", (newUser) => {
                    console.log("Peer joined, initiating call to:", newUser.socketId);
                    makePeer(true, newUser.socketId);
                });

                // Relay incoming WebRTC signals
                socket.on("webrtc:signal", (data) => {
                    if (connectionRef.current && !connectionRef.current.destroyed) {
                        connectionRef.current.signal(data.signal);
                    } else {
                        // Buffer signals until peer is created
                        pendingSignals.current.push(data.signal);
                        // If we haven't created a peer yet, create a passive one
                        if (!connectionRef.current) {
                            makePeer(false, data.from);
                        }
                    }
                });

            })
            .catch(err => console.error("Media Error:", err));

        return () => {
            if (connectionRef.current) connectionRef.current.destroy();
            if (stream) stream.getTracks().forEach(t => t.stop());
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, roomId]);

    // --- GENERAL EFFECTS ---
    useEffect(() => {
        if (!socket) return;
        socket.emit("room:join", { roomId });

        socket.on("room:state_update", handleRoomState);
        socket.on("opponent:typing", handleOpponentTyping);
        socket.on("opponent:progress", handleOpponentProgress);
        socket.on("chat:message", handleChatMessage);
        socket.on("match:ended", handleMatchEnded);

        socket.on("code:result", (res) => {
            console.log("Run Result:", res);
            setIsSubmitting(false);
            // Show toast or UI feedback for RUN
        });

        const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);

        return () => {
            socket.off("room:state_update");
            socket.off("opponent:typing");
            socket.off("opponent:progress");
            socket.off("chat:message");
            socket.off("match:ended");
            socket.off("code:result");
            clearInterval(timer);
        };
    }, [socket, roomId, handleRoomState, handleOpponentTyping, handleOpponentProgress, handleChatMessage, handleMatchEnded]);

    // --- ACTIONS ---
    const sendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const msg = {
            text: chatInput,
            sender: "Me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Optimistic update
        setMessages(prev => [...prev, msg]);
        socket.emit("chat:send", { roomId, text: chatInput });
        setChatInput("");
    };

    const handleRun = () => { setIsSubmitting(true); socket.emit("code:submit", { roomId, code }); };
    const handleSubmit = () => { if (confirm("Submit solution?")) { setIsSubmitting(true); socket.emit("code:submit", { roomId, code }); } };

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
            setIsAudioMuted(!isAudioMuted);
        }
    };
    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
            setIsVideoMuted(!isVideoMuted);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-base-300 relative">
            {roomState === "RESULT" && <ResultModal results={results} outcome={outcome} onRematch={() => window.location.reload()} />}

            <CompetitionHeader problemTitle="Two Sum" timeLeft={timeLeft} opponentStatus={opponentStatus} onRun={handleRun} onSubmit={handleSubmit} isSubmitting={isSubmitting} />

            <PanelGroup direction="horizontal" className="flex-1">
                {/* Helper Panel */}
                <Panel defaultSize={25} minSize={20} className="bg-base-100 p-6 overflow-y-auto border-r border-base-content/10">
                    <h2 className="text-2xl font-bold mb-4">Two Sum</h2>
                    <p className="opacity-80">Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices...</p>
                </Panel>

                <PanelResizeHandle className="w-1 bg-base-content/10 hover:bg-primary/50 transition-colors" />

                {/* Editor */}
                <Panel defaultSize={50} minSize={30} className="bg-[#1e1e1e]">
                    <Editor height="100%" defaultLanguage="javascript" theme="vs-dark" value={code}
                        onChange={(val) => {
                            setCode(val);
                            socket.emit("signal:typing", { roomId, isTyping: true });
                            setTimeout(() => socket.emit("signal:typing", { roomId, isTyping: false }), 1000);
                        }}
                        options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true }} />
                </Panel>

                <PanelResizeHandle className="w-1 bg-base-content/10 hover:bg-primary/50 transition-colors" />

                {/* Media Panel */}
                <Panel defaultSize={25} minSize={20} className="bg-base-200 flex flex-col">
                    <div className="h-64 bg-black p-1 grid grid-rows-2 gap-1">
                        <div className="relative bg-gray-900 rounded overflow-hidden">
                            <video ref={peerVideo} autoPlay playsInline className="w-full h-full object-cover" />
                            <div className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/50 px-1 rounded">Partner</div>
                        </div>
                        <div className="relative bg-gray-900 rounded overflow-hidden">
                            <video ref={myVideo} muted autoPlay playsInline className="w-full h-full object-cover" />
                            <div className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/50 px-1 rounded">You</div>
                            <div className="absolute bottom-1 right-1 flex gap-1">
                                <button onClick={toggleMute} className={`btn btn-circle btn-xs ${isAudioMuted ? 'btn-error' : 'btn-ghost'}`}>{isAudioMuted ? <MicOff size={10} /> : <Mic size={10} />}</button>
                                <button onClick={toggleVideo} className={`btn btn-circle btn-xs ${isVideoMuted ? 'btn-error' : 'btn-ghost'}`}>{isVideoMuted ? <VideoOff size={10} /> : <Video size={10} />}</button>
                            </div>
                        </div>
                    </div>

                    {/* Chat */}
                    <div className="flex-1 bg-base-100 flex flex-col border-t border-base-content/10">
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((m, i) => (
                                <div key={i} className={`chat ${m.sender === 'Me' ? 'chat-end' : 'chat-start'}`}>
                                    <div className={`chat-bubble text-xs ${m.sender === 'Me' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {messages.length === 0 && <div className="text-center text-xs opacity-50 mt-4">No messages yet</div>}
                        </div>
                        <form onSubmit={sendMessage} className="p-2 border-t border-base-content/10 flex gap-2">
                            <input className="input input-sm input-bordered flex-1" placeholder="Type..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
                            <button type="submit" className="btn btn-sm btn-ghost btn-circle"><Send size={14} /></button>
                        </form>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
}
