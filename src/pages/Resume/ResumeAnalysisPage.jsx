/**
 * Resume Analysis Page
 * Displays uploaded resume information, skills, and strength analysis
 */
import { 
  FileText, 
  Award, 
  Briefcase, 
  GraduationCap, 
  CheckCircle,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SkillTag from '../../components/ui/SkillTag';
import ProgressBar from '../../components/ui/ProgressBar';
import { resumeData } from '../../data/mockData';

const ResumeAnalysisPage = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis</h1>
          <p className="text-gray-600">AI-powered analysis of your resume</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="btn-secondary flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download
          </button>
        </div>
      </div>

      {/* Resume Strength Score */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-32 h-32 relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(resumeData.strength.score / 100) * 352} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{resumeData.strength.score}%</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Resume Strength</h2>
            <p className="text-gray-600 mb-4">{resumeData.strength.summary}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">{resumeData.strength.highlights.length} Strengths</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{resumeData.strength.improvements.length} Areas to Improve</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Skills & Experience */}
        <div className="lg:col-span-2 space-y-8">
          {/* Skills Section */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill, index) => (
                <SkillTag key={index} skill={skill.name} level={skill.level} />
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 bg-primary-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-primary-600 text-sm mb-1">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-2">{exp.duration}</p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            </div>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                    <p className="text-gray-500 text-sm">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Analysis Summary */}
        <div className="space-y-8">
          {/* Highlights */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Strengths
            </h3>
            <ul className="space-y-3">
              {resumeData.strength.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-600 text-sm">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Areas to Improve
            </h3>
            <ul className="space-y-3">
              {resumeData.strength.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-gray-600 text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skill Levels */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Skill Proficiency</h3>
            <div className="space-y-4">
              {resumeData.skills.slice(0, 5).map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-500">{skill.years} years</span>
                  </div>
                  <ProgressBar 
                    value={skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 80 : skill.level === 'Intermediate' ? 60 : 40} 
                    color={skill.level === 'Expert' ? 'green' : skill.level === 'Advanced' ? 'primary' : 'yellow'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeAnalysisPage;
