/**
 * JobCard Component
 * Displays job information in a card format
 * Used on Job Discovery page
 */
import { MapPin, Building, DollarSign, Clock } from 'lucide-react';

const JobCard = ({ job, onApply }) => {
  // Determine match percentage color
  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200 hover:border-primary-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.role}</h3>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Building className="w-4 h-4" />
            <span>{job.company}</span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchColor(
            job.matchPercentage
          )}`}
        >
          {job.matchPercentage}% Match
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{job.posted}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{job.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.requiredSkills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={() => onApply && onApply(job)}
        className="w-full btn-primary"
      >
        Apply Automatically
      </button>
    </div>
  );
};

export default JobCard;
