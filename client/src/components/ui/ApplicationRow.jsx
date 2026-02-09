/**
 * ApplicationRow Component
 * Displays a single application in table format
 * Used on Application Tracking page
 */
import { Calendar, Building, Briefcase } from 'lucide-react';

const ApplicationRow = ({ application }) => {
  // Status color configurations
  const statusColors = {
    Applied: 'bg-blue-100 text-blue-700',
    'Under Review': 'bg-yellow-100 text-yellow-700',
    Interview: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
    Offer: 'bg-purple-100 text-purple-700',
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary-600" />
          </div>
          <span className="font-medium text-gray-900">{application.role}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Building className="w-4 h-4" />
          <span>{application.company}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(application.appliedDate)}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[application.status] || statusColors.Applied
          }`}
        >
          {application.status}
        </span>
      </td>
    </tr>
  );
};

export default ApplicationRow;
