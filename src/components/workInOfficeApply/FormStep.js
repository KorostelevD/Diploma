import React from 'react';
import './FormStep.css';

export const FormStep = ({ 
  title, 
  subtitle, 
  description, 
  children, 
  isFinal = false 
}) => {
  return (
    <div className={`form-step ${isFinal ? 'form-step--final' : ''}`}>
      {title && (
        <h2 className="form-step__title">{title}</h2>
      )}
      {subtitle && (
        <h3 className="form-step__subtitle">{subtitle}</h3>
      )}
      {description && (
        <p className="form-step__description">{description}</p>
      )}
      <div className="form-step__content">
        {children}
      </div>
    </div>
  );
}; 