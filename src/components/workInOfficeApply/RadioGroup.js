import React from 'react';
import './RadioGroup.css';

export const RadioGroup = ({ 
  options, 
  selectedValue, 
  onChange, 
  name 
}) => {
  return (
    <div className="radio-group">
      {options.map((option) => (
        <div key={option} className="radio-group__item">
          <input
            type="radio"
            id={`${name}-${option}`}
            name={name}
            value={option}
            className="radio-group__input"
            checked={selectedValue === option}
            onChange={(e) => onChange(e.target.value)}
          />
          <label 
            htmlFor={`${name}-${option}`} 
            className="radio-group__label"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}; 