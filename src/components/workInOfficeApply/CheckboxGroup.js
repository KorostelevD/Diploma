import React from 'react';
import './CheckboxGroup.css';

export const CheckboxGroup = ({ 
  options, 
  selectedValues, 
  onChange, 
  name 
}) => {
  return (
    <div className="checkbox-group">
      <div className="checkbox-container">
      {options.map((option) => (
        <div key={option} className="checkbox-group__item">
          <input
            type="checkbox"
            id={`${name}-${option}`}
            className="checkbox-group__input"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(option)}
          />
          <label 
            htmlFor={`${name}-${option}`} 
            className="checkbox-group__label"
          >
            {option}
          </label>
        </div>
      ))}
      </div>
    </div>
  );
}; 