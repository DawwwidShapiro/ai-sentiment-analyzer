
import React from 'react';
import type { AnalysisResult } from '../types';
import { SENTIMENT_CONFIG } from '../constants';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ConfidenceCircle: React.FC<{ confidence: number; color: string }> = ({ confidence, color }) => {
  const circumference = 2 * Math.PI * 45; // r=45
  const offset = circumference - confidence * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-orbitron text-2xl font-bold ${color}`}>
          {Math.round(confidence * 100)}%
        </span>
      </div>
    </div>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const config = SENTIMENT_CONFIG[result.sentiment];
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className={`w-full p-6 border ${config.borderColor} ${config.bgColor} rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-cyan-500/5`}>
      <div className="flex flex-col items-center gap-2">
        <div className={`${config.color}`}>{config.icon}</div>
        <p className={`font-orbitron text-2xl font-bold ${config.color}`}>{config.label}</p>
      </div>
      <div className="flex-grow flex flex-col md:flex-row items-center gap-6">
         <div className="flex-shrink-0">
            <ConfidenceCircle confidence={result.confidence} color={config.color} />
         </div>
         <div className="text-center md:text-left">
            <p className="text-gray-400">Confidence Score</p>
            <p className="text-lg text-gray-200 mt-1">{result.explanation}</p>
         </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
