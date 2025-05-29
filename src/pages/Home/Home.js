import React, { useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import { InfoCard } from "../../components/InfoCard/InfoCard";
import { PromoSection } from "../../components/PromoSection/PromoSection";

const cardData = [
  {
    imageSrc:
      "https://s7d1.scene7.com/is/image/mcdonalds/mcdrive_2336x1040:3-column-desktop?resmode=sharp2",
    altText: "Працюй з нами",
    title: "Працюй з нами",
    description:
      "У нас ти зможеш поєднувати навчання й роботу, зустрічатися з друзями та мати вдосталь часу для родини!",
    buttonText: "Детальніше",
  },
  {
    imageSrc:
      "https://s7d1.scene7.com/is/image/mcdonalds/Public_BigMAv_Phone-1:3-column-desktop?resmode=sharp2",
    altText: "Доставляємо улюблене",
    title: "Доставляємо улюблене",
    description:
      'Вам більше не доведеться виходити з дому, щоб насолоджуватися вашими улюбленими стравами. Отримайте їх разом з нашим безконтактним "МакДелівері".',
    buttonText: "Детальніше",
  },
  {
    imageSrc:
      "https://s7d1.scene7.com/is/image/mcdonalds/mom_kid_2336x1040:3-column-desktop?resmode=sharp2",
    altText: "Фундація Дім Рональда МакДональда в Україні",
    title: "Фундація Дім Рональда МакДональда в Україні®",
    description:
      '"Фундація" працює в Україні з 2016 року й утілює програми, що покращують здоров\'я дітей.',
    buttonText: "Детальніше",
  },
];

const trendingProductData = {
  imageSrc:
    "https://s7d1.scene7.com/is/image/mcdonalds/McCafe_publication_2:1-column-desktop?resmode=sharp2",
  altText: "Смачна кава",
  title: "Справді смачна кава!",
  description:
    'Якщо й існує справді смачна кава, то в "МакДональдз". Заходь і смакуй улюблену 100% арабіку в жовтому стаканчику. Залишиться лише вибрати: велика чи маленька.',
  buttonText: "Детальніше",
};

const carouselData = [
  {
    title: "Біг Тейсті® — то любов",
    description:
      "І цю любов помножено на три! Твій той самий улюблений Біг Тейсті® тепер у трьох форматах: Сингл, Джуніор і Дабл. Ти вже обрав Біг Тейсті® — тепер розмір обери.",
    buttonText: "Детальніше",
    imageSrc:
      "https://www.mcdonalds.com/content/dam/sites/ua/nfl/hero/landings/big-tasty/1-Slider_BigTasty.png",
  },
  {
    title: "НайсПрайс? Наааайс!",
    description:
      "Твої улюблені Чізбургер або нагетси з маленьким напоєм чи Картоплею Фрі за суперціною. НайсПрайс Комбо в МакДональдз. Завжди отримуєш більше!",
    buttonText: "Детальніше",
    imageSrc:
      "https://www.mcdonalds.com/content/dam/sites/ua/nfl/hero/slider/slider_Value_Mcd.png",
  },
];

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

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

  const currentSlideData = carouselData[currentSlide];

  return (
    <div className="home">
      <section className="home__hero-carousel">
        <div className="hero-carousel-wrapper">
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
              />
            ))}
          </Carousel>
          <div className="hero-static-card">
            <div className="hero-card-content">
              <h2 className="hero-card-title">{currentSlideData.title}</h2>
              <p className="hero-card-description">
                {currentSlideData.description}
              </p>
              <button className="hero-card-button">
                {currentSlideData.buttonText}
              </button>

              <div className="hero-card-controls">
                <button
                  className="hero-arrow hero-arrow--prev"
                  onClick={handlePrevClick}
                  aria-label="Previous slide"
                >
                  <span>&#8249;</span>
                </button>

                <div className="hero-dots">
                  {carouselData.map((_, index) => (
                    <span
                      key={index}
                      className={`hero-dot ${
                        index === currentSlide ? "hero-dot--active" : ""
                      }`}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </div>

                <button
                  className="hero-arrow hero-arrow--next"
                  onClick={handleNextClick}
                  aria-label="Next slide"
                >
                  <span>&#8250;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromoSection
        imageSrc={trendingProductData.imageSrc}
        altText={trendingProductData.altText}
        title={trendingProductData.title}
        description={trendingProductData.description}
        buttonText={trendingProductData.buttonText}
      />

      <section className="home__info-sections">
        {cardData.map((card, index) => (
          <InfoCard
            key={index}
            imageSrc={card.imageSrc}
            altText={card.altText}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
          />
        ))}
      </section>
    </div>
  );
};
