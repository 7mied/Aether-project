// server/index.js
const express = require('express');
require('dotenv').config();

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
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on 0.0.0.0:${PORT}`);
});

// Handle errors
server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
