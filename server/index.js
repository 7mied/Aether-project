// server/index.js
// Final Version as of September 27, 2025

// --- Imports ---
const express = require("express");
require("dotenv").config(); // Loads secrets from the "Secrets" tab
const mongoose = require("mongoose");
const cors = require("cors");

// --- App Initialization ---
const app = express();
// Replit provides its own PORT, or we default to 3000
const PORT = process.env.PORT || 3000;

// --- CORS Configuration ---
// This is the crucial fix to allow your frontend to talk to your backend
const corsOptions = {
  // IMPORTANT: Replace this with your actual frontend URL if it changes!
  origin: "https://aether-frontend.onrender.com",
};

// --- Middleware ---
app.use(cors(corsOptions)); // Enable CORS with our specific options
app.use(express.json()); // Allow the server to accept and parse JSON data

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB Atlas:", err);
    process.exit(1); // Exit if we can't connect to the database
  });

// --- API Routes ---
// Any request to /api/users will be handled by the users.js file
app.use("/api/users", require("./routes/users"));

// --- Start The Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
}); // server/index.js
