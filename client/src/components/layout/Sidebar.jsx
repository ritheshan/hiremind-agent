/**
 * Sidebar Component
 * Navigation sidebar for authenticated pages (dashboard, etc.)
 */
import { Link, useLocation } from 'react-router-dom';
import {
  Brain,
  LayoutDashboard,
  FileText,
  Search,
  Mail,
  ClipboardList,
  TrendingUp,
  HelpCircle,
  MessageSquare,
  User,
  Info,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Navigation items configuration
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/resume-analysis', icon: FileText, label: 'Resume Analysis' },
    { path: '/job-discovery', icon: Search, label: 'Job Discovery' },
    { path: '/cover-letter', icon: Mail, label: 'Cover Letter' },
    { path: '/applications', icon: ClipboardList, label: 'Applications' },
    { path: '/skill-gap', icon: TrendingUp, label: 'Skill Gap Analysis' },
    { path: '/interview-prep', icon: HelpCircle, label: 'Interview Prep' },
    { path: '/mock-interview', icon: MessageSquare, label: 'Mock Interview' },
    { path: '/profile', icon: User, label: 'Profile & Settings' },
    { path: '/about', icon: Info, label: 'About Project' },
  ];

  // Check if the current path matches the nav item
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-white h-screen fixed left-0 top-0 shadow-lg transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary-600 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900">HireMind</span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-8rem)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${
              isActive(item.path) ? 'sidebar-link-active' : 'sidebar-link'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
        <Link
          to="/"
          className="sidebar-link text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
