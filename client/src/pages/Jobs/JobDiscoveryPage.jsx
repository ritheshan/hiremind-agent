/**
 * Job Discovery Page
 * Displays recommended jobs based on user profile with filtering options
 */
import { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, SlidersHorizontal } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import JobCard from '../../components/ui/JobCard';
import { jobsData } from '../../data/mockData';

const JobDiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: 'all',
    matchPercentage: 'all',
    type: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on search and filters
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = filters.location === 'all' || job.location.includes(filters.location);
    
    const matchesPercentage = filters.matchPercentage === 'all' ||
      (filters.matchPercentage === 'high' && job.matchPercentage >= 80) ||
      (filters.matchPercentage === 'medium' && job.matchPercentage >= 60 && job.matchPercentage < 80) ||
      (filters.matchPercentage === 'low' && job.matchPercentage < 60);
    
    return matchesSearch && matchesLocation && matchesPercentage;
  });

  // Handle apply button click
  const handleApply = (job) => {
    alert(`Application submitted for ${job.role} at ${job.company}!`);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Discovery</h1>
        <p className="text-gray-600">AI-curated job opportunities matching your profile</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by role or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-primary-50' : ''}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="input-field"
              >
                <option value="all">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Seattle">Seattle</option>
              </select>
            </div>

            {/* Match Percentage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Match Level
              </label>
              <select
                value={filters.matchPercentage}
                onChange={(e) => setFilters({ ...filters, matchPercentage: e.target.value })}
                className="input-field"
              >
                <option value="all">All Matches</option>
                <option value="high">High Match (80%+)</option>
                <option value="medium">Medium Match (60-79%)</option>
                <option value="low">Low Match (&lt;60%)</option>
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Job Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="input-field"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Sort by:</span>
          <select className="border-none bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer">
            <option>Best Match</option>
            <option>Most Recent</option>
            <option>Salary (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default JobDiscoveryPage;
