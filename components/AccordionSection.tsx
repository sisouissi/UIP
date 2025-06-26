
import React from 'react';
import { Section } from '../types';

interface AccordionSectionProps {
  section: Section;
  isActive: boolean;
  isCompleted: boolean;
  isInvalid: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ section, isActive, isCompleted, isInvalid, onToggle, children }) => {
  const headerClasses = [
    'flex justify-between items-center w-full text-left text-lg font-semibold text-white p-5 rounded-xl cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:-translate-y-0.5 transform',
    isInvalid ? 'bg-gradient-to-br from-red-500 to-red-700 animate-shake' : '',
    !isInvalid && isCompleted ? 'bg-gradient-to-br from-green-500 to-green-700' : '',
    !isInvalid && !isCompleted ? 'bg-gradient-to-br from-blue-500 to-blue-700' : '',
    isActive ? 'rounded-b-none' : '',
  ].join(' ');

  const contentClasses = [
    'overflow-hidden transition-all duration-500 ease-in-out',
    isActive ? 'max-h-[2000px]' : 'max-h-0'
  ].join(' ');
  
  const iconClasses = [
    'transition-transform duration-300 ease-in-out text-2xl',
    isActive ? 'rotate-180' : ''
  ].join(' ');

  return (
    <div>
      <div className={headerClasses} onClick={onToggle}>
        <div className="flex items-center">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 text-sm font-bold border-2 border-white ${isCompleted && !isInvalid ? 'bg-green-600 text-white' : 'bg-white text-blue-600'}`}>
            {section.id}
          </span>
          <span>{section.title}</span>
        </div>
        <div className={iconClasses}>▼</div>
      </div>
      <div className={contentClasses}>
        <div className="bg-gray-50 border-2 border-t-0 border-blue-500 rounded-b-xl p-4 md:p-6 space-y-6">
           {isInvalid && (
             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded-r-md text-sm">
                Veuillez répondre à toutes les questions de cette section.
             </div>
           )}
          {children}
        </div>
      </div>
    </div>
  );
};
