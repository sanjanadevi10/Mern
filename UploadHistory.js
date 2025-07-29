import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UploadHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/upload');
        setHistory(res.data.data);
      } catch (err) {
        console.error("Error fetching history", err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#0d47a1' }}>📜 Upload History</h2>
      {history.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Chart Type</th>
              <th>X Axis</th>
              <th>Y Axis</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.fileName}</td>
                <td>{item.chartType}</td>
                <td>{item.xAxis}</td>
                <td>{item.yAxis}</td>
                <td>{new Date(item.uploadedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UploadHistory;