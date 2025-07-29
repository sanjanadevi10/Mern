// 📁 src/components/ChartOptions.js
import React from 'react';

function ChartOptions({ data, xAxis, setXAxis, yAxis, setYAxis, chartType, setChartType, setChartVisible }) {
  const keys = Object.keys(data[0]);

  const handleVisualize = () => {
    if (xAxis && yAxis && chartType) {
      setChartVisible(true);
    } else {
      alert('Please select all chart settings!');
    }
  };

  return (
    <div>
      <h3>🛠️ Select Chart Configuration</h3>
      
      <label>X Axis:</label>
      <select onChange={(e) => setXAxis(e.target.value)} value={xAxis}>
        <option value="">--Select--</option>
        {keys.map((key) => <option key={key}>{key}</option>)}
      </select>

      <br /><br />

      <label>Y Axis:</label>
      <select onChange={(e) => setYAxis(e.target.value)} value={yAxis}>
        <option value="">--Select--</option>
        {keys.map((key) => <option key={key}>{key}</option>)}
      </select>

      <br /><br />

      <label>Chart Type:</label>
      <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
        <option>Bar</option>
        <option>Line</option>
        <option>Pie</option>
      </select>

      <br /><br />

      <button onClick={handleVisualize}>Visualize</button>
    </div>
  );
}

export default ChartOptions;