/**
 * SkillTag Component
 * Displays a skill as a tag with optional level indicator
 */
const SkillTag = ({ skill, level = null, hasSkill = true }) => {
  // Level color configurations
  const levelColors = {
    Expert: 'bg-green-100 text-green-700 border-green-200',
    Advanced: 'bg-blue-100 text-blue-700 border-blue-200',
    Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Beginner: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  // If skill gap comparison
  if (hasSkill !== undefined && !hasSkill) {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full text-sm">
        {skill}
        <span className="text-xs">✗</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${
        level ? levelColors[level] || levelColors.Beginner : 'bg-primary-100 text-primary-700 border-primary-200'
      }`}
    >
      {skill}
      {level && <span className="text-xs opacity-75">• {level}</span>}
    </span>
  );
};

export default SkillTag;
