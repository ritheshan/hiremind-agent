/**
 * About Project Page
 * Displays project information, tech stack, and team members
 */
import { 
  Brain, 
  Target, 
  Users, 
  Code,
  CheckCircle,
  Layers,
  Database,
  Cpu,
  Globe
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { teamMembers } from '../../data/mockData';

const AboutPage = () => {
  const location = useLocation();
  const isDashboard = location.pathname !== '/about-public';

  // Tech stack items
  const techStack = [
    { name: 'React.js', category: 'Frontend', icon: Code },
    { name: 'Tailwind CSS', category: 'Styling', icon: Layers },
    { name: 'Node.js', category: 'Backend', icon: Cpu },
    { name: 'Python', category: 'AI/ML', icon: Cpu },
    { name: 'MongoDB', category: 'Database', icon: Database },
    { name: 'REST API', category: 'Communication', icon: Globe },
  ];

  // Project objectives
  const objectives = [
    "Automate the job search process using AI and ML techniques",
    "Provide intelligent job recommendations based on user skills and preferences",
    "Generate personalized cover letters for each job application",
    "Offer skill gap analysis and learning path suggestions",
    "Enable AI-powered mock interviews for better preparation",
    "Track and manage job applications in a centralized dashboard"
  ];

  const content = (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 px-8 rounded-2xl mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 mb-6">
            <Brain className="w-8 h-8" />
            <span className="text-xl font-bold">HireMind Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Intelligent Career Automation System
          </h1>
          <p className="text-xl text-primary-100">
            A Final Year Engineering Project
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Problem Statement</h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          The traditional job search process is extremely time-consuming and inefficient. 
          Job seekers spend countless hours searching for relevant positions, customizing 
          resumes and cover letters for each application, and preparing for interviews. 
          This manual approach leads to missed opportunities, inconsistent applications, 
          and increased stress. There is a critical need for an intelligent automation 
          system that can streamline the entire job search process while maintaining 
          personalization and quality.
        </p>
      </div>

      {/* Objectives */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Project Objectives</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((objective, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-gray-700">{objective}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Layers className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">System Architecture</h2>
        </div>
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Frontend Layer</h3>
              <p className="text-gray-600 text-sm">
                React.js application with responsive UI, component-based architecture, 
                and state management for seamless user experience.
              </p>
            </div>
            
            {/* Backend Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Backend Layer</h3>
              <p className="text-gray-600 text-sm">
                Node.js/Express server handling API requests, user authentication, 
                and business logic processing.
              </p>
            </div>
            
            {/* AI/ML Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI/ML Layer</h3>
              <p className="text-gray-600 text-sm">
                Python-based ML models for resume parsing, job matching, 
                cover letter generation, and interview simulation.
              </p>
            </div>
          </div>
          
          {/* Architecture Diagram Placeholder */}
          <div className="mt-8 p-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-center text-gray-500">
              [System Architecture Diagram]
              <br />
              <span className="text-sm">User Interface → API Gateway → Microservices → Database & ML Models</span>
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Technology Stack</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((tech, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <tech.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{tech.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{tech.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Info */}
      <div className="card mt-8 bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div>
              <span className="font-medium">University:</span> Engineering College
            </div>
            <div>
              <span className="font-medium">Department:</span> Computer Science
            </div>
            <div>
              <span className="font-medium">Year:</span> 2024-2025
            </div>
            <div>
              <span className="font-medium">Guide:</span> Prof. Jane Smith
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render with appropriate layout
  if (isDashboard) {
    return <DashboardLayout>{content}</DashboardLayout>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {content}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
