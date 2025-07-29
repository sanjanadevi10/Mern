// src/pages/SignupPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setResponseMsg("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setResponseMsg(res.data.message || "✅ Registered successfully!");
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (err) {
      console.error("Signup error:", err);
      setResponseMsg(err.response?.data?.message || "❌ Registration failed.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {responseMsg && <div className="response-message">{responseMsg}</div>}

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Passwords 👁️
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignupPage;