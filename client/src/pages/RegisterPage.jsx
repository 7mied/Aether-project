// client/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  // useState hook to manage our form's data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Destructure for easier access
  const { name, email, password } = formData;

  // This function updates the state whenever a user types in an input field
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // This function runs when the form is submitted
  const onSubmit = async e => {
    e.preventDefault(); // Prevents the page from reloading on submit

    const newUser = {
      name,
      email,
      password,
    };

    try {
      // We need to configure the backend URL. For now, we'll hardcode it.
      // NOTE: Replace this with your actual Codespace forwarded URL for port 5000
      const backendUrl = 'https://YOUR-CODESPACE-FORWARDED-URL-FOR-PORT-5000.app.github.dev';
      
      const res = await axios.post(`${backendUrl}/api/users/register`, newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Success:', res.data);
      alert('Registration successful!');

    } catch (err) {
      console.error('Error:', err.response.data);
      alert('Error: ' + err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-8">Create Your Aether Account</h1>
      <form className="w-full max-w-md bg-gray-800 p-8 rounded-lg" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full bg-gray-700 text-white rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
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
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full bg-gray-700 text-white rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******************"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;