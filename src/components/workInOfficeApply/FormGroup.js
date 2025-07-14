import React from 'react';
import './FormGroup.css';

export const FormGroup = ({ 
  label, 
  children, 
  hint, 
  className = '',
  required = false,
  error = ''
}) => {
  return (
    <div className={`form-group ${className} ${error ? 'form-group--error' : ''}`}>
      {label && (
        <label className="form-group__label">
          {label}
          {required && <span className="form-group__required">*</span>}
        </label>
      )}
      <div className="form-group__input-wrapper">
        {children}
      </div>
      {error && (
        <small className="form-group__error">{error}</small>
      )}
      {hint && !error && (
        <small className="form-group__hint">{hint}</small>
      )}
    </div>
  );
}; 