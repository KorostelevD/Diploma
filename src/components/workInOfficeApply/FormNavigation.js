import React from 'react';
import './FormNavigation.css';

export const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit 
}) => {
  return (
    <div className="form-navigation">
      {currentStep > 1 && (
        <button 
          type="button" 
          onClick={onPrevious}
          className="form-navigation__button form-navigation__button--secondary"
        >
          Назад
        </button>
      )}
      
      {currentStep < totalSteps && (
        <button 
          type="button" 
          onClick={onNext}
          className="form-navigation__button form-navigation__button--primary"
        >
          Продовжити
        </button>
      )}
      
      {currentStep === totalSteps && (
        <button 
          type="button" 
          onClick={onSubmit}
          className="form-navigation__button form-navigation__button--exit"
        >
          Вийти
        </button>
      )}
    </div>
  );
}; 