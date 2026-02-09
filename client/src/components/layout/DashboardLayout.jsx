/**
 * DashboardLayout Component
 * Layout wrapper for authenticated pages with sidebar
 */
import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../../auth';

// Available profile pictures in public folder
const PROFILE_PICTURES = [
  '/profile1.jpg',
  '/profile2.jpg',
  '/profile3.jpg',
  '/profile4.jpg'
];

// Generate a consistent random index based on user ID
const getProfilePicIndex = (userId) => {
  if (!userId) return 0;
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % PROFILE_PICTURES.length;
};

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);

  // Get a consistent random profile picture based on user ID
  const defaultProfilePic = useMemo(() => {
    const index = getProfilePicIndex(user?.uid);
    return PROFILE_PICTURES[index];
  }, [user?.uid]);

  // Determine which image to show
  const profileImage = imgError || !user?.photoURL ? defaultProfilePic : user.photoURL;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Top Header Bar */}
      <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-30 px-8 flex items-center justify-end">
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            {/* Profile Picture */}
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-9 h-9 rounded-full object-cover border-2 border-primary-200"
              onError={() => setImgError(true)}
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {user?.displayName || user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              
              <Link
                to="/profile"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Profile & Settings
              </Link>
              
              <hr className="my-2 border-gray-100" />
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="ml-64 pt-16 p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
