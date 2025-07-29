const express = require('express');
const router = express.Router();
const Upload = require('../models/Upload');
const auth = require('../middleware/auth'); // JWT auth middleware

router.get('/history', auth, async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.userId }).sort({ uploadedAt: -1 });
    res.json({ data: uploads });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});