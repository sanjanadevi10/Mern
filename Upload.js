const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  fileName: String,
  chartType: String,
  xAxis: String,
  yAxis: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Upload', uploadSchema);