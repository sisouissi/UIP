
import React from 'react';
import { Option as OptionType } from '../types';

interface OptionProps {
  option: OptionType;
  name: string;
  isSelected: boolean;
  onChange: () => void;
}

export const Option: React.FC<OptionProps> = ({ option, name, isSelected, onChange }) => {
  const labelClasses = [
    'flex items-center p-3.5 rounded-lg cursor-pointer transition-all duration-200 ease-in-out border-2',
    isSelected 
      ? 'bg-blue-100 border-blue-500 transform translate-x-1 shadow-sm' 
      : 'bg-gray-100 border-transparent hover:bg-gray-200 hover:border-gray-300'
  ].join(' ');

  return (
    <label className={labelClasses}>
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={isSelected}
        onChange={onChange}
        className="h-5 w-5 mr-3 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <span className="text-gray-800 text-sm">{option.label}</span>
    </label>
  );
};
