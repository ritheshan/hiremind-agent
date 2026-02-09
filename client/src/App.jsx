/**
 * Main Application Component
 * Sets up routing for all pages
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about-public" element={<AboutPage />} />

        {/* Protected Routes (Dashboard) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
        <Route path="/job-discovery" element={<JobDiscoveryPage />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        <Route path="/applications" element={<ApplicationTrackingPage />} />
        <Route path="/skill-gap" element={<SkillGapAnalysisPage />} />
        <Route path="/interview-prep" element={<InterviewPrepPage />} />
        <Route path="/mock-interview" element={<MockInterviewPage />} />
        <Route path="/profile" element={<ProfileSettingsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
