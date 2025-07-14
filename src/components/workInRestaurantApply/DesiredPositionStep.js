import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';
import { CheckboxGroup } from '../workInOfficeApply/CheckboxGroup';

export const DesiredPositionStep = ({ formData, onInputChange }) => {
  const positionOptions = [
    'Офіціант / Офіціантка',
    'Бариста',
    'Хостес',
    'Бармен',
    'Кухар',
    'Помічник кухаря',
    'Прибиральник',
    'Інше'
  ];

  const handlePositionChange = (value) => {
    const currentValues = formData.desiredPosition || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onInputChange('desiredPosition', newValues);
  };

  return (
    <FormStep 
      title="Бажана посада в ресторані"
      description="Оберіть одну або декілька опцій:"
    >
      <CheckboxGroup
        options={positionOptions}
        selectedValues={formData.desiredPosition || []}
        onChange={handlePositionChange}
        name="desiredPosition"
      />
    </FormStep>
  );
}; 