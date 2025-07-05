import React, { useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import { InfoCard } from "../../components/InfoCard/InfoCard";
import { PromoSection } from "../../components/PromoSection/PromoSection";
import { AboutUs } from "../../components/AboutUs/AboutUs";
import slide1 from "../../assets/slider/slide1.jpg";
import slide2 from "../../assets/slider/slide2.jpg";
import promoImage from "../../assets/images/promoImage.jpg";

const cardData = [
  {
    title: "Нова колекція: URBAN CODE.",
    description: "Мода, яка говорить. Дизайн, який провокує.",
    buttonText: "Дивитися колекцію",
  },
  {
    title: `Проєкт "City Talks" уже в мережі.`,
    description:
      "Дізнайся, як виглядає місто, коли воно говорить твоїм стилем.",
    buttonText: "Подивитися відео",
  },
];

// Add carouselData for the two slides
const carouselData = [
  {
    imageSrc: slide1,
    altText: "Double Patty Haisenburger 50%",
  },
  {
    imageSrc: slide2,
    altText: "Second Slide",
  },
];

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.onClickPrev();
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.onClickNext();
    }
  };

  const handleDotClick = (index) => {
    if (carouselRef.current) {
      carouselRef.current.moveTo(index);
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home">
      <div className="hero-carousel-wrapper" style={{ position: "relative" }}>
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          onChange={handleSlideChange}
          selectedItem={currentSlide}
          ref={carouselRef}
          className="background-carousel"
        >
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className="carousel-background-slide"
              style={{ backgroundImage: `url(${slide.imageSrc})` }}
              aria-label={slide.altText}
            />
          ))}
        </Carousel>
        {/* Navigation positioned absolutely at bottom center */}
        <div
          className="hero-navigation"
          style={{
            position: "absolute",
            zIndex: 3,
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <button
            className="hero-arrow"
            onClick={handlePrevClick}
            aria-label="Previous slide"
          >
            &#8592;
          </button>
          <div className="hero-dots" style={{ display: "flex", gap: "8px" }}>
            {carouselData.map((_, idx) => (
              <span
                key={idx}
                className={`hero-dot${
                  currentSlide === idx ? " hero-dot--active" : ""
                }`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: currentSlide === idx ? "#333" : "#ccc",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </div>
          <button
            className="hero-arrow"
            onClick={handleNextClick}
            aria-label="Next slide"
          >
            &#8594;
          </button>
        </div>
      </div>

      <PromoSection
        imageSrc={promoImage}
        altText={"Promo Image"}
        title={"THE LAB — ДЕ НАРОДЖУЄТЬСЯ ІДЕЯ"}
        description={
          "Ми — не просто студія. Ми — експериментальний простір, де креатив стає реальністю. У THE LAB ми міксуємо дизайн, технології й культуру, щоб створювати продукти, які змінюють уявлення про сучасність."
        }
      />

      <section className="home__info-sections">
        <h2 className="home__info-title">НОВИНКИ ВІД THE LAB</h2>
        <div className="home__info-cards">
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              onButtonClick={
                index === 0 ? () => navigate('/urban-code') :
                index === 1 ? () => navigate('/city-talks') :
                undefined
              }
            />
          ))}
        </div>
      </section>

      <AboutUs />

      <section className="home__app-promotion">
        <div className="app-promotion__container">
          <div className="app-promotion__content">
            <h2 className="app-promotion__title">
              The LAB App — замовляй ще швидше!
            </h2>
            <p className="app-promotion__description">
              Відкрий наш ресторан y своєму смартфоні: зручне меню, бонуси,
              трекінг доставки та спеціальні пропозиції — лише в додатку
            </p>
            <button 
              className="app-promotion__button"
              onClick={() => navigate('/download-app')}
            >
              Спробуй зараз — це безкоштовно!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
