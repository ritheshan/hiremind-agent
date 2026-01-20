/**
 * Cover Letter Page
 * Displays AI-generated cover letter with editing and download options
 */
import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  RefreshCw, 
  Save,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { coverLetterData, jobsData } from '../../data/mockData';

const CoverLetterPage = () => {
  const [selectedJob, setSelectedJob] = useState(jobsData[0]);
  const [coverLetter, setCoverLetter] = useState(coverLetterData.template);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle download
  const handleDownload = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${selectedJob.company.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle regenerate
  const handleRegenerate = () => {
    // Simulate regeneration with slightly modified text
    setCoverLetter(coverLetterData.template.replace('5 years', '5+ years').replace('40%', '45%'));
    alert('Cover letter regenerated!');
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cover Letter</h1>
          <p className="text-gray-600">AI-generated personalized cover letters</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">Powered by AI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Job Selection */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Job</h2>
            <div className="space-y-3">
              {jobsData.slice(0, 5).map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedJob.id === job.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{job.role}</p>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    job.matchPercentage >= 90 ? 'bg-green-100 text-green-700' :
                    job.matchPercentage >= 75 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {job.matchPercentage}% Match
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Cover Letter Editor */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Cover Letter for {selectedJob.role}</h2>
                  <p className="text-sm text-gray-600">{selectedJob.company}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={handleRegenerate}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  title="Copy"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Cover Letter Content */}
            <div className="relative">
              {isEditing ? (
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full h-[500px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-sans text-gray-700 leading-relaxed"
                />
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg min-h-[500px]">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                    {coverLetter}
                  </pre>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-6 pt-6 border-t">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                {isEditing ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Done Editing
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Edit Cover Letter
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download as PDF
              </button>
            </div>
          </div>

          {/* Tips Card */}
          <div className="card mt-6 bg-blue-50 border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-3">💡 Pro Tips</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Personalize the opening paragraph with specific company details</li>
              <li>• Include quantifiable achievements from your experience</li>
              <li>• Keep the letter concise - ideally under one page</li>
              <li>• Proofread carefully before submitting</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoverLetterPage;
