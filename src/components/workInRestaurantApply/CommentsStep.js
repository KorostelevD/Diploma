import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';
import { FormGroup } from '../workInOfficeApply/FormGroup';

export const CommentsStep = ({ formData, onInputChange }) => {
  return (
    <FormStep 
      title="Коментарі, питання або побажання"
    >
      <FormGroup>
        <textarea
          className="form-group__textarea"
          value={formData.comments}
          onChange={(e) => onInputChange('comments', e.target.value)}
          placeholder="Напишіть ваші коментарі, питання або побажання..."
          rows="6"
        />
      </FormGroup>
    </FormStep>
  );
}; 