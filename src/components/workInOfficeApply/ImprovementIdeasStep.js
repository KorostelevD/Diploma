import React from 'react';
import { FormStep } from './FormStep';
import { FormGroup } from './FormGroup';

export const ImprovementIdeasStep = ({ formData, onInputChange }) => {
  return (
    <FormStep title="Ваше бачення/ідеї для покращення офісної культури, креативного бренду чи внутрішніх процесів (за бажанням):">
      <FormGroup>
        <textarea
          className="form-group__textarea"
          value={formData.improvementIdeas}
          onChange={(e) => onInputChange('improvementIdeas', e.target.value)}
          placeholder="Поділіться своїми ідеями та баченням"
          rows="6"
        />
      </FormGroup>
    </FormStep>
  );
}; 