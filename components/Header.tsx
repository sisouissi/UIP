import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-[#2c3e50] to-[#34495e] text-white p-8 text-center rounded-t-2xl">
      <h1 className="text-3xl md:text-4xl font-light mb-2">🫁 Aide au diagnostic et à la prise en charge de la fibrose
pulmonaire idiopathique</h1>
      <p className="text-base md:text-lg opacity-90">
        <a 
          href="https://www.thoracic.org/statements/resources/interstitial-lung-disease/diagnosis-IPF-full-length.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-300 transition-colors duration-200"
        >
          Outil d'aide au diagnostic basé sur les recommandations ATS/ERS/JRS/ALAT 2018
        </a>
      </p>
    </header>
  );
};