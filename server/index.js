// server/index.js
const express = require('express');
require('dotenv').config();

// --- Our Debug Line ---


const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// --- Connect to MongoDB Atlas ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
  .catch(err => console.error("❌ Error connecting to MongoDB Atlas:", err));

// --- API Routes ---
app.use('/api/users', require('./routes/users'));

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});