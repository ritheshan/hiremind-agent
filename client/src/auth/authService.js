/**
 * Firebase Authentication Service
 * 
 * Handles:
 * - Email + Password authentication
 * - Google Sign-In
 * - Provider linking for account conflicts
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  linkWithCredential,
  GoogleAuthProvider,
  EmailAuthProvider
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

// Backend API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

/**
 * Register a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{user: object, token: string}>}
 */
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    
    // Sync with backend
    await syncUserWithBackend(token);
    
    return { user, token };
  } catch (error) {
    // Handle email already in use
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Account already exists. Please login instead.");
    }
    throw error;
  }
};

/**
 * Login with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{user: object, token: string}>}
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    
    // Sync with backend
    await syncUserWithBackend(token);
    
    return { user, token };
  } catch (error) {
    // Provide user-friendly error messages
    if (error.code === "auth/user-not-found") {
      throw new Error("No account found with this email.");
    }
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password.");
    }
    if (error.code === "auth/invalid-credential") {
      throw new Error("Invalid email or password.");
    }
    throw error;
  }
};

/**
 * Sign in with Google
 * Handles account conflicts by requiring email/password login for linking
 * @returns {Promise<{user: object, token: string}>}
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();
    
    // Sync with backend
    await syncUserWithBackend(token);
    
    return { user, token };
  } catch (error) {
    // Handle account exists with different credential
    if (error.code === "auth/account-exists-with-different-credential") {
      // Extract pending credential from error
      const pendingCredential = GoogleAuthProvider.credentialFromError(error);
      const email = error.customData?.email;
      
      // Throw a custom error with credential info for the UI to handle
      const linkingError = new Error(
        "An account already exists with this email. Please login with your password to link your Google account."
      );
      linkingError.code = "auth/requires-linking";
      linkingError.pendingCredential = pendingCredential;
      linkingError.email = email;
      throw linkingError;
    }
    throw error;
  }
};

/**
 * Link Google credential to existing email/password account
 * Call this after user successfully logs in with email/password
 * @param {object} pendingCredential - The Google credential from the error
 * @returns {Promise<{user: object, token: string}>}
 */
export const linkGoogleAccount = async (pendingCredential) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently signed in.");
    }
    
    const linkedResult = await linkWithCredential(currentUser, pendingCredential);
    const user = linkedResult.user;
    const token = await user.getIdToken();
    
    // Sync with backend to update providers
    await syncUserWithBackend(token);
    
    return { user, token };
  } catch (error) {
    throw error;
  }
};

/**
 * Login with email/password and then link a pending Google credential
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {object} pendingCredential - The Google credential to link
 * @returns {Promise<{user: object, token: string}>}
 */
export const loginAndLinkGoogle = async (email, password, pendingCredential) => {
  // First, login with email/password
  await loginWithEmail(email, password);
  
  // Then link the Google credential
  return await linkGoogleAccount(pendingCredential);
};

/**
 * Sync user with backend after authentication
 * @param {string} token - Firebase ID token
 * @returns {Promise<object>} - User data from backend
 */
const syncUserWithBackend = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      console.error("Failed to sync with backend");
      return null;
    }
    
    const data = await response.json();
    return data.user;
  } catch (error) {
    // Log but don't throw - allow auth to succeed even if backend sync fails
    console.error("Backend sync error:", error);
    return null;
  }
};

/**
 * Sign out the current user
 */
export const logout = async () => {
  await auth.signOut();
};

/**
 * Get the current user
 * @returns {object|null} - Current user or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Get fresh ID token for the current user
 * @returns {Promise<string|null>} - ID token or null
 */
export const getIdToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

/**
 * Update user password
 * @param {string} currentPassword - Current password for re-authentication
 * @param {string} newPassword - New password
 */
export const updatePassword = async (currentPassword, newPassword) => {
  const { updatePassword: firebaseUpdatePassword, reauthenticateWithCredential, EmailAuthProvider } = await import('firebase/auth');
  
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error('No user is signed in');
  }
  
  // Re-authenticate user first
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  
  // Update password
  await firebaseUpdatePassword(user, newPassword);
};

/**
 * Update user profile (display name)
 * @param {string} displayName - New display name
 */
export const updateUserProfile = async (displayName) => {
  const { updateProfile } = await import('firebase/auth');
  
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user is signed in');
  }
  
  await updateProfile(user, { displayName });
};

/**
 * Link email/password to existing account (for Google-only users)
 * @param {string} password - Password to set
 */
export const linkEmailPassword = async (password) => {
  const { linkWithCredential, EmailAuthProvider } = await import('firebase/auth');
  
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error('No user is signed in');
  }
  
  const credential = EmailAuthProvider.credential(user.email, password);
  await linkWithCredential(user, credential);
  
  // Sync with backend
  const token = await user.getIdToken();
  await syncUserWithBackend(token);
};

/**
 * Send password reset email
 * @param {string} email - User's email
 */
export const sendPasswordReset = async (email) => {
  const { sendPasswordResetEmail } = await import('firebase/auth');
  await sendPasswordResetEmail(auth, email);
};
