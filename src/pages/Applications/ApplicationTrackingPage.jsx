/**
 * Application Tracking Page
 * Displays all job applications with status and filtering options
 */
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ApplicationRow from '../../components/ui/ApplicationRow';
import { applicationsData } from '../../data/mockData';

const ApplicationTrackingPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter applications based on search and status
  const filteredApplications = applicationsData.filter(app => {
    const matchesSearch = app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Applications', icon: BarChart3, count: applicationsData.length },
    { value: 'Applied', label: 'Applied', icon: CheckCircle, count: applicationsData.filter(a => a.status === 'Applied').length },
    { value: 'Under Review', label: 'Under Review', icon: Clock, count: applicationsData.filter(a => a.status === 'Under Review').length },
    { value: 'Interview', label: 'Interview', icon: MessageSquare, count: applicationsData.filter(a => a.status === 'Interview').length },
    { value: 'Rejected', label: 'Rejected', icon: XCircle, count: applicationsData.filter(a => a.status === 'Rejected').length },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Tracking</h1>
        <p className="text-gray-600">Monitor and manage all your job applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-blue-50 border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Applied</p>
              <p className="text-2xl font-bold text-blue-700">{applicationsData.filter(a => a.status === 'Applied').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="card bg-yellow-50 border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Under Review</p>
              <p className="text-2xl font-bold text-yellow-700">{applicationsData.filter(a => a.status === 'Under Review').length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="card bg-green-50 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Interviews</p>
              <p className="text-2xl font-bold text-green-700">{applicationsData.filter(a => a.status === 'Interview').length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="card bg-red-50 border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Rejected</p>
              <p className="text-2xl font-bold text-red-700">{applicationsData.filter(a => a.status === 'Rejected').length}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by role or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  statusFilter === option.value
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <option.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{option.label}</span>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs">{option.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card overflow-hidden">
        {filteredApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applied Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <ApplicationRow key={application.id} application={application} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Timeline View */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Timeline</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {applicationsData.slice(0, 4).map((app, index) => (
              <div key={app.id} className="relative flex items-start gap-6 pl-16">
                <div className={`absolute left-6 w-4 h-4 rounded-full -translate-x-1/2 ${
                  app.status === 'Interview' ? 'bg-green-500' :
                  app.status === 'Under Review' ? 'bg-yellow-500' :
                  app.status === 'Rejected' ? 'bg-red-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1 pb-6 border-b last:border-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{app.role}</p>
                      <p className="text-sm text-gray-600">{app.company}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                      <span className="text-sm text-gray-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === 'Interview' ? 'bg-green-100 text-green-700' :
                        app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationTrackingPage;
