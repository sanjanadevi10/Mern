// 📁 src/components/UploadForm.js
import React from 'react';
import axios from 'axios';

function UploadForm({ setExcelData }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/file/upload', formData);
      setExcelData(res.data.rows); // ✅ corrected
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Check backend connection or upload error');
    }
  };

  return (
    <div>
      <h3>📤 Upload Excel File</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  );
}

export default UploadForm;
