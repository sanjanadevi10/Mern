// 📁 controllers/authController.js

const jwt = require('jsonwebtoken');
console.log("JWT_SECRET",process.env.JWT_SECRET);
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// ✅ SIGNUP Controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
     process.env.JWT_SECRET,
     { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User registered successfully!',
      token,
      isAdmin: newUser.isAdmin,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// ✅ LOGIN Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Login attempt: ", email, password);  // ✅ Debug

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid credentials!" });
    }

   const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    "testsecret123",
   { expiresIn: '30d' }
   );

    console.log("✅ Login successful");

    res.json({
      token,
      isAdmin: user.isAdmin,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};