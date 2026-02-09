/**
 * Express Application Setup
 * 
 * Configures middleware and routes
 */

const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth.routes");

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // Vite & CRA defaults
  credentials: true
}));
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

module.exports = app;
