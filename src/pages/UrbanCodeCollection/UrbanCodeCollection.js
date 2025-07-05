import React from "react";
import "./UrbanCodeCollection.css";
import urbanCodeMain from "../../assets/images/urban-code-main.png";
import character1 from "../../assets/images/about-us-photo-1.jpg";
import character2 from "../../assets/images/about-us-photo-2.jpg";

export const UrbanCodeCollection = () => {
  return (
    <section className="urban-code">
      <div className="urban-code__container">
        <h1 className="urban-code__title">URBAN CODE — нова колекція</h1>
        <div className="urban-code__hero">
          <div className="urban-code__content">
            <div className="urban-code__text-section">
              <h2 className="urban-code__subtitle">
                Мода, яка говорить. Дизайн, який провокує.
              </h2>
              <p className="urban-code__description">
                Колекція URBAN CODE — це сміливе поєднання урбаністичної
                естетики та глибоких сенсів. У кожному образі — маніфест
                свободи, виклик буденності, заявка на індивідуальність.
              </p>

              <div className="urban-code__features">
                <h3 className="urban-code__features-title">Що вас чекає:</h3>
                <ul className="urban-code__features-list">
                  <li className="urban-code__features-item">
                    Графічні принти з характером
                  </li>
                  <li className="urban-code__features-item">
                    Нейтральна палітра з яскравими акцентами
                  </li>
                  <li className="urban-code__features-item">
                    Оверсайз силуети та функціональні деталі
                  </li>
                  <li className="urban-code__features-item">
                    Унісекс-рішення для тих, хто не ділить моду за статтю
                  </li>
                </ul>
              </div>

              <p className="urban-code__motto">
                <strong>
                  URBAN CODE — для тих, хто не боїться бути гучним у мовчазному
                  світі.
                </strong>
              </p>
            </div>

            <div className="urban-code__image-section">
              <div className="urban-code__main-image">
                <img
                  src={urbanCodeMain}
                  alt="Character 1"
                  className="urban-code__character-image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="urban-code__bottom-section">
          <div className="urban-code__gallery">
            <div className="urban-code__gallery-images">
              <div className="urban-code__gallery-item">
                <img
                  src={character1}
                  alt="Character 1"
                  className="urban-code__gallery-image"
                />
              </div>
              <div className="urban-code__gallery-item">
                <img
                  src={character2}
                  alt="Character 2"
                  className="urban-code__gallery-image"
                />
              </div>
            </div>
          </div>

          <div className="urban-code__call-to-action">
            <h3 className="urban-code__cta-title">
              Обирай, що говорить за тебе:
            </h3>
            <ul className="urban-code__cta-list">
              <li className="urban-code__cta-item">
                <span className="urban-code__cta-icon">🔸</span>
                Футболки з соціальними меседжами
              </li>
              <li className="urban-code__cta-item">
                <span className="urban-code__cta-icon">🔸</span>
                Бомбер із QR-кодом до маніфесту
              </li>
              <li className="urban-code__cta-item">
                <span className="urban-code__cta-icon">🔸</span>
                Худі з вуличним шрифтом
              </li>
              <li className="urban-code__cta-item">
                <span className="urban-code__cta-icon">🔸</span>
                Сумки-трансформери
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
