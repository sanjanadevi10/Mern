// 📁 server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// ✅ Print secret to confirm it's loaded (optional)
console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Route Imports
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/fileRoutes');
const dataRoutes = require('./routes/dataRoutes');
const historyRoutes = require('./routes/history');
const adminRoutes = require('./routes/admin');

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/file/upload', fileRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/uploads', historyRoutes);
app.use('/api/admin', adminRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected!'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Root Test Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});