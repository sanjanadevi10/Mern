// 📁 ChartDisplay.js
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function ChartDisplay({ data, xAxis, yAxis, chartType }) {
  const chartRef = React.useRef();

  const chartData = {
    labels: data.map((row) => row[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: data.map((row) => row[yAxis]),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(chartRef.current);
    canvas.toBlob((blob) => {
      saveAs(blob, 'chart.png');
    });
  };

  return (
    <div>
      <h3>📈 Chart Output</h3>

      {/* 👇 Paste your chart conditionals here */}
      <div ref={chartRef} style={{ width: '600px', margin: 'auto' }}>
        {chartType === 'Bar' && <Bar data={chartData} />}
        {chartType === 'Line' && <Line data={chartData} />}
        {chartType === 'Pie' && <Pie data={chartData} />}
      </div>

      <button onClick={handleDownload}>Download PNG</button>
    </div>
  );
}

export default ChartDisplay;