import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import { useSocket } from "../context/SocketContext";
import { sessionApi } from "../api/sessions";
import toast from "react-hot-toast";

import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import {
  Shuffle,
  KeyRound,
  Loader2Icon,
  ArrowRightIcon,
  XIcon,
} from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const { authUser: user } = useAuthContext();
  const { socket } = useSocket();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [showJoinCode, setShowJoinCode] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [isJoiningCode, setIsJoiningCode] = useState(false);

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;
    createSessionMutation.mutate(
      { problem: roomConfig.problem, difficulty: roomConfig.difficulty.toLowerCase() },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  // Random Matchmaking via Socket
  const handleRandomMatch = () => {
    if (!socket) return;
    setIsMatchmaking(true);
    socket.emit("matchmaking:join");
  };

  const handleCancelMatchmaking = () => {
    if (!socket) return;
    socket.emit("matchmaking:leave");
    setIsMatchmaking(false);
  };

  // Join by invite code via REST lookup
  const handleJoinByCode = async (e) => {
    e.preventDefault();
    const code = joinCodeInput.trim().toUpperCase();
    if (!code) return;
    setIsJoiningCode(true);
    try {
      const { session } = await sessionApi.getSessionByCode(code);
      setShowJoinCode(false);
      setJoinCodeInput("");
      navigate(`/session/${session._id}`);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "No active session found for that code."
      );
    } finally {
      setIsJoiningCode(false);
    }
  };

  // Listen for random matchmaking result
  useEffect(() => {
    if (!socket) return;

    const onMatchFound = ({ roomId, opponent }) => {
      setIsMatchmaking(false);
      toast.success(`Matched with ${opponent.username}!`);
      // For competitive RoomPage-based match
      navigate(`/room/${roomId}`);
    };

    const onWaiting = () => {
      // Already handled by isMatchmaking state
    };

    socket.on("matchmaking:match_found", onMatchFound);
    socket.on("matchmaking:waiting", onWaiting);

    return () => {
      socket.off("matchmaking:match_found", onMatchFound);
      socket.off("matchmaking:waiting", onWaiting);
    };
  }, [socket, navigate]);

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user?._id) return false;
    return session.host?._id === user._id || session.participant?._id === user._id;
  };

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* Matchmaking Row */}
        <div className="container mx-auto px-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Random Match Card */}
            <div className="bg-base-100 rounded-2xl border border-base-content/10 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shuffle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">Random Match</h3>
                  <p className="text-xs text-base-content/60">
                    Get paired instantly with an active user
                  </p>
                </div>
              </div>

              {isMatchmaking ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 text-sm text-base-content/70">
                    <Loader2Icon className="w-4 h-4 animate-spin text-primary" />
                    Looking for an opponent…
                  </div>
                  <button
                    onClick={handleCancelMatchmaking}
                    className="btn btn-ghost btn-sm gap-1"
                  >
                    <XIcon className="w-4 h-4" /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRandomMatch}
                  className="btn btn-primary btn-sm gap-2 self-start"
                >
                  <Shuffle className="w-4 h-4" />
                  Find Match
                </button>
              )}
            </div>

            {/* Join by Code Card */}
            <div className="bg-base-100 rounded-2xl border border-base-content/10 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">Join with Code</h3>
                  <p className="text-xs text-base-content/60">
                    Enter an invite code to join a friend's session
                  </p>
                </div>
              </div>

              {showJoinCode ? (
                <form onSubmit={handleJoinByCode} className="flex items-center gap-2">
                  <input
                    className="input input-sm input-bordered flex-1 font-mono uppercase tracking-widest"
                    placeholder="e.g. AB12CD"
                    maxLength={8}
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                    autoFocus
                  />
                  <button type="submit" className="btn btn-secondary btn-sm gap-1" disabled={isJoiningCode}>
                    {isJoiningCode ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <ArrowRightIcon className="w-4 h-4" />}
                    Join
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowJoinCode(false); setJoinCodeInput(""); }}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowJoinCode(true)}
                  className="btn btn-secondary btn-sm gap-2 self-start"
                >
                  <KeyRound className="w-4 h-4" />
                  Enter Code
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;