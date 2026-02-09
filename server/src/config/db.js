/**
 * MongoDB Database Connection
 * 
 * Handles connection to MongoDB using Mongoose
 */

const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/hiremind";

const connectDB = async () => {
  try {
    console.log("mongodb uri:", MONGO_URI); // ✅ Log the MongoDB URI (for debugging)
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
