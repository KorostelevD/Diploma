import React from 'react';
import './Loader.css';

const Loader = ({ 
  type = 'spinner', 
  text = 'Loading...', 
  size = 'medium',
  color = 'primary' 
}) => {
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={`loader-dots loader-dots--${size} loader-dots--${color}`}>
            <div className="loader-dots__dot"></div>
            <div className="loader-dots__dot"></div>
            <div className="loader-dots__dot"></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`loader-pulse loader-pulse--${size} loader-pulse--${color}`}>
            <div className="loader-pulse__circle"></div>
          </div>
        );
      
      case 'bars':
        return (
          <div className={`loader-bars loader-bars--${size} loader-bars--${color}`}>
            <div className="loader-bars__bar"></div>
            <div className="loader-bars__bar"></div>
            <div className="loader-bars__bar"></div>
            <div className="loader-bars__bar"></div>
            <div className="loader-bars__bar"></div>
          </div>
        );
      
      case 'spinner':
      default:
        return (
          <div className={`loader-spinner loader-spinner--${size} loader-spinner--${color}`}>
            <div className="loader-spinner__circle">
              <div className="loader-spinner__inner"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="loader">
      <div className="loader__animation">
        {renderLoader()}
      </div>
      {text && (
        <p className={`loader__text loader__text--${size}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader; 