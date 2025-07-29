import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // we will create this file for styling

function WelcomePage() {
  return (
    <div className="welcome-container">
      <nav className="top-nav">
        <div className="left-home">🏠 Home</div>

        <div className="right-buttons">
          <Link to="/login" className="nav-btn">🗝️ Login</Link>
          <Link to="/signup" className="nav-btn">👤 Signup</Link>
        
        </div>
      </nav>

      <div className="main-content">
        <h1>Welcome to <span className="king">Excel King 👑</span></h1>
        <p>Explore charts, insights and more!</p>

        <div className="features">
          <div className="feature-box">📤<br />Upload</div>
          <div className="feature-box">📈<br />Visualize</div>
          <div className="feature-box">🔍<br />Analyze</div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;