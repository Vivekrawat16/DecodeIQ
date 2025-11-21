import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";
import MockOAPage from "./pages/MockOAPage";
import Sidebar from "./components/Sidebar";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();
  const isPublicRoute = location.pathname === "/";

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-base-200 text-base-content font-sans selection:bg-primary selection:text-white flex relative overflow-hidden">
      {/* Global Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#27272a 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}>
      </div>

      {/* Sidebar - Only show when signed in and not on home page */}
      {isSignedIn && !isPublicRoute && <Sidebar />}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto h-screen">
        <Routes>
          <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
          <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

          <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
          <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
          <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
          <Route path="/mock-oa" element={isSignedIn ? <MockOAPage /> : <Navigate to={"/"} />} />
        </Routes>
      </main>

      <Toaster toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
