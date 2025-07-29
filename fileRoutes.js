// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');

// Memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API endpoint for Excel upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);
    res.json({ rows }); // Send Excel data as response
  } catch (err) {
    res.status(500).json({ error: 'Failed to process file' });
  }
});

module.exports = router;