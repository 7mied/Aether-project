import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components
// Assuming Navbar exists based on previous steps, if not, you can remove it.
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

// Simple Homepage Component
const HomePage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <h1 className="text-5xl font-bold mb-4">Welcome to Foreplan</h1>
    <p className="text-xl text-gray-300">The project foresight system.</p>
  </div>
);

function App() {
  return (
    // The Router component MUST wrap everything that uses 'useNavigate' or 'Link'
    <Router>
      <Navbar />
      <Routes>
        {/* Note the use of <Element /> syntax - crucial for avoiding object errors */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
