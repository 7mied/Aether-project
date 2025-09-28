// client/src/pages/LoginPage.jsx

import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  // useState hook to manage our form's data for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure for easier access
  const { email, password } = formData;

  // This function updates the state whenever a user types in an input field
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // This function runs when the form is submitted
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on submit

    const user = {
      email,
      password,
    };

    try {
      // Use the same backendUrl as before. Replit keeps it consistent.
      // You can also move this to a central config file later.
      const backendUrl = "https://aether-backend-3cnh.onrender.com";

      const res = await axios.post(`${backendUrl}/api/users/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // On success, the server sends back a token. Let's see it!
      console.log("Login Success! Token:", res.data.token);
      alert("Login successful!");

      // In a real app, we would save this token (e.g., in localStorage)
      // and redirect the user to their dashboard. We'll do that next.
    } catch (err) {
      // If the credentials are wrong, the server sends a 400 error
      console.error("Login Error:", err.response.data);
      alert("Error: " + err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-8">Sign In to Aether</h1>
      <form
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full bg-gray-700 text-white rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full bg-gray-700 text-white rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******************"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
