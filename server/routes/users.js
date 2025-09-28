// server/routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ msg: "User registered successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// server/routes/users.js

// ... (your existing '/register' route is above this) ...

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // 2. Compare the submitted password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // 3. If credentials are correct, create and return a JSON Web Token (JWT)
    const payload = {
      user: {
        id: user.id,
      },
    };

    // We need a JWT Secret stored in our Secrets tab
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ... (module.exports = router; is below this) ...

module.exports = router;
