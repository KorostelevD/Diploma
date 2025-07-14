import React from 'react';
import { FormStep } from './FormStep';
import { FormGroup } from './FormGroup';
import { RadioGroup } from './RadioGroup';

export const ExperienceStep = ({ formData, onInputChange }) => {
  const experienceOptions = [
    '<1 року',
    '1-3 роки',
    '3-5 років',
    '5+ років'
  ];

  return (
    <FormStep 
      title="Досвід роботи"
      description="Скільки років досвіду маєте у сфері, на яку подаєтесь?"
    >
      <RadioGroup
        options={experienceOptions}
        selectedValue={formData.experienceYears}
        onChange={(value) => onInputChange('experienceYears', value)}
        name="experienceYears"
      />
      
      <FormGroup label="Попередні місця роботи, посади, коротко:">
        <input
          type="text"
          className="form-group__input"
          value={formData.previousWorkplaces}
          onChange={(e) => onInputChange('previousWorkplaces', e.target.value)}
          placeholder="Опишіть ваш попередній досвід"
        />
      </FormGroup>
    </FormStep>
  );
}; 