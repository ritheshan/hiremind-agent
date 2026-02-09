/**
 * Authentication Middleware
 * 
 * Verifies Firebase ID tokens and attaches user info to request
 */

const admin = require("../config/firebaseAdmin");

/**
 * Middleware to verify Firebase ID token
 * 
 * Expects: Authorization: Bearer <firebase-id-token>
 * Attaches: req.user with decoded token data
 */
const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization header must be: Bearer <token>"
      });
    }
    
    // Extract token from header
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }
    
    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach decoded user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.displayName || "",
      photoURL: decodedToken.picture || "",
      emailVerified: decodedToken.email_verified || false,
      // Get sign-in provider from token
      provider: decodedToken.firebase?.sign_in_provider || "unknown"
    };
    
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    
    // Handle specific Firebase errors
    if (error.code === "auth/id-token-expired") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      });
    }
    
    if (error.code === "auth/argument-error") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

module.exports = { verifyFirebaseToken };
