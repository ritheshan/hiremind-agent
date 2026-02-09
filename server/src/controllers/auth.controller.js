/**
 * Authentication Controller
 * 
 * Handles user login/sync with MongoDB
 */

const User = require("../models/User");

/**
 * Login / Sync User
 * 
 * - If user doesn't exist → create new user
 * - If user exists → update providers if needed
 * 
 * @route POST /api/auth/login
 * @access Protected (requires Firebase token)
 */
const loginUser = async (req, res) => {
  try {
    // User info is attached by auth middleware
    const { uid, email, name, photoURL, emailVerified, provider } = req.user;
    
    // Find existing user by Firebase UID
    let user = await User.findOne({ firebaseUid: uid });
    
    if (user) {
      // User exists - update providers array if new provider
      const providerUpdated = !user.providers.includes(provider);
      
      if (providerUpdated) {
        user.providers.push(provider);
      }
      
      // Update other fields that might have changed
      user.email = email;
      user.name = name || user.name;
      user.photoURL = photoURL || user.photoURL;
      user.emailVerified = emailVerified;
      
      await user.save();
      
      console.log(`✅ User logged in: ${email} (provider: ${provider})`);
    } else {
      // Create new user
      user = await User.create({
        firebaseUid: uid,
        email,
        name,
        photoURL,
        providers: [provider],
        emailVerified
      });
      
      console.log(`✅ New user created: ${email}`);
    }
    
    // Return user data (excluding sensitive fields)
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
        providers: user.providers,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

/**
 * Get current user profile
 * 
 * @route GET /api/auth/me
 * @access Protected (requires Firebase token)
 */
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
        providers: user.providers,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  loginUser,
  getCurrentUser
};
