const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: String, required: true },
  chart: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('History', historySchema);