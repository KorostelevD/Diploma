import React from 'react';
import './ProgressBar.css';

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div 
        className="progress-bar__fill" 
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}; 