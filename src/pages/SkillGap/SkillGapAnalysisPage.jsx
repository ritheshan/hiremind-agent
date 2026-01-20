/**
 * Skill Gap Analysis Page
 * Compares user skills with job requirements and suggests learning areas
 */
import { 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Target,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProgressBar from '../../components/ui/ProgressBar';
import { skillGapData, resumeData } from '../../data/mockData';

const SkillGapAnalysisPage = () => {
  // Calculate skill match percentage
  const matchedSkills = skillGapData.requiredSkills.filter(s => s.userHas).length;
  const totalSkills = skillGapData.requiredSkills.length;
  const matchPercentage = Math.round((matchedSkills / totalSkills) * 100);

  // Get priority colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
        <p className="text-gray-600">Identify missing skills and discover learning paths</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Skill Match Score */}
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm font-medium">Skill Match Score</p>
              <p className="text-4xl font-bold mt-2">{matchPercentage}%</p>
              <p className="text-primary-100 text-sm mt-1">
                {matchedSkills} of {totalSkills} skills matched
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Skills You Have */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Skills You Have</p>
              <p className="text-2xl font-bold text-gray-900">{matchedSkills}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillGapData.requiredSkills
              .filter(s => s.userHas)
              .slice(0, 4)
              .map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
            {matchedSkills > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                +{matchedSkills - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Missing Skills</p>
              <p className="text-2xl font-bold text-gray-900">{totalSkills - matchedSkills}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillGapData.requiredSkills
              .filter(s => !s.userHas)
              .slice(0, 4)
              .map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Comparison */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Skill Comparison
          </h2>
          <div className="space-y-4">
            {skillGapData.requiredSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {skill.userHas ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-medium ${skill.userHas ? 'text-gray-900' : 'text-gray-500'}`}>
                    {skill.name}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  skill.userHas ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {skill.userHas ? 'Matched' : 'Missing'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Your Current Skills */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Your Skill Proficiency
          </h2>
          <div className="space-y-4">
            {resumeData.skills.slice(0, 7).map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  <span className="text-gray-500 text-sm">{skill.level}</span>
                </div>
                <ProgressBar 
                  value={
                    skill.level === 'Expert' ? 100 : 
                    skill.level === 'Advanced' ? 80 : 
                    skill.level === 'Intermediate' ? 60 : 40
                  }
                  color={
                    skill.level === 'Expert' ? 'green' : 
                    skill.level === 'Advanced' ? 'primary' : 'yellow'
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Recommendations */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Recommended Learning Paths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGapData.suggestedLearning.map((item, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                  {item.priority} Priority
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.skill}</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn {item.skill} to improve your job match score and career prospects.
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Suggested Resources:</p>
                {item.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {resource}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Banner */}
      <div className="card mt-8 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Improve Your Skill Match</h3>
              <p className="text-primary-100">
                Learning just 2 more skills can increase your match to 90%+
              </p>
            </div>
          </div>
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Learning
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillGapAnalysisPage;
