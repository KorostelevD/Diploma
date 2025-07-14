import React from 'react';
import { FormStep } from './FormStep';
import { CheckboxGroup } from './CheckboxGroup';

export const DesiredPositionStep = ({ formData, onCheckboxChange }) => {
  const positionOptions = [
    'SMM-менеджер',
    'Графічний дизайнер', 
    'HR / рекрутер',
    'Project-менеджер',
    'Бухгалтер / фінансист',
    'Копірайтер',
    'Адміністратор офісу',
    'Інше'
  ];

  return (
    <FormStep 
      title="Бажана посада в ресторані"
      description="Оберіть одну або декілька опцій:"
    >
      <CheckboxGroup
        options={positionOptions}
        selectedValues={formData.desiredPosition}
        onChange={(value) => onCheckboxChange('desiredPosition', value)}
        name="desiredPosition"
      />
    </FormStep>
  );
}; 