import { useState, useEffect, useRef, useCallback } from "react";
import { useSocket } from "../context/SocketContext";
import toast from "react-hot-toast";
import SimplePeer from "simple-peer";

// Public STUN servers — required for WebRTC to work across different browser tabs / machines
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

/**
 * useWebRTC
 * Manages WebRTC peer connection for a coding session.
 *
 * @param {string} inviteCode  - the session invite code (also the socket room key)
 * @param {boolean} isHost     - whether this user hosted the session
 * @param {string}  sessionId  - MongoDB session _id (for routing join-by-code users)
 */
export default function useWebRTC(inviteCode, isHost, sessionId) {
  const { socket } = useSocket();

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [messages, setMessages] = useState([]);

  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  // Queue signals that arrive before the peer is ready
  const pendingSignals = useRef([]);

  const drainPendingSignals = () => {
    while (pendingSignals.current.length > 0 && peerRef.current) {
      peerRef.current.signal(pendingSignals.current.shift());
    }
  };

  const createPeer = useCallback(
    (initiator, remotePeerSocketId, stream) => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }

      const peer = new SimplePeer({
        initiator,
        trickle: true,
        stream,
        config: ICE_SERVERS,
      });

      peer.on("signal", (signal) => {
        socket.emit("webrtc:signal", { to: remotePeerSocketId, signal });
      });

      peer.on("stream", (remote) => {
        setRemoteStream(remote);
        setIsConnected(true);
      });

      peer.on("connect", () => setIsConnected(true));

      peer.on("error", (err) => {
        console.error("Peer error:", err);
        // Don't show toast for non-user-facing ICE errors
        if (!err.message?.includes("Ice connection failed")) {
          toast.error("Video connection error: " + err.message);
        }
      });

      peer.on("close", () => {
        setIsConnected(false);
        setRemoteStream(null);
      });

      peerRef.current = peer;
      // Drain any signals that arrived before the peer was ready
      drainPendingSignals();
      return peer;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [socket]
  );

  useEffect(() => {
    if (!socket || !inviteCode) return;

    // Get camera + mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        localStreamRef.current = stream;

        if (isHost) {
          // Host announces room on socket — waits for peer to join
          socket.emit("session:create_room", {
            sessionId: sessionId || inviteCode,
            inviteCode,
          });

          // When peer joins the room, HOST initiates the WebRTC offer
          socket.on("session:peer_joined", ({ peerSocketId: pid }) => {
            createPeer(true, pid, stream);
          });
        } else {
          // Participant: announce presence in the room
          socket.emit("session:join_room", { inviteCode });

          // Backend tells us the host's socket id → create passive peer
          socket.on("session:joined_room", ({ hostSocketId }) => {
            createPeer(false, hostSocketId, stream);
          });
        }

        // Relay incoming WebRTC signals to SimplePeer
        // Buffer them if peer isn't ready yet to avoid dropped signals
        socket.on("webrtc:signal", ({ signal }) => {
          if (peerRef.current && !peerRef.current.destroyed) {
            peerRef.current.signal(signal);
          } else {
            pendingSignals.current.push(signal);
          }
        });

        socket.on("session:chat_message", (msg) => {
          setMessages((prev) => [...prev, msg]);
        });

        socket.on("session:error", ({ message }) => {
          toast.error(message);
        });
      })
      .catch((err) => {
        console.error("getUserMedia error:", err);
        toast.error("Could not access camera/microphone: " + err.message);
      });

    return () => {
      socket.off("session:peer_joined");
      socket.off("session:joined_room");
      socket.off("webrtc:signal");
      socket.off("session:chat_message");
      socket.off("session:error");

      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [socket, inviteCode, isHost, createPeer, sessionId]);

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim()) return;
      socket.emit("session:chat", { inviteCode, text });
      setMessages((prev) => [
        ...prev,
        {
          text,
          sender: "You",
          senderId: socket.id,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    },
    [socket, inviteCode]
  );

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const track = localStreamRef.current.getAudioTracks()[0];
      if (track) {
        track.enabled = !track.enabled;
        setIsAudioMuted(!track.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const track = localStreamRef.current.getVideoTracks()[0];
      if (track) {
        track.enabled = !track.enabled;
        setIsVideoMuted(!track.enabled);
      }
    }
  };

  const endCall = () => {
    socket.emit("session:end", { inviteCode });
    if (peerRef.current) peerRef.current.destroy();
    if (localStreamRef.current)
      localStreamRef.current.getTracks().forEach((t) => t.stop());
  };

  return {
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
  };
}
