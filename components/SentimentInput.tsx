
import React from 'react';

interface SentimentInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const AnalyzeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm-1.023 15.023L6.99 13.036l1.414-1.414 2.573 2.573 5.599-5.599 1.414 1.414-7.013 7.013Z"/>
        <path d="M12.987 14.013 7 8.027l1.414-1.414 4.573 4.573 1.996-1.996 1.414 1.414-3.4 3.41Z"/>
    </svg>
);


const SentimentInput: React.FC<SentimentInputProps> = ({ value, onChange, onAnalyze, isLoading }) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <p className="text-center text-gray-400 max-w-lg">
        Enter a sentence, paragraph, or any text snippet below, and the AI will determine its emotional tone.
      </p>
      <div className="w-full p-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="e.g., 'The new quantum computer is astonishingly fast!'"
          className="w-full h-36 p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-200 placeholder-gray-500 transition-all duration-300 resize-none"
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-cyan-300 transition-all duration-300 bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
      >
        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-cyan-500 opacity-100 group-hover:-translate-x-8"></span>
        <span className="relative w-full text-left transition-colors duration-300 ease-in-out group-hover:text-gray-900 flex items-center justify-center gap-2">
            <AnalyzeIcon className="w-5 h-5" />
            {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
        </span>
        <span className="absolute inset-0 border-2 border-cyan-400 rounded-md"></span>
      </button>
    </div>
  );
};

export default SentimentInput;
