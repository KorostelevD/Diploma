import React from 'react';
import { FormStep } from './FormStep';
import './PrivacyNoticeStep.css';

export const PrivacyNoticeStep = () => {
  return (
    <FormStep isFinal>
      <div className="privacy-notice">
        <div className="privacy-notice__icon">🔒</div>
        <p className="privacy-notice__text">Вся інформація зберігається конфіденційно та</p>
        <p className="privacy-notice__text">використовується лише для відбору персоналу.</p>
      </div>
    </FormStep>
  );
}; 