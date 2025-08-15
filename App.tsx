
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { analyzeSentiment } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import SentimentInput from './components/SentimentInput';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeSentiment(inputText);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze sentiment. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-between p-4 selection:bg-cyan-400/20">
       <div 
        className="absolute top-0 left-0 w-full h-full bg-grid-cyan-500/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0"
      ></div>
      <Header />
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 z-10 flex-grow">
        <SentimentInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onAnalyze={handleAnalysis}
          isLoading={isLoading}
        />
        {isLoading && <Loader />}
        {error && <div className="text-red-400 bg-red-900/50 border border-red-600 rounded-lg p-4 w-full text-center animate-pulse">{error}</div>}
        {analysisResult && !isLoading && <ResultDisplay result={analysisResult} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
