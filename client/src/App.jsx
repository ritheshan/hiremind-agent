/**
 * Main Application Component
 * Sets up routing for all pages
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, useAuth } from './auth';

// Landing & Auth Pages
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Dashboard & Main Pages
import DashboardPage from './pages/Dashboard/DashboardPage';
import ResumeAnalysisPage from './pages/Resume/ResumeAnalysisPage';
import JobDiscoveryPage from './pages/Jobs/JobDiscoveryPage';
import CoverLetterPage from './pages/CoverLetter/CoverLetterPage';
import ApplicationTrackingPage from './pages/Applications/ApplicationTrackingPage';
import SkillGapAnalysisPage from './pages/SkillGap/SkillGapAnalysisPage';
import InterviewPrepPage from './pages/Interview/InterviewPrepPage';
import MockInterviewPage from './pages/Interview/MockInterviewPage';
import ProfileSettingsPage from './pages/Profile/ProfileSettingsPage';
import AboutPage from './pages/About/AboutPage';

// PublicRoute - redirects authenticated users to dashboard
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// AppRoutes - component that uses hooks inside Router
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - redirect to dashboard if logged in */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/about-public" element={<AboutPage />} />

      {/* Protected Routes (Dashboard) */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/resume-analysis" element={<ProtectedRoute><ResumeAnalysisPage /></ProtectedRoute>} />
      <Route path="/job-discovery" element={<ProtectedRoute><JobDiscoveryPage /></ProtectedRoute>} />
      <Route path="/cover-letter" element={<ProtectedRoute><CoverLetterPage /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><ApplicationTrackingPage /></ProtectedRoute>} />
      <Route path="/skill-gap" element={<ProtectedRoute><SkillGapAnalysisPage /></ProtectedRoute>} />
      <Route path="/interview-prep" element={<ProtectedRoute><InterviewPrepPage /></ProtectedRoute>} />
      <Route path="/mock-interview" element={<ProtectedRoute><MockInterviewPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
