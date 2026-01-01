import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Title/Logo - Updated to Foreplan */}
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400 hover:text-cyan-300"
        >
          Foreplan
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/login" className="hover:text-cyan-300">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md transition duration-150"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
