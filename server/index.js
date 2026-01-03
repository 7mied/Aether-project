const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  // Ensure this matches your live frontend URL exactly
  origin: "https://aether-frontend.onrender.com",
};

// --- Middleware ---
app.use(cors(corsOptions));
app.use(express.json());

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
  .catch((err) => console.error("❌ Error connecting to MongoDB Atlas:", err));

// --- API Routes ---
app.use("/api/users", require("./routes/users"));
app.use("/api/projects", require("./routes/projects"));
// NEW: Register the AI routes
app.use("/api/ai", require("./routes/ai"));
// NEW: Register the Task routes ✨
app.use("/api/tasks", require("./routes/tasks"));

// --- Root Route (Health Check) ---
app.get("/", (req, res) => {
  res.json({ message: "✅ Foreplan API is active and running!" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("--- UNHANDLED ERROR ---");
  console.error(err.stack);
  console.error("--- END UNHANDLED ERROR ---");
  res.status(500).send("Something broke!");
});

// --- Start The Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
