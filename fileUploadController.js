const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const History = require('../models/History'); // 🔁 create this model

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const uploadFile = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // 🔐 Get user name from token or request (for now dummy name)
    const user = req.user?.name || 'Anonymous';

    // ✅ Save history in DB
    await History.create({
      user: user,
      chart: req.body.chartType || 'Bar', // receive from frontend
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString()
    });

    res.status(200).json({ message: 'Excel parsed!', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Excel parsing failed!', error: err.message });
  }
};

module.exports = {
  upload,
  uploadFile
};