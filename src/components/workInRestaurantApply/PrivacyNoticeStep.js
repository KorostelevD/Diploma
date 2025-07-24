import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';
import "./PrivacyNoticeStep.css";

export const PrivacyNoticeStep = () => {
  return (
    <FormStep>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>
          🔒
        </div>
        <p className="privacy-notice-step__text">
          Вся інформація зберігається конфіденційно та<br />
          використовується лише для відбору персоналу.
        </p>
      </div>
    </FormStep>
  );
}; 