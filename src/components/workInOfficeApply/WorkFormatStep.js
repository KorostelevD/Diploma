import React from 'react';
import { FormStep } from './FormStep';
import { CheckboxGroup } from './CheckboxGroup';

export const WorkFormatStep = ({ formData, onInputChange }) => {
  const formatOptions = [
    'Повна зайнятість',
    'Часткова зайнятість',
    'Гібридний формат',
    'Повністю дистанційно'
  ];

  const handleFormatChange = (value) => {
    const currentValues = formData.workFormat || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onInputChange('workFormat', newValues);
  };

  return (
    <FormStep 
      title="Формат та графік роботи"
      description="Оберіть одну або декілька опцій:"
    >
      <CheckboxGroup
        options={formatOptions}
        selectedValues={formData.workFormat || []}
        onChange={handleFormatChange}
        name="workFormat"
      />
    </FormStep>
  );
}; 