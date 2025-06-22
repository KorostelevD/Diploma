import React from 'react';
import './InfoCard.css';

export const InfoCard = ({ title, description, buttonText }) => {
  return (
    <div className="info-card">
      <div className="info-card__content">
        <h3 className="info-card__title">{title}</h3>
        <p className="info-card__description">{description}</p>
        <button className="info-card__button">{buttonText}</button>
      </div>
    </div>
  );
};
