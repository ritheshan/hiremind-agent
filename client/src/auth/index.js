/**
 * Auth Module Exports
 */

// Auth service functions
export {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginAndLinkGoogle,
  linkGoogleAccount,
  logout,
  getCurrentUser,
  getIdToken
} from './authService';

// Auth context and hook
export { AuthProvider, useAuth } from './AuthContext';

// Protected route component
export { default as ProtectedRoute } from './ProtectedRoute';
