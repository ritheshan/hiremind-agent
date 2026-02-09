# HireMind - AI-Powered Job Search Assistant

An intelligent job search platform that helps users discover jobs, analyze resumes, generate cover letters, and prepare for interviews.

## Project Structure

```
hiremind1/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── auth/          # Firebase authentication module
│   │   ├── config/        # Firebase config
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── data/          # Mock data
│   └── public/            # Static assets
├── server/                 # Express.js backend
│   └── src/
│       ├── config/        # DB & Firebase Admin config
│       ├── controllers/   # Route controllers
│       ├── middleware/    # Auth middleware
│       ├── models/        # Mongoose models
│       └── routes/        # API routes
└── n8n/                    # n8n workflow automation
    └── docker-compose.yml
```

## Tech Stack

### Frontend
- **React 18** with Vite
- **TailwindCSS** for styling
- **React Router v6** for navigation
- **Firebase Web SDK** for authentication
- **Lucide React** for icons

### Backend
- **Express.js** server
- **MongoDB** with Mongoose ODM
- **Firebase Admin SDK** for token verification

### Automation
- **n8n** for workflow automation (Docker)

## Current Features

### ✅ Implemented

**Authentication**
- Email/Password registration and login
- Google Sign-In
- Session persistence (stay logged in)
- Protected routes
- Profile management with password change
- Provider linking (add password to Google-only accounts)

**UI Pages**
- Landing page
- Login & Register pages (minimalistic design)
- Dashboard with user stats
- Resume Analysis page (UI only)
- Job Discovery page (UI only)
- Cover Letter Generator page (UI only)
- Application Tracking page (UI only)
- Skill Gap Analysis page (UI only)
- Interview Prep page (UI only)
- Mock Interview page (UI only)
- Profile Settings page

**Layout**
- Sidebar navigation
- Header with profile dropdown
- Random profile picture assignment

### 🚧 Not Yet Implemented

- Resume parsing and analysis (AI integration)
- Job scraping and matching
- Cover letter generation (AI integration)
- Interview question generation
- Skill gap analysis logic
- Application status sync
- Email notifications
- n8n workflow integration

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Firebase project

### Installation

1. **Clone and install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

2. **Configure environment variables**
   ```bash
   # Client (.env)
   cp client/.env.example client/.env
   # Add your Firebase web config

   # Server (.env)
   cp server/.env.example server/.env
   # Add MongoDB URI and Firebase credentials path
   ```

3. **Start development servers**
   ```bash
   # Terminal 1 - Client (runs on port 5173)
   cd client
   npm run dev

   # Terminal 2 - Server (runs on port 5001)
   cd server
   npm run dev
   ```

## Documentation

- [Authentication Setup](./docs/AUTH.md) - Firebase auth configuration guide
- [n8n Setup](./docs/N8N.md) - Workflow automation setup

## Environment Variables

### Client (`client/.env`)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:5001
```

### Server (`server/.env`)
```
PORT=5001
MONGODB_URI=mongodb+srv://...
FIREBASE_SERVICE_ACCOUNT_PATH=./src/etc/firebase-service-account-credentials.json
```

## Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start with nodemon
- `npm start` - Start production server
