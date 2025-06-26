
import React from 'react';
import { Diagnosis } from '../types';

interface ResultsProps {
  result: Diagnosis;
}

export const Results: React.FC<ResultsProps> = ({ result }) => {
  return (
    <div className="mt-8">
      <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white p-6 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-light mb-3 text-center">{result.title}</h2>
        <p className="text-base md:text-lg leading-relaxed mb-6 text-center opacity-90">{result.description}</p>
        <div className="bg-white/10 p-5 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Recommandations ATS/ERS/JRS/ALAT 2018:</h3>
          <ul className="space-y-2 list-none">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-300 font-bold mr-3 mt-1">✓</span>
                <span className="opacity-95 leading-snug">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
