/**
 * QuestionCard Component
 * Displays an interview question with category and difficulty
 * Used on Interview Preparation page
 */
const QuestionCard = ({ question, index }) => {
  // Difficulty color configurations
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        {/* Question Number */}
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-primary-600 font-semibold text-sm">{index + 1}</span>
        </div>

        {/* Question Content */}
        <div className="flex-1">
          <p className="text-gray-900 font-medium mb-3">{question.question}</p>
          <div className="flex flex-wrap gap-2">
            {/* Category Tag */}
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {question.category || question.company}
            </span>
            {/* Difficulty Tag */}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                difficultyColors[question.difficulty] || difficultyColors.Medium
              }`}
            >
              {question.difficulty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
