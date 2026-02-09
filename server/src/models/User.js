/**
 * User Model
 * 
 * Stores user information synced from Firebase Auth
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Firebase UID - unique identifier from Firebase Auth
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    
    // User's email
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    
    // User's display name
    name: {
      type: String,
      default: ""
    },
    
    // Profile photo URL
    photoURL: {
      type: String,
      default: ""
    },
    
    // Auth providers (e.g., ["password", "google.com"])
    providers: {
      type: [String],
      default: []
    },
    
    // Email verification status
    emailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
