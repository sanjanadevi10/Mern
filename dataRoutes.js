const express = require('express');
const router = express.Router();
const Data = require('../models/Data'); // we'll create this model next

// 🔽 Route to receive uploaded Excel data
router.post('/upload', async (req, res) => {
  try {
    const excelData = req.body.data;

    if (!excelData || excelData.length === 0) {
      return res.status(400).json({ message: 'No data received!' });
    }

    // Remove existing data if needed (optional)
    await Data.deleteMany();

    // Insert new data
    await Data.insertMany(excelData);

    res.status(200).json({ message: 'Data uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
});

module.exports = router;