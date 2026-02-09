/**
 * FeatureCard Component
 * Displays a feature with icon, title, and description
 * Used on landing page
 */
import * as Icons from 'lucide-react';

const FeatureCard = ({ title, description, icon }) => {
  // Dynamically get the icon component
  const IconComponent = Icons[icon] || Icons.Star;

  return (
    <div className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      {/* Icon */}
      <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
        <IconComponent className="w-7 h-7 text-primary-600" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
