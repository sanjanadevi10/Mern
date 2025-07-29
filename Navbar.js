import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  

  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav className="navbar" style={{
      backgroundColor: '#0d47a1',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      {/* 🏠 Left: Home link */}
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
          🏠 Go Back to Home
        </Link>
      </div>

      {/* 🔐 Right: Admin/User Links & Logout */}
      {isLoggedIn && (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Show only for normal user */}
          {!isAdmin && (
            <Link to="/upload-history" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
              📜 Upload History
            </Link>
          )}

          {/* Show only for admin */}
          {isAdmin && (
            <Link to="/admin-dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
              🛠 Admin Dashboard
            </Link>
          )}

          <button onClick={handleLogout} style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;