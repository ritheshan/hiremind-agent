/**
 * ChatBubble Component
 * Displays a chat message bubble
 * Used on Mock Interview page
 */
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message, type }) => {
  const isInterviewer = type === 'interviewer';

  return (
    <div
      className={`flex gap-3 ${isInterviewer ? 'justify-start' : 'justify-end'}`}
    >
      {/* Interviewer Avatar */}
      {isInterviewer && (
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary-600" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[70%] p-4 rounded-2xl ${
          isInterviewer
            ? 'bg-gray-100 text-gray-800 rounded-tl-none'
            : 'bg-primary-600 text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>
      </div>

      {/* User Avatar */}
      {!isInterviewer && (
        <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-secondary-600" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
