import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkInOfficeApply.css';
import {
  ProgressBar,
  FormNavigation,
  PersonalInfoStep,
  DesiredPositionStep,
  SkillsStep,
  ExperienceStep,
  WhyTheLabStep,
  WorkFormatStep,
  InterviewStep,
  ImprovementIdeasStep,
  PrivacyNoticeStep
} from '../../components/workInOfficeApply';
import { sendWorkInOfficeApplication } from '../../services/work-in-office-applications';

export const WorkInOfficeApply = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    city: '',
    
    // Desired Position
    desiredPosition: [],
    
    // Key Skills
    software: '',
    languages: [],
    
    // Work Experience
    experienceYears: '',
    previousWorkplaces: '',
    
    // Why THE LAB
    whyTheLab: '',
    
    // Work Format
    workFormat: '',
    
    // Interview Readiness
    interviewDate: '',
    interviewTime: '',
    interviewFormat: '',
    
    // Improvement Ideas
    improvementIdeas: ''
  });

  const totalSteps = 9;

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'ПІБ є обов\'язковим полем';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Номер телефону є обов\'язковим полем';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email є обов\'язковим полем';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введіть коректний email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await sendWorkInOfficeApplication(formData);
      
      if (result.success) {
        alert('Форма успішно відправлена!');
        console.log('Application submitted with ID:', result.id);
        navigate('/');
      } else {
        alert('Помилка при відправленні форми: ' + result.error);
        console.error('Submission failed:', result.error);
      }
    } catch (error) {
      alert('Помилка при відправленні форми');
      console.error('Error submitting form:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            formData={formData} 
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <DesiredPositionStep 
            formData={formData} 
            onCheckboxChange={handleCheckboxChange} 
          />
        );
      case 3:
        return (
          <SkillsStep 
            formData={formData} 
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange} 
          />
        );
      case 4:
        return (
          <ExperienceStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 5:
        return (
          <WhyTheLabStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 6:
        return (
          <WorkFormatStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 7:
        return (
          <InterviewStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 8:
        return (
          <ImprovementIdeasStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 9:
        return <PrivacyNoticeStep />;
      default:
        return null;
    }
  };

  return (
    <div className="work-form">
      <div className="work-form__container">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="work-form__content">
          {renderStep()}
        </div>
        
        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};