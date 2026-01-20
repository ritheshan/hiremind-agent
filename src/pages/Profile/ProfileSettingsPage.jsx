/**
 * Profile & Settings Page
 * User profile management, resume re-upload, and preferences
 */
import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Upload,
  Save,
  Shield,
  Bell,
  Eye,
  Trash2,
  Edit2,
  Camera
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { userData } from '../../data/mockData';

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    title: userData.title,
    roles: userData.preferences.roles,
    experienceLevel: userData.preferences.experienceLevel,
    locations: userData.preferences.locations
  });

  // Tab configuration
  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'preferences', label: 'Job Preferences', icon: Briefcase },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Available options
  const roleOptions = [
    'Software Engineer', 'Full Stack Developer', 'Frontend Developer',
    'Backend Developer', 'Data Scientist', 'Product Manager',
    'DevOps Engineer', 'UI/UX Designer'
  ];

  const locationOptions = [
    'Remote', 'San Francisco', 'New York', 'Seattle', 'Austin',
    'Boston', 'Los Angeles', 'Chicago'
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Photo Section */}
              <div className="card">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-primary-600" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
                    <p className="text-gray-600">{formData.title}</p>
                    <p className="text-gray-500 text-sm mt-1">{formData.email}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="md:ml-auto btn-secondary flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>

              {/* Personal Information Form */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="input-field pl-12 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
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
                        disabled={!isEditing}
                        className="input-field pl-12 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="input-field pl-12 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="input-field pl-12 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Title
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="input-field pl-12 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {/* Resume Section */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                  <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" className="hidden" />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-semibold mb-1">
                      Upload a new resume
                    </p>
                    <p className="text-sm text-gray-500">
                      Current: resume_john_doe.pdf
                    </p>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Job Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Job Preferences</h3>
                
                {/* Preferred Roles */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Roles
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {roleOptions.map(role => (
                      <button
                        key={role}
                        className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                          formData.roles.includes(role)
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
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Experience Level
                  </label>
                  <select className="input-field" value={formData.experienceLevel}>
                    <option>Entry Level</option>
                    <option>Junior</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                    <option>Lead</option>
                    <option>Manager</option>
                  </select>
                </div>

                {/* Preferred Locations */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Locations
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {locationOptions.map(location => (
                      <button
                        key={location}
                        className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                          formData.locations.includes(location)
                            ? 'bg-primary-100 border-primary-500 text-primary-700'
                            : 'border-gray-300 text-gray-600 hover:border-primary-300'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn-primary flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy & Security</h3>
                
                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Profile Visibility</p>
                        <p className="text-sm text-gray-600">Control who can see your profile</p>
                      </div>
                    </div>
                    <select className="border border-gray-300 rounded-lg px-4 py-2">
                      <option>Public</option>
                      <option>Recruiters Only</option>
                      <option>Private</option>
                    </select>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="btn-secondary">Enable</button>
                  </div>

                  {/* Change Password */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-600">Update your password regularly</p>
                    </div>
                    <button className="btn-secondary">Change</button>
                  </div>

                  {/* Delete Account */}
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">Delete Account</p>
                        <p className="text-sm text-red-600">Permanently delete your account and data</p>
                      </div>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                
                <div className="space-y-4">
                  {[
                    { title: 'New Job Matches', desc: 'Get notified when new jobs match your profile' },
                    { title: 'Application Updates', desc: 'Receive updates on your applications' },
                    { title: 'Interview Reminders', desc: 'Get reminders for upcoming interviews' },
                    { title: 'Weekly Summary', desc: 'Receive a weekly summary of your activity' },
                    { title: 'Product Updates', desc: 'Stay informed about new features' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettingsPage;
