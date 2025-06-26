
import React from 'react';
import { Question } from '../types';
import { LesionDescription } from './LesionDescription';
import { Option } from './Option';

interface QuestionGroupProps {
  question: Question;
  selectedValue: string;
  onChange: (name: string, value: string) => void;
}

export const QuestionGroup: React.FC<QuestionGroupProps> = ({ question, selectedValue, onChange }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <p className="font-semibold text-gray-800 mb-4 text-base">{question.id}. {question.text}</p>
      {question.lesion && <LesionDescription lesion={question.lesion} />}
      <div className="space-y-3">
        {question.options.map(option => (
          <Option
            key={option.value}
            option={option}
            name={question.name}
            isSelected={selectedValue === option.value}
            onChange={() => onChange(question.name, option.value)}
          />
        ))}
      </div>
    </div>
  );
};
