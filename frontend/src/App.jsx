import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";
import MockOAPage from "./pages/MockOAPage";
import Sidebar from "./components/Sidebar";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthContext } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import MatchPage from "./pages/MatchPage";
import RoomPage from "./pages/RoomPage";

function App() {
  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();
  const isPublicRoute = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  if (isLoading) return null;

  return (
    <SocketProvider>
      <div className="min-h-screen bg-base-200 text-base-content font-sans selection:bg-primary selection:text-white flex relative overflow-hidden">
        {/* Global Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#27272a 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}>
        </div>

        {/* Sidebar - Only show when signed in and not on home page */}
        {authUser && !isPublicRoute && <Sidebar />}

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto h-screen">
          <Routes>
            <Route path="/" element={!authUser ? <HomePage /> : <Navigate to={"/dashboard"} />} />
            <Route path="/login" element={!authUser ? <AuthPage /> : <Navigate to={"/dashboard"} />} />
            <Route path="/signup" element={!authUser ? <AuthPage /> : <Navigate to={"/dashboard"} />} />

            <Route path="/dashboard" element={authUser ? <DashboardPage /> : <Navigate to={"/"} />} />

            <Route path="/match" element={authUser ? <MatchPage /> : <Navigate to={"/"} />} />
            <Route path="/room/:roomId" element={authUser ? <RoomPage /> : <Navigate to={"/"} />} />

            <Route path="/problems" element={authUser ? <ProblemsPage /> : <Navigate to={"/"} />} />
            <Route path="/problem/:id" element={authUser ? <ProblemPage /> : <Navigate to={"/"} />} />
            <Route path="/session/:id" element={authUser ? <SessionPage /> : <Navigate to={"/"} />} />
            <Route path="/mock-oa" element={authUser ? <MockOAPage /> : <Navigate to={"/"} />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/"} />} />
          </Routes>
        </main>

        <Toaster toastOptions={{ duration: 3000 }} />
      </div>
    </SocketProvider>
  );
}

export default App;
