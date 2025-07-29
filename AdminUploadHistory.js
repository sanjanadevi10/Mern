// src/pages/AdminUploadHistory.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminUploadHistory = () => {
  const [uploads, setUploads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/uploads', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUploads(res.data.uploads);
      } catch (err) {
        alert('❌ Error fetching upload history!');
        console.error(err);
      }
    };

    fetchUploads();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#0d47a1', marginBottom: '1rem' }}>📄 All Uploads (Admin)</h2>

      <button onClick={() => navigate('/admin')} style={{
        padding: '8px 16px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '1rem',
        cursor: 'pointer'
      }}>
        ⬅️ Back to Admin Dashboard
      </button>

      <div style={{ overflowX: 'auto' }}>
        <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead style={{ background: '#e3f2fd' }}>
            <tr>
              <th>User Email</th>
              <th>File Name</th>
              <th>Chart Type</th>
              <th>X Axis</th>
              <th>Y Axis</th>
              <th>Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload, index) => (
              <tr key={index}>
                <td>{upload.userId?.email || 'N/A'}</td>
                <td>{upload.fileName}</td>
                <td>{upload.chartType}</td>
                <td>{upload.xAxis}</td>
                <td>{upload.yAxis}</td>
                <td>{new Date(upload.uploadedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUploadHistory;