import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../WorkInOfficeApply/WorkInOfficeApply.css';
import {
  ProgressBar,
  FormNavigation
} from '../../components/workInOfficeApply';
import {
  PersonalInfoStep,
  DesiredPositionStep,
  ScheduleStep,
  WorkExperienceStep,
  WhyLabStep,
  WorkPrioritiesStep,
  InterviewReadinessStep,
  CommentsStep,
  PrivacyNoticeStep
} from '../../components/workInRestaurantApply';
import { sendRestaurantApplication } from '../../services/work-in-restaurant-applications';

export const WorkInRestaurantApply = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    
    // Desired Position
    desiredPosition: [],
    
    // Schedule
    schedule: [],
    
    // Work Experience
    hasExperience: '',
    
    // Why THE LAB
    whyLab: '',
    
    // Work Priorities
    workPriorities: [],
    
    // Interview Readiness
    interviewDate: '',
    interviewTime: '',
    interviewFormat: '',
    
    // Comments
    comments: ''
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
      const result = await sendRestaurantApplication(formData);
      
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
            onInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ScheduleStep 
            formData={formData} 
            onInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <WorkExperienceStep 
            formData={formData} 
            onInputChange={handleInputChange}
          />
        );
      case 5:
        return (
          <WhyLabStep 
            formData={formData} 
            onInputChange={handleInputChange}
          />
        );
      case 6:
        return (
          <WorkPrioritiesStep 
            formData={formData} 
            onInputChange={handleInputChange}
          />
        );
      case 7:
        return (
          <InterviewReadinessStep 
            formData={formData} 
            onInputChange={handleInputChange}
          />
        );
      case 8:
        return (
          <CommentsStep 
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