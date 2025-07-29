import React, { useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('Bar');
  const [chartReady, setChartReady] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
  if (!file) {
    alert("Please select a file!");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('xAxis', xAxis);
  formData.append('yAxis', yAxis);
  formData.append('chartType', chartType);

  try {
    const res = await axios.post('http://localhost:5000/api/file/upload', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log("Excel Response", res.data);
    setExcelData(res.data.rows);
    setChartReady(false);
    alert("✅ File uploaded successfully!");
  } catch (err) {
    console.error('Upload error:', err);
    alert("❌ Upload failed. Check backend connection.");
  }
};
 
  const handleVisualize = () => {
    if (xAxis && yAxis) {
      setChartReady(true);
    } else {
      alert("Please select both X and Y axis.");
    }
  };

  const downloadPNG = () => {
    const chart = document.getElementById('chartArea');
    html2canvas(chart).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'chart.png');
      });
    });
  };

  const getChartData = () => {
    const labels = excelData.map(row => row[xAxis]);
    const values = excelData.map(row => row[yAxis]);
    return {
      labels,
      datasets: [{
        label: `${yAxis} vs ${xAxis}`,
        data: values,
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ab47bc', '#ef5350'],
        borderColor: '#1e88e5',
        borderWidth: 1
      }]
    };
  };

  const renderChart = () => {
    const chartData = getChartData();
    switch (chartType) {
      case 'Bar': return <Bar data={chartData} />;
      case 'Line': return <Line data={chartData} />;
      case 'Pie': return <Pie data={chartData} />;
      default: return null;
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#f5faff', minHeight: '100vh' }}>
       {/* 🔝 Top Buttons */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
  
  {/* 🏠 Left Side - Home */}
  <button onClick={() => navigate('/home')} style={topBtnStyle}>
    🏠 Go Back to Home
  </button>

  {/* 👑 Center Title */}
  <h2 style={{ color: '#0d47a1', fontWeight: 'bold', fontSize: '24px', margin: 0 }}>
    👑 Welcome Excel King! Dashboard
  </h2>

  {/* 🚪 Right Side - Upload History + Logout */}
  <div style={{ display: 'flex', gap: '10px' }}>
    <button onClick={() => navigate('/upload-history')} style={{ ...topBtnStyle }}>
      📜 Upload History
    </button>
    <button onClick={handleLogout} style={{ ...topBtnStyle, background: '#d32f2f' }}>
      🚪 Logout
    </button>
  </div>

</div>
      {/* 📤 Upload Section */}
      <div style={{
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '600px',
        margin: 'auto'
      }}>
        <h2 style={{ color: '#0d47a1', textAlign: 'center' }}>📤 Upload Excel File</h2>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <br />
        <button onClick={handleUpload} style={uploadBtnStyle}>Upload</button>
      </div>

      {/* 📑 Show Excel Table */}
      {Array.isArray(excelData) && excelData.length > 0 && (
        <div style={{ maxHeight: '200px', overflow: 'auto', marginTop: '2rem', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
          <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                {Object.keys(excelData[0]).map((key, i) => (
                  <th key={i}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📈 Chart Options */}
      {Array.isArray(excelData) && excelData.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>📊 Data Visualization</h3>

          <label>X Axis:</label>
          <select onChange={(e) => setXAxis(e.target.value)} defaultValue="">
            <option disabled value="">--Select--</option>
            {Object.keys(excelData[0]).map((key, i) => (
              <option key={i} value={key}>{key}</option>
            ))}
          </select>

          <label style={{ marginLeft: '1rem' }}>Y Axis:</label>
          <select onChange={(e) => setYAxis(e.target.value)} defaultValue="">
            <option disabled value="">--Select--</option>
            {Object.keys(excelData[0]).map((key, i) => (
              <option key={i} value={key}>{key}</option>
            ))}
          </select>

          <label style={{ marginLeft: '1rem' }}>Chart Type:</label>
          <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
          </select>

          <button onClick={handleVisualize} style={{ marginLeft: '1rem' }}>Visualize</button>
        </div>
      )}
          {/* 📉 Render Chart + Download */}
      {chartReady && (
  <div id="chartArea" style={{ marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
    <div style={{ width: '100%', height: '400px' }}>
      {renderChart()}
    </div>
          <button onClick={downloadPNG} style={{ ...uploadBtnStyle, marginTop: '1rem' }}>
            ⬇️ Download as PNG
          </button>
        </div>
      )}
    </div>
  );
};

const topBtnStyle = {
  padding: '10px 20px',
  background: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const uploadBtnStyle = {
  padding: '10px 30px',
  background: '#00796b',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginTop: '1rem',
  cursor: 'pointer'
};

export default Dashboard;