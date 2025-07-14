import React from 'react';
import { FormStep } from './FormStep';
import { FormGroup } from './FormGroup';

export const WhyTheLabStep = ({ formData, onInputChange }) => {
  return (
    <FormStep title="Чому саме THE LAB?">
      <FormGroup>
        <textarea
          className="form-group__textarea"
          value={formData.whyTheLab}
          onChange={(e) => onInputChange('whyTheLab', e.target.value)}
          placeholder="Розкажіть, чому ви обрали саме THE LAB"
          rows="6"
        />
      </FormGroup>
    </FormStep>
  );
}; 