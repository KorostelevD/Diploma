import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';
import { CheckboxGroup } from '../workInOfficeApply/CheckboxGroup';

export const WorkPrioritiesStep = ({ formData, onInputChange }) => {
  const prioritiesOptions = [
    'Атмосфера в команді',
    'Стабільна зарплата',
    'Гнучкий графік',
    'Можливість розвиватись',
    'Безкоштовне харчування',
    'Крутий бренд',
    'Інше'
  ];

  const handlePrioritiesChange = (value) => {
    const currentValues = formData.workPriorities || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onInputChange('workPriorities', newValues);
  };

  return (
    <FormStep 
      title="Що для вас найголовніше на роботі?"
      description="Оберіть одну або декілька опцій:"
    >
      <CheckboxGroup
        options={prioritiesOptions}
        selectedValues={formData.workPriorities || []}
        onChange={handlePrioritiesChange}
        name="workPriorities"
      />
    </FormStep>
  );
}; 