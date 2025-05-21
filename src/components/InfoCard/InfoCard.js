import React from 'react';
import './InfoCard.css';

export const InfoCard = ({ imageSrc, altText, title, description, buttonText }) => {
  return (
    <div className="info-card">
      <img className="info-card__image" src={imageSrc} alt={altText} />
      <div className="info-card__content">
        <h3 className="info-card__title">{title}</h3>
        <p className="info-card__description">{description}</p>
        <button className="info-card__button">{buttonText}</button>
      </div>
    </div>
  );
};
