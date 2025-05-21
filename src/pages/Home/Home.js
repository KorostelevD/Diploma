import React, { useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import { InfoCard } from "../../components/InfoCard/InfoCard";
import { PromoSection } from "../../components/PromoSection/PromoSection";
import { HeroSlide } from "../../components/HeroSlide/HeroSlide";

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

  return (
    <div className="home">
      <section className="home__hero-carousel">
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
        >
          {carouselData.map((slide, index) => (
            <HeroSlide
              key={index}
              title={slide.title}
              description={slide.description}
              buttonText={slide.buttonText}
              imageSrc={slide.imageSrc}
              currentSlide={currentSlide}
              totalSlides={carouselData.length}
              onDotClick={handleDotClick}
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
            />
          ))}
        </Carousel>
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
}
