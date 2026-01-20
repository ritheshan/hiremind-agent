/**
 * Mock Interview Page
 * Chat-style interface for AI-powered mock interviews
 */
import { useState } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  RefreshCw, 
  Star,
  MessageSquare,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ChatBubble from '../../components/ui/ChatBubble';
import { mockInterviewData } from '../../data/mockData';

const MockInterviewPage = () => {
  const [messages, setMessages] = useState(mockInterviewData);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'interviewer',
        message: "That's a great answer! You demonstrated good understanding of the concept. Let me ask you a follow-up question: How would you optimize your solution for better performance?"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle restart interview
  const handleRestart = () => {
    setMessages([mockInterviewData[0]]);
    setShowFeedback(false);
  };

  // Handle end interview
  const handleEndInterview = () => {
    setShowFeedback(true);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Interview</h1>
          <p className="text-gray-600">Practice with our AI-powered interviewer</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>15:42</span>
          </div>
          <button
            onClick={handleRestart}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            title="Restart Interview"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleEndInterview}
            className="btn-primary"
          >
            End Interview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <div className="card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Interviewer</h3>
                <p className="text-sm text-green-600">● Online</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg.message} type={msg.type} />
              ))}
            </div>

            {/* Input Area */}
            <div className="pt-4 border-t">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your answer..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-3 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isRecording ? 'Stop Recording' : 'Start Recording'}
                >
                  {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - Tips & Feedback */}
        <div className="space-y-6">
          {/* Interview Tips */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Quick Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                Take a moment to think before answering
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                Structure your answers clearly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                Use specific examples when possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                Ask for clarification if needed
              </li>
            </ul>
          </div>

          {/* Feedback Section (shown after interview ends) */}
          {showFeedback && (
            <div className="card bg-green-50 border-green-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Interview Feedback
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Overall Score</span>
                    <span className="font-bold text-green-600">8.5/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Communication</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Technical Accuracy</span>
                    <span className="text-green-600">Good</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Problem Solving</span>
                    <span className="text-yellow-600">Average</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">Key Observations:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Clear and structured responses</li>
                    <li>✓ Good examples from experience</li>
                    <li>△ Could improve on edge case handling</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Rate This Question */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Rate This Question</h3>
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <ThumbsUp className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Helpful</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <ThumbsDown className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Not Helpful</span>
              </button>
            </div>
          </div>

          {/* Interview Progress */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Interview Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <span className="text-gray-600 text-sm">Introduction ✓</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 text-sm font-bold">2</span>
                </div>
                <span className="text-gray-900 text-sm font-medium">Technical Round</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-bold">3</span>
                </div>
                <span className="text-gray-400 text-sm">Behavioral Questions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-bold">4</span>
                </div>
                <span className="text-gray-400 text-sm">Closing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MockInterviewPage;
