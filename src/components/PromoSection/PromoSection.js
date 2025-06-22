import React from "react";
import "./PromoSection.css";

export const PromoSection = ({
  imageSrc,
  altText,
  title,
  description,
  buttonText,
}) => {
  return (
    <section className="promo">
      <div className="promo__image-container">
        <img src={imageSrc} alt={altText} className="promo__image" />
      </div>
      <div className="promo__content">
        <h2 className="promo__title">{title}</h2>
        <p className="promo__description">{description}</p>
      </div>
    </section>
  );
};
