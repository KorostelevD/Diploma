import React from "react";
import "./CityTalksCollection.css";
import cityTalksMain from "../../assets/images/Adversiment-Billboard-mockup-vol4.png";
import labLogo from "../../assets/images/Free-Store-Sign-Wall-Mounted-Mockup-PSD.png";
import haisenbergToy from "../../assets/images/haisengberg-toy.png";
import haisenbergJuice from "../../assets/images/lab-juice.png";
import cocteils from "../../assets/images/coctails.png";

export const CityTalksCollection = () => {
  return (
    <section className="city-talks">
      <div className="city-talks__container">
        <div className="city-talks__hero">
          <h1 className="city-talks__title">
            CITY TALKS — КОЛИ МІСТО ГОВОРИТЬ ТВОЇМ СТИЛЕМ
          </h1>

          <div className="city-talks__billboard">
            <div className="city-talks__billboard-image">
              <img src={cityTalksMain} alt="City Talks Main" />
            </div>
          </div>
        </div>

        <div className="city-talks__intro-section">
          <h2 className="city-talks__section-title">
            Що, якби вулиці могли говорити?
          </h2>
          <p className="city-talks__intro-text">
            Проєкт City Talks — це дослідження міста крізь дизайн, стиль і
            культурні коди. Ми вивчаємо, як персональні характери, графіті,
            текст і будівлі — створюємо це, що продукти, які розповідають з
            ритмом мегаполісу.
          </p>
        </div>

        <div className="city-talks__content-grid">
          <div className="city-talks__left-column">
            <div className="city-talks__city-section">
              <h3 className="city-talks__subsection-title">
                🏢 МІСТО — ЦЕ НЕ ПРОСТО ФОН
              </h3>
              <p className="city-talks__subsection-text">
                Це герой. Це співрозмовник.
              </p>
              <p className="city-talks__subsection-text">
                У City Talks ми досліджуємо:
              </p>
              <ul className="city-talks__features-list">
                <li className="city-talks__features-item">
                  • аналізуємо візуальні патерни та деталі
                </li>
                <li className="city-talks__features-item">
                  • досліджуємо міські повідомлення;
                </li>
                <li className="city-talks__features-item">
                  • шукаємо зв'язки між людьми, районами, вуличними, ритмами
                  місць;
                </li>
                <li className="city-talks__features-item">
                  • трансформує міські нарратив через відео, звук, пластику,
                  цифру.
                </li>
              </ul>
            </div>

            <div className="city-talks__gallery">
              <div className="city-talks__gallery-images">
                <div className="city-talks__gallery-item">
                  <img src={haisenbergToy} alt="haisenberg toy" />
                </div>
                <div className="city-talks__gallery-item">
                  <img src={haisenbergJuice} alt="haisenberg juice" />
                </div>
              </div>
            </div>
          </div>

          <div className="city-talks__right-column">
            <div className="city-talks__image-section">
              <div className="city-talks__side-image">
                <img src={labLogo} alt="lab logo" />
              </div>
            </div>

            <div className="city-talks__appearance-section">
              <h3 className="city-talks__subsection-title">
                🔍 ЯК ЦЕ ВИГЛЯДАЄ?
              </h3>
              <ul className="city-talks__appearance-list">
                <li className="city-talks__appearance-item">
                  🎥 Документальні урбан-ролики
                </li>
                <li className="city-talks__appearance-item">
                  👕 Одяг, що повторює рельєф району
                </li>
                <li className="city-talks__appearance-item">
                  📍 Інтерактивна мапа міського стилю
                </li>
                <li className="city-talks__appearance-item">
                  🧠 Спецвипуски з креаторами, які чують місто
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="city-talks__join-section">
          <h3 className="city-talks__join-title">📂 Долучайся до City Talks</h3>
          <div className="city-talks__join-content">
            <div className="city-talks__join-text">
              <p className="city-talks__join-description">
                Твоє місто вже говорить. Чи чуєш ти?
              </p>
              <p className="city-talks__join-highlight">
                💛 [Колекція City Talks]
              </p>
              <p className="city-talks__join-highlight">
                💛 [Історії міста] (скоро)
              </p>
            </div>
            <div className="city-talks__join-image">
              <img src={cocteils} alt="cocteils" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
