import React from "react";
import "./HeroSlide.css";

export const HeroSlide = ({
  title,
  description,
  buttonText,
  imageSrc,
  onDotClick,
  currentSlide,
  totalSlides,
  onPrevClick,
  onNextClick,
}) => {
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < (totalSlides || 3); i++) {
      dots.push(
        <span
          key={i}
          className={`hero-slide__dot ${i === (currentSlide || 0) ? "hero-slide__dot--active" : ""}`}
          onClick={() => onDotClick && onDotClick(i)}
        />
      );
    }
    return dots;
  };

  return (
    <div className="hero-slide" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className="hero-slide__card">
        <h2 className="hero-slide__title">{title}</h2>
        <p className="hero-slide__description">{description}</p>
        <button className="hero-slide__button">{buttonText}</button>

        <div className="hero-slide__controls">
          <button
            className="hero-slide__arrow hero-slide__arrow--prev"
            onClick={onPrevClick}
            aria-label="Previous slide"
          >
            <span>&#8249;</span>
          </button>
          <div className="hero-slide__dots">{renderDots()}</div>
          <button
            className="hero-slide__arrow hero-slide__arrow--next"
            onClick={onNextClick}
            aria-label="Next slide"
          >
            <span>&#8250;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
