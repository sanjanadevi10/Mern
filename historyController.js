// 📁 controllers/historyController.js

// Dummy Upload History Data
const dummyUploads = [
  {
    fileName: "students.xlsx",
    chartType: "Bar",
    xAxis: "Name",
    yAxis: "Marks",
    uploadedAt: "2025-07-25T16:30:02.164Z"
  },
  {
    fileName: "sales.xlsx",
    chartType: "Line",
    xAxis: "Month",
    yAxis: "Revenue",
    uploadedAt: "2025-07-24T14:10:00.000Z"
  },
  {
    fileName: "expenses.xlsx",
    chartType: "Pie",
    xAxis: "",
    yAxis: "",
    uploadedAt: "2025-07-23T11:45:30.000Z"
  }
];

// ✅ Get Upload History (Dummy)
exports.getUploadHistory = async (req, res) => {
  try {
    res.json({ data: dummyUploads });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};