import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import useWebRTC from "../hooks/useWebRTC";
import { useAuthContext } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  SendIcon,
  MessageSquareIcon,
  LinkIcon,
  CheckIcon,
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import toast from "react-hot-toast";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authUser: user } = useAuthContext();
  const { socket } = useSocket();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const chatEndRef = useRef(null);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const inviteCode = session?.callId; // callId is now the invite code
  const isHost = session?.host?._id === user?._id;
  const isParticipant = session?.participant?._id === user?._id;

  const {
    localStream,
    remoteStream,
    isConnected,
    isAudioMuted,
    isVideoMuted,
    messages,
    toggleAudio,
    toggleVideo,
    sendMessage,
    endCall,
  } = useWebRTC(inviteCode, isHost, session?._id?.toString());

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Bind media streams to video elements
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Scroll chat to bottom when messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-join session if not host/participant
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // Redirect participant when session ends
  useEffect(() => {
    if (!socket) return;
    const handler = () => navigate("/dashboard");
    socket.on("session:ended", handler);
    return () => socket.off("session:ended", handler);
  }, [socket, navigate]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session?")) {
      endCall();
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  const handleLeaveSession = () => {
    endCall();
    navigate("/dashboard");
  };

  const copyInviteCode = () => {
    if (!inviteCode) return;
    navigator.clipboard.writeText(inviteCode);
    setCodeCopied(true);
    toast.success("Invite code copied!");
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage(chatInput);
    setChatInput("");
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL - CODE EDITOR & PROBLEM DETAILS */}
          <Panel defaultSize={55} minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM PANEL */}
              <Panel defaultSize={45} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-200">
                  <div className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-3xl font-bold text-base-content">
                          {session?.problem || "Loading..."}
                        </h1>
                        {problemData?.category && (
                          <p className="text-base-content/60 mt-1">{problemData.category}</p>
                        )}
                        <p className="text-base-content/60 mt-2">
                          Host: {session?.host?.name || "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap justify-end">
                        {/* Invite Code Badge */}
                        {inviteCode && (
                          <button
                            onClick={copyInviteCode}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-200 border border-base-content/10 text-sm hover:bg-base-300 transition"
                            title="Copy invite code"
                          >
                            {codeCopied ? (
                              <CheckIcon className="w-4 h-4 text-success" />
                            ) : (
                              <LinkIcon className="w-4 h-4 text-primary" />
                            )}
                            <span className="font-mono font-bold tracking-widest text-primary">
                              {inviteCode}
                            </span>
                          </button>
                        )}

                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(session?.difficulty)}`}
                        >
                          {session?.difficulty?.slice(0, 1).toUpperCase() +
                            session?.difficulty?.slice(1) || "Easy"}
                        </span>

                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-error btn-sm gap-2"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}

                        {!isHost && (
                          <button
                            onClick={handleLeaveSession}
                            className="btn btn-ghost btn-sm gap-2"
                          >
                            <LogOutIcon className="w-4 h-4" />
                            Leave
                          </button>
                        )}

                        {session?.status === "completed" && (
                          <span className="badge badge-ghost badge-lg">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {problemData?.description && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4">Description</h2>
                        <p className="text-base-content/90">{problemData.description.text}</p>
                        {problemData.description.notes?.map((note, idx) => (
                          <p key={idx} className="text-base-content/90 mt-2">{note}</p>
                        ))}
                      </div>
                    )}

                    {problemData?.examples?.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4">Examples</h2>
                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx}>
                              <p className="font-semibold mb-1">Example {idx + 1}</p>
                              <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                                <div className="flex gap-2">
                                  <span className="text-primary font-bold min-w-[70px]">Input:</span>
                                  <span>{example.input}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                                  <span>{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-2 border-t border-base-300 mt-2">
                                    <span className="text-base-content/60 text-xs">
                                      <span className="font-semibold">Explanation:</span>{" "}
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {problemData?.constraints?.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4">Constraints</h2>
                        <ul className="space-y-2">
                          {problemData.constraints.map((c, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <code className="text-sm">{c}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={55} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(v) => setCode(v)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* RIGHT PANEL - VIDEO & CHAT */}
          <Panel defaultSize={45} minSize={28}>
            <div className="h-full bg-base-200 flex flex-col">
              {/* Video Section */}
              <div className="relative bg-black grid grid-rows-2 gap-1 p-1" style={{ height: "52%" }}>
                {/* Remote Video */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                  {remoteStream ? (
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {isConnected ? (
                        <div className="text-center text-white/50">
                          <VideoOffIcon className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-xs">Partner's camera is off</p>
                        </div>
                      ) : (
                        <div className="text-center text-white/50">
                          <PhoneOffIcon className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-xs">
                            Waiting for partner to join...
                          </p>
                          {inviteCode && (
                            <p className="text-xs mt-1 font-mono text-primary">
                              Code: {inviteCode}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded">
                    Partner {isConnected && <span className="text-green-400">● Connected</span>}
                  </div>
                </div>

                {/* Local Video */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                  <video
                    ref={localVideoRef}
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded">
                    You
                  </div>
                  {/* Media Controls */}
                  <div className="absolute bottom-1 right-1 flex gap-1">
                    <button
                      onClick={toggleAudio}
                      className={`btn btn-circle btn-xs ${isAudioMuted ? "btn-error" : "btn-ghost text-white"}`}
                      title={isAudioMuted ? "Unmute mic" : "Mute mic"}
                    >
                      {isAudioMuted ? <MicOffIcon size={10} /> : <MicIcon size={10} />}
                    </button>
                    <button
                      onClick={toggleVideo}
                      className={`btn btn-circle btn-xs ${isVideoMuted ? "btn-error" : "btn-ghost text-white"}`}
                      title={isVideoMuted ? "Turn on camera" : "Turn off camera"}
                    >
                      {isVideoMuted ? <VideoOffIcon size={10} /> : <VideoIcon size={10} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Section */}
              <div className="flex-1 flex flex-col bg-base-100 border-t border-base-content/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-base-content/10">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <MessageSquareIcon className="w-4 h-4 text-primary" />
                    Session Chat
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {messages.length === 0 && (
                    <div className="text-center text-xs text-base-content/40 mt-4">
                      No messages yet. Say hello! 👋
                    </div>
                  )}
                  {messages.map((m, i) => {
                    const isMe = m.sender === "You";
                    return (
                      <div key={i} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                        <div className="chat-header text-[10px] opacity-50 mb-0.5">
                          {m.sender} · {m.time}
                        </div>
                        <div
                          className={`chat-bubble text-xs ${
                            isMe ? "chat-bubble-primary" : "chat-bubble-secondary"
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                <form
                  onSubmit={handleSendChat}
                  className="p-2 border-t border-base-content/10 flex gap-2"
                >
                  <input
                    className="input input-sm input-bordered flex-1"
                    placeholder="Type a message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-sm btn-primary btn-circle">
                    <SendIcon size={13} />
                  </button>
                </form>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;