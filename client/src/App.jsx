import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage"; // <--- NEW IMPORT

// Simple Homepage Component
const HomePage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <h1 className="text-5xl font-bold mb-4">Welcome to Foreplan</h1>
    <p className="text-xl text-gray-300">The project foresight system.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* The Project Details Route */}
        {/* The :id part acts as a variable that we can read in the page */}
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
