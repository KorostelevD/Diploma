import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';
import { CheckboxGroup } from '../workInOfficeApply/CheckboxGroup';

export const ScheduleStep = ({ formData, onInputChange }) => {
  const scheduleOptions = [
    'Повна зайнятість',
    'Часткова зайнятість',
    'Позмінно',
    'Робота на вихідних'
  ];

  const handleScheduleChange = (value) => {
    const currentValues = formData.schedule || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onInputChange('schedule', newValues);
  };

  return (
    <FormStep 
      title="Графік, який вам підходить"
      description="Оберіть одну або декілька опцій:"
    >
      <CheckboxGroup
        options={scheduleOptions}
        selectedValues={formData.schedule || []}
        onChange={handleScheduleChange}
        name="schedule"
      />
    </FormStep>
  );
}; 