/**
 * Register Page
 * Allows users to create a new account with resume upload and preferences
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Upload, 
  MapPin, 
  Briefcase,
  CheckCircle
} from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    resume: null,
    preferredRoles: [],
    experienceLevel: '',
    preferredLocations: [],
    agreeToTerms: false
  });

  // Available options for preferences
  const roleOptions = [
    'Software Engineer', 'Full Stack Developer', 'Frontend Developer',
    'Backend Developer', 'Data Scientist', 'Product Manager',
    'DevOps Engineer', 'UI/UX Designer', 'QA Engineer'
  ];

  const experienceLevels = ['Entry Level', 'Junior', 'Mid Level', 'Senior', 'Lead', 'Manager'];
  
  const locationOptions = [
    'Remote', 'San Francisco', 'New York', 'Seattle', 'Austin',
    'Boston', 'Los Angeles', 'Chicago', 'Denver', 'Atlanta'
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Navigate to dashboard (simulating successful registration)
      navigate('/dashboard');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  // Handle multi-select toggles
  const toggleSelection = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 text-white p-12 flex-col justify-between">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-10 h-10" />
            <span className="text-2xl font-bold">HireMind Agent</span>
          </Link>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Start Your Journey
          </h1>
          <p className="text-primary-100 text-lg mb-8">
            Create your account and let AI revolutionize your job search experience.
          </p>
          
          {/* Progress Steps */}
          <div className="space-y-4">
            {['Account Details', 'Upload Resume', 'Job Preferences'].map((stepName, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index + 1 ? 'bg-white text-primary-600' :
                  step === index + 1 ? 'bg-primary-500 border-2 border-white' :
                  'bg-primary-500'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className={step >= index + 1 ? 'text-white' : 'text-primary-200'}>
                  {stepName}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-primary-200 text-sm">
          © 2024 HireMind Agent. All rights reserved.
        </p>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <Brain className="w-10 h-10 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">HireMind</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 && 'Create Account'}
              {step === 2 && 'Upload Your Resume'}
              {step === 3 && 'Set Your Preferences'}
            </h2>
            <p className="text-gray-600">
              Step {step} of 3
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Account Details */}
            {step === 1 && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="input-field pl-12"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-12"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field pl-12 pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input-field pl-12"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Resume Upload */}
            {step === 2 && (
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    {formData.resume ? (
                      <div>
                        <p className="text-green-600 font-semibold mb-2">
                          <CheckCircle className="w-5 h-5 inline mr-2" />
                          {formData.resume.name}
                        </p>
                        <p className="text-sm text-gray-500">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 font-semibold mb-2">
                          Drag & drop your resume here
                        </p>
                        <p className="text-sm text-gray-500">
                          or click to browse (PDF, DOC, DOCX)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Your resume will be analyzed by AI to match you with relevant jobs
                </p>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <>
                {/* Preferred Roles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Preferred Roles (Select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {roleOptions.map(role => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleSelection('preferredRoles', role)}
                        className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                          formData.preferredRoles.includes(role)
                            ? 'bg-primary-100 border-primary-500 text-primary-700'
                            : 'border-gray-300 text-gray-600 hover:border-primary-300'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred Locations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Preferred Locations (Select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {locationOptions.map(location => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => toggleSelection('preferredLocations', location)}
                        className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                          formData.preferredLocations.includes(location)
                            ? 'bg-primary-100 border-primary-500 text-primary-700'
                            : 'border-gray-300 text-gray-600 hover:border-primary-300'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-primary-600">Terms of Service</a> and{' '}
                    <a href="#" className="text-primary-600">Privacy Policy</a>
                  </span>
                </label>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
              )}
              <button type="submit" className="flex-1 btn-primary">
                {step === 3 ? 'Create Account' : 'Continue'}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
