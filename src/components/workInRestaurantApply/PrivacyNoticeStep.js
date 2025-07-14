import React from 'react';
import { FormStep } from '../workInOfficeApply/FormStep';

export const PrivacyNoticeStep = () => {
  return (
    <FormStep>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>
          🔒
        </div>
        <p style={{ 
          fontSize: '18px', 
          lineHeight: '1.6', 
          color: '#333',
          marginBottom: '30px'
        }}>
          Вся інформація зберігається конфіденційно та<br />
          використовується лише для відбору персоналу.
        </p>
      </div>
    </FormStep>
  );
}; 