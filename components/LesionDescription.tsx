
import React from 'react';
import { Lesion } from '../types';

interface LesionDescriptionProps {
  lesion: Lesion;
}

export const LesionDescription: React.FC<LesionDescriptionProps> = ({ lesion }) => {
  return (
    <div className="bg-blue-50 p-4 border-l-4 border-blue-500 rounded-r-md mb-4">
      <h4 className="font-bold text-gray-800 text-base mb-2">{lesion.title}</h4>
      <p className="text-gray-700 text-sm mb-2 leading-relaxed">{lesion.details}</p>
      <p className="text-gray-600 text-sm italic leading-relaxed">{lesion.criteria}</p>
    </div>
  );
};
