// src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    console.log(res.data);
    alert("✅ Login successful!");

    // ✅ Store token and isAdmin flag
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('isAdmin', res.data.isAdmin); // 👈 store isAdmin status

    // ✅ Redirect based on role
    if (res.data.isAdmin) {
      navigate('/admin'); // 👈 go to Admin Dashboard
    } else {
      navigate('/dashboard'); // 👈 go to User Dashboard
    }

  } catch (err) {
    setError('❌ Invalid email or password!');
  }
};

  return (
    <>
      <Navbar />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        background: '#e0f7fa'
      }}>
        <form onSubmit={handleSubmit} style={{
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          width: '300px'
        }}>
          <h2 style={{ color: '#00796b', textAlign: 'center' }}>🔐 Login</h2>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '1rem', borderRadius: '5px' }}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '0.5rem', borderRadius: '5px' }}
          />

          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <Link to="/forgot-password" style={{ fontSize: '14px', color: '#1565c0' }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#00796b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>

          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;