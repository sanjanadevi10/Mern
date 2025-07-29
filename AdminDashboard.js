import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Admin Dashboard Error", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error("Fetch Users Error", err);
      }
    };

    fetchStats();
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== id));
      alert("✅ User deleted");
    } catch (err) {
      alert("❌ Failed to delete user");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Admin Dashboard</h2>

      {stats && (
        <ul>
          <li>Total Users: {stats.totalUsers}</li>
          <li>Total Uploads: {stats.totalUploads}</li>
          <li>Most Used Chart: {stats.mostUsedChartType}</li>
        </ul>
      )}

      <h3 style={{ marginTop: '2rem' }}>👥 All Users</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#1976d2', color: 'white' }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                {!u.isAdmin && (
                  <button onClick={() => handleDelete(u._id)} style={{
                    background: '#d32f2f', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px'
                  }}>
                    ❌ Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;