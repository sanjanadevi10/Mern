const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({}, { strict: false }); // allow dynamic Excel fields

module.exports = mongoose.model('Data', DataSchema);