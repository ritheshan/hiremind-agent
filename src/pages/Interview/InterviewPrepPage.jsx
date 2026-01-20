/**
 * Interview Preparation Page
 * Displays interview questions by category with tabs
 */
import { useState } from 'react';
import { 
  HelpCircle, 
  Code, 
  Users, 
  Building,
  Search,
  BookmarkPlus,
  ChevronRight
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import QuestionCard from '../../components/ui/QuestionCard';
import { interviewQuestionsData } from '../../data/mockData';

const InterviewPrepPage = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [searchQuery, setSearchQuery] = useState('');

  // Tab configuration
  const tabs = [
    { id: 'technical', label: 'Technical', icon: Code, count: interviewQuestionsData.technical.length },
    { id: 'hr', label: 'HR Questions', icon: Users, count: interviewQuestionsData.hr.length },
    { id: 'company', label: 'Company-Specific', icon: Building, count: interviewQuestionsData.companySpecific.length },
  ];

  // Get current questions based on active tab
  const getQuestions = () => {
    const questionMap = {
      technical: interviewQuestionsData.technical,
      hr: interviewQuestionsData.hr,
      company: interviewQuestionsData.companySpecific,
    };
    const questions = questionMap[activeTab] || [];
    
    if (searchQuery) {
      return questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return questions;
  };

  const currentQuestions = getQuestions();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Preparation</h1>
        <p className="text-gray-600">Practice common interview questions across different categories</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-blue-50 border-blue-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-medium">Technical Questions</p>
              <p className="text-2xl font-bold text-blue-700">{interviewQuestionsData.technical.length}</p>
            </div>
          </div>
        </div>
        <div className="card bg-green-50 border-green-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-600 text-sm font-medium">HR Questions</p>
              <p className="text-2xl font-bold text-green-700">{interviewQuestionsData.hr.length}</p>
            </div>
          </div>
        </div>
        <div className="card bg-purple-50 border-purple-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-purple-600 text-sm font-medium">Company Questions</p>
              <p className="text-2xl font-bold text-purple-700">{interviewQuestionsData.companySpecific.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      {currentQuestions.length > 0 ? (
        <div className="space-y-4">
          {currentQuestions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-600">Try adjusting your search query</p>
        </div>
      )}

      {/* Practice CTA */}
      <div className="card mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Ready to Practice?</h3>
              <p className="text-green-100">
                Take a mock interview with our AI interviewer
              </p>
            </div>
          </div>
          <a
            href="/mock-interview"
            className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Mock Interview
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookmarkPlus className="w-5 h-5 text-primary-600" />
            Technical Interview Tips
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Think out loud while solving problems
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Ask clarifying questions before coding
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Consider edge cases and test your solution
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Discuss time and space complexity
            </li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookmarkPlus className="w-5 h-5 text-green-600" />
            Behavioral Interview Tips
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Use the STAR method (Situation, Task, Action, Result)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Prepare specific examples from your experience
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Be honest about failures and what you learned
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Research the company culture beforehand
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrepPage;
