# Authentication Setup Guide

This document explains the Firebase authentication setup in HireMind, covering both frontend and backend implementation.

## Overview

HireMind uses **Firebase Authentication** with two sign-in methods:
1. **Email/Password** - Traditional registration and login
2. **Google Sign-In** - OAuth-based authentication

The backend uses **Firebase Admin SDK** to verify tokens and sync user data to MongoDB.

---

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React App     │         │  Express Server │         │    MongoDB      │
│  (Firebase SDK) │ ──────► │ (Firebase Admin)│ ──────► │   (User Data)   │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                           │
        │     Firebase Auth         │
        └───────────┬───────────────┘
                    ▼
            ┌───────────────┐
            │   Firebase    │
            │   Console     │
            └───────────────┘
```

---

## Firebase Console Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name and follow setup wizard

### 2. Enable Authentication Methods
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (configure OAuth consent screen if prompted)

### 3. Get Web App Config
1. Go to **Project Settings** → **General**
2. Scroll to "Your apps" → Click web icon (`</>`)
3. Register app and copy the config object

### 4. Generate Service Account Key
1. Go to **Project Settings** → **Service accounts**
2. Click "Generate new private key"
3. Save the JSON file securely (never commit to git!)

---

## Frontend Files

### File Structure
```
client/src/
├── auth/
│   ├── index.js              # Barrel exports
│   ├── authService.js        # Firebase auth functions
│   ├── AuthContext.jsx       # React context for auth state
│   └── ProtectedRoute.jsx    # Route guard component
└── config/
    └── firebase.js           # Firebase app initialization
```

### `config/firebase.js`
Initializes the Firebase app with environment variables.

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

### `auth/authService.js`
Contains all authentication functions:

| Function | Description |
|----------|-------------|
| `registerWithEmail(email, password, displayName)` | Create new user with email/password |
| `loginWithEmail(email, password)` | Sign in with email/password |
| `loginWithGoogle()` | Sign in with Google popup |
| `loginAndLinkGoogle()` | Sign in with Google and link to existing account |
| `linkGoogleAccount()` | Link Google to current user |
| `linkEmailPassword(email, password)` | Add password to Google-only account |
| `logout()` | Sign out user |
| `getCurrentUser()` | Get current Firebase user |
| `getIdToken()` | Get JWT token for API calls |
| `updatePassword(currentPassword, newPassword)` | Change user password |
| `updateUserProfile({ displayName, photoURL })` | Update profile info |
| `sendPasswordReset(email)` | Send password reset email |

**Backend Sync**: After successful login, the frontend sends the Firebase ID token to the backend to sync user data:

```javascript
const syncWithBackend = async (user) => {
  const token = await user.getIdToken();
  await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    })
  });
};
```

### `auth/AuthContext.jsx`
Provides authentication state across the app:

```javascript
const value = {
  user,           // Current user object (null if not logged in)
  loading,        // True while checking auth state
  logout,         // Logout function
  getToken,       // Get fresh ID token
  refreshUser,    // Refresh user data from Firebase
  isAuthenticated // Boolean shorthand
};
```

**User Object Properties:**
```javascript
{
  uid: string,
  email: string,
  displayName: string | null,
  photoURL: string | null,
  emailVerified: boolean,
  providers: string[],      // ['password', 'google.com']
  hasPassword: boolean,     // Has email/password provider
  hasGoogle: boolean,       // Has Google provider
  isGoogleOnly: boolean     // Only Google, no password
}
```

### `auth/ProtectedRoute.jsx`
Wraps routes that require authentication:

```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

Redirects to `/login` if not authenticated.

---

## Backend Files

### File Structure
```
server/src/
├── config/
│   ├── db.js                 # MongoDB connection
│   └── firebaseAdmin.js      # Firebase Admin initialization
├── middleware/
│   └── auth.middleware.js    # Token verification middleware
├── controllers/
│   └── auth.controller.js    # Auth route handlers
├── models/
│   └── User.js               # Mongoose user model
└── routes/
    └── auth.routes.js        # Auth API routes
```

### `config/firebaseAdmin.js`
Initializes Firebase Admin SDK:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
```

### `middleware/auth.middleware.js`
Verifies Firebase ID tokens:

```javascript
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### `models/User.js`
MongoDB user schema:

```javascript
const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: String,
  photoURL: String,
  providers: [String],
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});
```

### API Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Sync user data after Firebase login | Yes |

---

## Environment Variables

### Client (`client/.env`)
```bash
# Firebase Web Config (from Firebase Console)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Backend API URL
VITE_API_URL=http://localhost:5001
```

### Server (`server/.env`)
```bash
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hiremind
FIREBASE_SERVICE_ACCOUNT_PATH=./src/etc/firebase-service-account-credentials.json
```

---

## Usage Examples

### Check if User is Logged In
```jsx
import { useAuth } from '../auth';

const MyComponent = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;

  return <div>Welcome, {user.displayName}</div>;
};
```

### Make Authenticated API Call
```jsx
const { getToken } = useAuth();

const fetchData = async () => {
  const token = await getToken();
  const res = await fetch('/api/protected-route', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
```

### Check Provider Type
```jsx
const { user } = useAuth();

if (user.isGoogleOnly) {
  // Show "Add Password" option
}

if (user.hasPassword) {
  // Show "Change Password" option
}
```

---

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that `VITE_FIREBASE_API_KEY` is set correctly in `.env`
- Ensure `.env` file is in `client/` folder
- Restart Vite dev server after changing `.env`

### "auth/popup-closed-by-user"
- User closed the Google sign-in popup
- Not an error, just handle gracefully

### Token Verification Fails on Backend
- Ensure service account JSON file path is correct
- Check that the service account is from the same Firebase project
- Verify the token hasn't expired (tokens last 1 hour)

### CORS Errors
- Backend must have CORS configured for frontend origin
- Check `server/src/app.js` CORS settings

---

## Security Notes

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Never commit service account JSON** - Keep secure
3. **Always verify tokens on backend** - Don't trust frontend claims
4. **Use HTTPS in production** - Required for secure cookies
5. **Set proper CORS origins** - Don't use `*` in production
