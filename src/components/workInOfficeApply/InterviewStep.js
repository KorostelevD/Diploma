import React from 'react';
import {FormStep} from './FormStep';
import {FormGroup} from './FormGroup';
import {RadioGroup} from './RadioGroup';

export const InterviewStep = ({formData, onInputChange}) => {
  const formatOptions = ['Онлайн', 'Офлайн (у закладі)'];

  return (
    <FormStep title="Готовність до співбесіди">
      <FormGroup label="Зручна дата:">
        <input
          type="date"
          className="form-group__input"
          value={formData.interviewDate}
          onChange={(e) => onInputChange('interviewDate', e.target.value)}
        />
      </FormGroup>

      <FormGroup label="Зручний час:">
        <input
          type="time"
          className="form-group__input"
          value={formData.interviewTime}
          onChange={(e) => onInputChange('interviewTime', e.target.value)}
        />
      </FormGroup>
      <div className="form-group__group-format-container">
        <FormGroup label="Формат:">
          <RadioGroup
            options={formatOptions}
            selectedValue={formData.interviewFormat}
            onChange={(value) => onInputChange('interviewFormat', value)}
            name="interviewFormat"
          />
        </FormGroup>
      </div>
    </FormStep>
  );
}; 