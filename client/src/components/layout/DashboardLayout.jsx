/**
 * DashboardLayout Component
 * Layout wrapper for authenticated pages with sidebar
 */
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="ml-64 p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
