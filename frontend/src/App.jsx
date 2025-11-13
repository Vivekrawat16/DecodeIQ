import { useState } from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
