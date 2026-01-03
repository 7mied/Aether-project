import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // Backend URL
  const backendUrl = "https://aether-backend-3cnh.onrender.com";

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const res = await axios.post(`${backendUrl}/api/users/login`, user, {
        headers: { "Content-Type": "application/json" },
      });

      // 1. Save token
      localStorage.setItem("token", res.data.token);

      // 2. Navigate immediately (Removed the blocking alert)
      console.log("Navigating to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.msg || "Login failed.";
      alert(`Error: ${msg}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white p-4">
      <h1 className="text-5xl font-bold mb-8 text-cyan-400">
        Sign In to Foreplan
      </h1>
      <form
        className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-600 outline-none"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-cyan-600 outline-none"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg w-full transition"
            type="submit"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-500 hover:text-cyan-400 font-semibold"
            >
              Register Now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
