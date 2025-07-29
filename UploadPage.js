import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("📎 Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/file/upload', formData);
      setResponse(res.data.rows);
      alert("✅ File uploaded & parsed successfully!");
    } catch (err) {
      alert("❌ Upload failed");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
        <h2 style={{ color: '#333', textAlign: 'center' }}>📁 Upload Excel File</h2>

        <form onSubmit={handleUpload} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '30px'
        }}>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button type="submit" style={{
            padding: '10px 20px',
            backgroundColor: '#00796b',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}>
            Upload
          </button>
        </form>

        {response && (
          <pre style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 0 5px rgba(0,0,0,0.1)'
          }}>
            {JSON.stringify(response.data, null, 2)}
          </pre>
        )}
      </div>
    </>
  );
};

export default UploadPage;