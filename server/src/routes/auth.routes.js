/**
 * Authentication Routes
 * 
 * All routes are protected by Firebase token verification
 */

const express = require("express");
const router = express.Router();
const { verifyFirebaseToken } = require("../middleware/auth.middleware");
const { loginUser, getCurrentUser } = require("../controllers/auth.controller");

/**
 * @route   POST /api/auth/login
 * @desc    Login or register user (syncs Firebase user with MongoDB)
 * @access  Protected
 */
router.post("/login", verifyFirebaseToken, loginUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Protected
 */
router.get("/me", verifyFirebaseToken, getCurrentUser);

module.exports = router;
