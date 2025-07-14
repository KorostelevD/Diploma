import React from 'react';
import { FormStep } from './FormStep';
import { FormGroup } from './FormGroup';
import { CheckboxGroup } from './CheckboxGroup';

export const SkillsStep = ({ formData, onInputChange, onCheckboxChange }) => {
  const languageOptions = ['Українська', 'Англійська', 'Інші'];

  return (
    <FormStep 
      title="Ключові навички / софт"
      description="Програми / сервіси, якими володієте:"
    >
      <FormGroup hint="(наприклад: Canva, Excel, Notion, Figma, CRM)">
        <input
          type="text"
          className="form-group__input"
          value={formData.software}
          onChange={(e) => onInputChange('software', e.target.value)}
          placeholder="наприклад: Canva, Excel, Notion, Figma, CRM"
        />
      </FormGroup>
      
      <FormGroup label="Мови:">
        <CheckboxGroup
          options={languageOptions}
          selectedValues={formData.languages}
          onChange={(value) => onCheckboxChange('languages', value)}
          name="languages"
        />
      </FormGroup>
    </FormStep>
  );
}; 