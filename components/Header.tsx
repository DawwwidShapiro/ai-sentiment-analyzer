
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 z-10">
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyan-300">
        Sentiment Analyzer
      </h1>
      <p className="text-gray-400 mt-2">
        Powered by <span className="text-cyan-400 font-semibold">Gemini API</span>
      </p>
    </header>
  );
};

export default Header;
