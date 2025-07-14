import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';
import { FormGroup } from '../workInOfficeApply/FormGroup';

export const WhyLabStep = ({ formData, onInputChange }) => {
  return (
    <FormStep 
      title="Чому ви хочете працювати в THE LAB?"
    >
      <FormGroup>
        <textarea
          className="form-group__textarea"
          value={formData.whyLab}
          onChange={(e) => onInputChange('whyLab', e.target.value)}
          placeholder="Поділіться своїми думками..."
          rows="6"
        />
      </FormGroup>
    </FormStep>
  );
}; 