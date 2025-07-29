// src/pages/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = email input, 2 = OTP input
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage("❌ Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      if (res.data.success) {
        setStep(3); // show success message
      }
    } catch (err) {
      setMessage("❌ OTP verification failed.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>🔑 Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
          />
          <br />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: '10px', width: '200px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: '10px', width: '200px', marginBottom: '10px' }}
          />
          <br />
          <button onClick={handleVerifyOtp}>Verify OTP & Reset</button>
        </>
      )}

      {step === 3 && (
        <p style={{ color: 'green', marginTop: '20px' }}>✅ Password reset successful! You can now login.</p>
      )}

      {message && <p style={{ marginTop: '20px', color: '#1565c0' }}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;