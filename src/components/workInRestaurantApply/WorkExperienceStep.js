import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';
import { RadioGroup } from '../workInOfficeApply/RadioGroup';
import "./WorkExperienceStep.css";

export const WorkExperienceStep = ({ formData, onInputChange }) => {
  const experienceOptions = [
    'Так',
    'Ні'
  ];

  return (
    <FormStep 
      title="Досвід роботи"
      description="Чи маєте досвід роботи у сфері обслуговування?"
    >
	  <div className="work-experience__radio-group-container">
		  <RadioGroup
			options={experienceOptions}
			selectedValue={formData.hasExperience}
			onChange={(value) => onInputChange('hasExperience', value)}
			name="hasExperience"
		  />
      </div>
    </FormStep>
  );
}; 