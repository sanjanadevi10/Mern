// 📁 src/components/ExcelPreview.js
import React from 'react';

function ExcelPreview({ data }) {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <div>
      <h3>📄 Excel Data Preview</h3>
      <table border="1">
        <thead>
          <tr>
            {headers.map((header) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {headers.map((header) => <td key={header}>{row[header]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelPreview;