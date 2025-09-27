// server/index.js
const express = require('express');
require('dotenv').config();

// --- Our Debug Line ---

const cors = require('cors');
const { initializeDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// --- Initialize Database ---
initializeDatabase();

// --- API Routes ---
app.use('/api/users', require('./routes/users'));

// --- Start Server ---
app.listen(PORT, 'localhost', () => {
  console.log(`🚀 Server is running on localhost:${PORT}`);
});