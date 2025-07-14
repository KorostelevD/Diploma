import React from 'react';
import { FormStep } from './FormStep';
import { FormGroup } from './FormGroup';

export const PersonalInfoStep = ({ formData, onInputChange, errors = {} }) => {
  return (
    <FormStep 
      title="Анкета кандидата для роботи в ресторані THE LAB"
      subtitle="Особиста інформація"
    >
      <FormGroup 
        label="ПІБ:"
        required={true}
        error={errors.fullName}
      >
        <input
          type="text"
          className="form-group__input"
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          placeholder="Введіть ваше повне ім'я"
        />
      </FormGroup>
      
      <FormGroup label="Дата народження:">
        <input
          type="date"
          className="form-group__input"
          value={formData.birthDate}
          onChange={(e) => onInputChange('birthDate', e.target.value)}
        />
      </FormGroup>
      
      <FormGroup 
        label="Контактний номер телефону:"
        required={true}
        error={errors.phone}
      >
        <input
          type="tel"
          className="form-group__input"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          placeholder="+380"
        />
      </FormGroup>
      
      <FormGroup 
        label="Email:"
        required={true}
        error={errors.email}
      >
        <input
          type="email"
          className="form-group__input"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="your@email.com"
        />
      </FormGroup>
      
      <FormGroup label="Місто проживання:">
        <input
          type="text"
          className="form-group__input form-group__input--highlighted"
          value={formData.city}
          onChange={(e) => onInputChange('city', e.target.value)}
          placeholder="Введіть місто"
        />
      </FormGroup>
    </FormStep>
  );
}; 