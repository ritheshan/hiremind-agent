/**
 * Dashboard Page
 * Main page after login showing summary statistics and quick actions
 */
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  FileText,
  Search,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import { dashboardStats, applicationsData, jobsData } from '../../data/mockData';

const DashboardPage = () => {
  // Quick action items for the dashboard
  const quickActions = [
    { 
      title: 'Discover Jobs', 
      description: 'Find new opportunities matching your skills',
      icon: Search, 
      path: '/job-discovery',
      color: 'primary'
    },
    { 
      title: 'Update Resume', 
      description: 'Enhance your resume for better matches',
      icon: FileText, 
      path: '/resume-analysis',
      color: 'secondary'
    },
    { 
      title: 'Practice Interview', 
      description: 'Prepare with AI-powered mock interviews',
      icon: MessageSquare, 
      path: '/mock-interview',
      color: 'green'
    },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-600">
          Here's an overview of your job search progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Briefcase}
          title="Total Applied"
          value={dashboardStats.totalApplied}
          color="primary"
          trend={12}
        />
        <StatCard
          icon={Clock}
          title="In Progress"
          value={dashboardStats.inProgress}
          color="yellow"
        />
        <StatCard
          icon={Calendar}
          title="Interviews"
          value={dashboardStats.interviews}
          color="green"
          trend={5}
        />
        <StatCard
          icon={TrendingUp}
          title="Skill Gaps"
          value={dashboardStats.skillGaps}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    action.color === 'primary' ? 'bg-primary-100' :
                    action.color === 'secondary' ? 'bg-purple-100' :
                    'bg-green-100'
                  }`}>
                    <action.icon className={`w-6 h-6 ${
                      action.color === 'primary' ? 'text-primary-600' :
                      action.color === 'secondary' ? 'text-purple-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            <Link to="/applications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {applicationsData.slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{app.role}</p>
                  <p className="text-sm text-gray-600">{app.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === 'Interview' ? 'bg-green-100 text-green-700' :
                  app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                  app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Top Job Matches</h2>
            <Link to="/job-discovery" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {jobsData.slice(0, 4).map((job) => (
              <div key={job.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{job.role}</p>
                  <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  job.matchPercentage >= 90 ? 'bg-green-100 text-green-700' :
                  job.matchPercentage >= 75 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {job.matchPercentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Activity</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Activity chart visualization</p>
            <p className="text-sm">Shows your application trends over time</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
