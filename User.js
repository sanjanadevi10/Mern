const mongoose = require('mongoose');

// 1️⃣ User Schema define
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  resetToken: String,         // ✅ Forgot Password ku
  resetTokenExpiry: Date      // ✅ Forgot Password ku
}, {
  timestamps: true  // createdAt & updatedAt auto add aagum
});

// 2️⃣ Model export pannurathu
module.exports = mongoose.model('User', userSchema);