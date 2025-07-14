import React from "react";
import { Link } from "react-router-dom";
import "./WorkInRestaurant.css";
import cover from "../../assets/images/hygiene-image-1.jpg";
import worker from "../../assets/images/worker.png";
import impactStrategy from "../../assets/images/impact-strategy-cover.jpg";

export const WorkInRestaurant = () => {
  return (
    <section className="work">
      <div className="work__container">
        <div className="work__hero">
          <h1 className="work__title">
            РОБОТА В РЕСТОРАНІ — ЦЕ БІЛЬШЕ, НІЖ ПРОСТО ЗМІНА
          </h1>
          
          <div className="work__hero-image">
            <img src={cover} alt="Restaurant terrace" />
          </div>
          
          <h2 className="work__subtitle">
            Стань частиною команди, яка знає, як працювати зі смаком.
          </h2>
          
          <p className="work__description">
            Ми шукаємо не просто працівників. Ми шукаємо людей, які кайфують від роботи, ритму й команди! Тут кожен — важлива частинка великого рецепта.
          </p>
        </div>

        <div className="work__content">
          <div className="work__content-grid">
            <div className="work__left-column">
              <div className="work__positions">
                <h3 className="work__section-title">Кого ми шукаємо:</h3>
                <ul className="work__positions-list">
                  <li className="work__positions-item">
                    <span className="work__bullet">👥</span>
                    <span className="work__position-text">
                      <strong>Кахірів</strong> — комунікабельних і точних
                    </span>
                  </li>
                  <li className="work__positions-item">
                    <span className="work__bullet">👨‍🍳</span>
                    <span className="work__position-text">
                      <strong>Кухарів</strong> — швидких і уважних до деталей
                    </span>
                  </li>
                  <li className="work__positions-item">
                    <span className="work__bullet">🍽️</span>
                    <span className="work__position-text">
                      <strong>Офіціантів/бариста</strong> — з енергією й драйвом
                    </span>
                  </li>
                  <li className="work__positions-item">
                    <span className="work__bullet">👔</span>
                    <span className="work__position-text">
                      <strong>Менеджерів змін</strong> — тих, хто знає, як надихати інших
                    </span>
                  </li>
                </ul>
              </div>

              <div className="work__benefits">
                <h3 className="work__section-title">Що ти отримаєш:</h3>
                <ul className="work__benefits-list">
                  <li className="work__benefits-item">
                    <span className="work__check">✓</span>
                    Стабільну зарплату + бонуси
                  </li>
                  <li className="work__benefits-item">
                    <span className="work__check">✓</span>
                    Гнучкий графік (навчання? ми розуміємо)
                  </li>
                  <li className="work__benefits-item">
                    <span className="work__check">✓</span>
                    Безкоштовне харчування
                  </li>
                  <li className="work__benefits-item">
                    <span className="work__check">✓</span>
                    Знижки на продукцію
                  </li>
                  <li className="work__benefits-item">
                    <span className="work__check">✓</span>
                    Кар'єрне зростання — з кухні до керівництва
                  </li>
                </ul>
              </div>
            </div>

            <div className="work__right-column">
              <div className="work__worker-image">
                <img src={worker} alt="Worker" />
              </div>
            </div>
          </div>
        </div>

        <div className="work__bottom-section">
          <div className="work__team-section">
            <div className="work__team-image">
              <img src={impactStrategy} alt="Impact Strategy" className="work__team-image-img"/>
            </div>
            
            <div className="work__team-content">
              <h3 className="work__team-title">Ти підходиш нам, якщо:</h3>
              <ul className="work__team-list">
                <li className="work__team-item">
                  • любиш працювати в команді
                </li>
                <li className="work__team-item">
                  • не боїшся швидкого темпу
                </li>
                <li className="work__team-item">
                  • не чекаєш "ідеальних умов" — а створюєш їх
                </li>
              </ul>
              
              <Link to="/work-in-restaurant-apply">
                <button className="work__cta-button">
                  Заповнити анкету
                </button>
              </Link>
            </div>
          </div>
          
          <div className="work__contact">
            <p className="work__contact-text">
              Телефонуй або пиши нам у Direct — поговоримо.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};