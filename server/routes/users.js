const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Added missing import
const User = require("../models/User");

// @route   POST api/users/register
router.post("/register", async (req, res) => {
  console.log("👉 Registration attempt started for:", req.body.email); // Log 1

  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("⚠️ User already exists"); // Log 2
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();
    console.log("✅ User saved to database!"); // Log 3

    res.status(201).json({ msg: "User registered successfully!" });
  } catch (err) {
    console.error("❌ REGISTRATION ERROR:", err.message); // Critical Log
    console.error(err); // Full error object
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
