import React from 'react';
import {FormStep} from './FormStep';
import {FormGroup} from './FormGroup';
import {CheckboxGroup} from './CheckboxGroup';

export const SkillsStep = ({formData, onInputChange, onCheckboxChange}) => {
  const languageOptions = ['Українська', 'Англійська', 'Інші'];

  return (
    <FormStep
      title="Ключові навички / софт"
      description="Програми / сервіси, якими володієте:"
    >
      <div className='form-group-skills-container'>
        <FormGroup hint="(наприклад: Canva, Excel, Notion, Figma, CRM)">
          <input
            type="text"
            className="form-group__input"
            value={formData.software}
            onChange={(e) => onInputChange('software', e.target.value)}
            placeholder="наприклад: Canva, Excel, Notion, Figma, CRM"
          />
        </FormGroup>
      </div>
      <div className='form-group-languages-container'>
        <FormGroup label="Мови:">
        </FormGroup>
        <CheckboxGroup
          options={languageOptions}
          selectedValues={formData.languages}
          onChange={(value) => onCheckboxChange('languages', value)}
          name="languages"
        />
      </div>
    </FormStep>
  );
}; 