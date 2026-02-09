/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the app
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { logout as authLogout, getIdToken } from './authService';

// Create the context
const AuthContext = createContext(null);

/**
 * AuthProvider component
 * Wraps the app and provides authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Get provider information
        const providers = firebaseUser.providerData.map(p => p.providerId);
        const hasPassword = providers.includes('password');
        const hasGoogle = providers.includes('google.com');
        
        // User is signed in
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          providers,
          hasPassword,
          hasGoogle,
          isGoogleOnly: hasGoogle && !hasPassword
        });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Refresh user data
  const refreshUser = () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      const providers = firebaseUser.providerData.map(p => p.providerId);
      const hasPassword = providers.includes('password');
      const hasGoogle = providers.includes('google.com');
      
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
        providers,
        hasPassword,
        hasGoogle,
        isGoogleOnly: hasGoogle && !hasPassword
      });
    }
  };

  // Logout function
  const logout = async () => {
    await authLogout();
    setUser(null);
  };

  // Get fresh token
  const getToken = async () => {
    return await getIdToken();
  };

  const value = {
    user,
    loading,
    logout,
    getToken,
    refreshUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @returns {object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
