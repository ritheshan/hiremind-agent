/**
 * Profile & Settings Page
 * User profile management, password change, and provider linking
 */
import { useState, useMemo } from 'react';
import { 
  User, 
  Mail, 
  Lock,
  Shield,
  Bell,
  Eye,
  Trash2,
  Edit2,
  Camera,
  Save,
  Link as LinkIcon,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../auth';
import { updatePassword, updateUserProfile, linkEmailPassword, sendPasswordReset } from '../../auth/authService';

// Available profile pictures in public folder
const PROFILE_PICTURES = [
  '/profile1.jpg',
  '/profile2.jpg',
  '/profile3.jpg',
  '/profile4.jpg'
];

// Generate a consistent random index based on user ID
const getProfilePicIndex = (userId) => {
  if (!userId) return 0;
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % PROFILE_PICTURES.length;
};

const ProfileSettingsPage = () => {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imgError, setImgError] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  
  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Link email/password form (for Google-only users)
  const [linkForm, setLinkForm] = useState({
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  // Get a consistent random profile picture based on user ID
  const defaultProfilePic = useMemo(() => {
    const index = getProfilePicIndex(user?.uid);
    return PROFILE_PICTURES[index];
  }, [user?.uid]);

  // Determine which image to show
  const profileImage = imgError || !user?.photoURL ? defaultProfilePic : user.photoURL;

  // Tab configuration
  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  // Show message helper
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await updateUserProfile({ displayName });
      await refreshUser();
      setIsEditing(false);
      showMessage('success', 'Profile updated successfully!');
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showMessage('success', 'Password updated successfully!');
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle linking email/password for Google-only users
  const handleLinkEmailPassword = async (e) => {
    e.preventDefault();
    
    if (linkForm.password !== linkForm.confirmPassword) {
      showMessage('error', 'Passwords do not match');
      return;
    }
    
    if (linkForm.password.length < 6) {
      showMessage('error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await linkEmailPassword(linkForm.email, linkForm.password);
      await refreshUser();
      setLinkForm({ email: user?.email || '', password: '', confirmPassword: '' });
      showMessage('success', 'Email/password login linked successfully!');
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset email
  const handleSendPasswordReset = async () => {
    setLoading(true);
    try {
      await sendPasswordReset(user?.email);
      showMessage('success', 'Password reset email sent! Check your inbox.');
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
        <p className="text-gray-600">Manage your account and security settings</p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {message.text}
        </div>
      )}

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

            {/* Provider Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase mb-3">Linked Accounts</p>
              <div className="space-y-2">
                {user?.hasGoogle && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                    <Check className="w-3 h-3 text-green-500 ml-auto" />
                  </div>
                )}
                {user?.hasPassword && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    Email/Password
                    <Check className="w-3 h-3 text-green-500 ml-auto" />
                  </div>
                )}
              </div>
            </div>
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
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                      onError={() => setImgError(true)}
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user?.displayName || 'User'}
                    </h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                      {user?.hasGoogle && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Google Account
                        </span>
                      )}
                      {user?.hasPassword && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          Email/Password
                        </span>
                      )}
                    </div>
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={!isEditing}
                        className="input-field pl-12 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Your display name"
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
                        value={user?.email || ''}
                        disabled
                        className="input-field pl-12 bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed directly. Contact support for assistance.
                    </p>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleProfileUpdate} 
                      disabled={loading}
                      className="btn-primary flex items-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password Section - Only for users with password provider */}
              {user?.hasPassword ? (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="input-field pl-12"
                          placeholder="Enter current password"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="input-field pl-12"
                          placeholder="Enter new password"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="input-field pl-12"
                          placeholder="Confirm new password"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary flex items-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                      Update Password
                    </button>
                  </form>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSendPasswordReset}
                      disabled={loading}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Forgot your current password? Send reset email
                    </button>
                  </div>
                </div>
              ) : (
                /* Link Email/Password Section - For Google-only users */
                <div className="card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <LinkIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Add Email/Password Login</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        You signed up with Google. Add a password to also sign in with email and password.
                      </p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleLinkEmailPassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={linkForm.email}
                          disabled
                          className="input-field pl-12 bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Create Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={linkForm.password}
                          onChange={(e) => setLinkForm(prev => ({ ...prev, password: e.target.value }))}
                          className="input-field pl-12"
                          placeholder="Create a password"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={linkForm.confirmPassword}
                          onChange={(e) => setLinkForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="input-field pl-12"
                          placeholder="Confirm password"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary flex items-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <LinkIcon className="w-5 h-5" />
                      )}
                      Link Email/Password
                    </button>
                  </form>
                </div>
              )}

              {/* Additional Security Options */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Options</h3>
                
                <div className="space-y-4">
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
