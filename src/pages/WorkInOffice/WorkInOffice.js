import React from "react";
import "./WorkInOffice.css";
import workImage1 from "../../assets/images/work-image-1.jpg";
import workImage2 from "../../assets/images/work-image-2.jpg";
import workImage3 from "../../assets/images/work-image-3.jpg";
import impactStrategy from "../../assets/images/impact-strategy-cover.jpg";
import { useNavigate } from "react-router-dom";

export const WorkInOffice = () => {
  const navigate = useNavigate();
  
  return (
    <section className="office-work">
      <div className="office-work__container">
        <div className="office-work__hero">
          <h1 className="office-work__title">
            РОБОТА В ОФІСІ THE LAB — ЦЕ НЕ ПРО КАВАПАУЗИ. ЦЕ ПРО ІДЕЇ.
          </h1>
          
          <div className="office-work__hero-image">
            <img src={workImage3} alt="Office workspace" />
          </div>
          
          <h2 className="office-work__subtitle">
            Якщо ти мислиш нестандартно — нам по дорозі.
          </h2>
          
          <p className="office-work__description">
            У THE LAB офіс — це не про формальності. Це простір, де народжуються сенси, дизайн-рішення й культурні продукти, що стануть частиною міста.
          </p>
        </div>

        <div className="office-work__content">
          <div className="office-work__content-grid">
            <div className="office-work__left-column">
              <h3 className="office-work__section-title">Хто нам потрібен:</h3>
              <ul className="office-work__positions-list">
                <li className="office-work__positions-item">
                  <span className="office-work__bullet">🎨</span>
                  <span className="office-work__position-text">
                    <strong>Дизайнерів</strong> — які не просто розмальовують, а створюють історії
                  </span>
                </li>
                <li className="office-work__positions-item">
                  <span className="office-work__bullet">📱</span>
                  <span className="office-work__position-text">
                    <strong>SMM-фахівців</strong> — які вміють ловити ритм мережі
                  </span>
                </li>
                <li className="office-work__positions-item">
                  <span className="office-work__bullet">📈</span>
                  <span className="office-work__position-text">
                    <strong>HR і рекрутерів</strong> — які бачать у людях потенціал
                  </span>
                </li>
                <li className="office-work__positions-item">
                  <span className="office-work__bullet">💡</span>
                  <span className="office-work__position-text">
                    <strong>Діджітал / креаторів контенту</strong> — з любов'ю до деталей
                  </span>
                </li>
                <li className="office-work__positions-item">
                  <span className="office-work__bullet">📊</span>
                  <span className="office-work__position-text">
                    <strong>Менеджерів проєктів</strong> — які вміють тримати хаос у фокусі
                  </span>
                </li>
              </ul>
            </div>

            <div className="office-work__right-column">
              <div className="office-work__illustration">
                <img src={workImage1} alt="Office workspace" />
              </div>
            </div>
          </div>

          <div className="office-work__benefits-section">
            <div className="office-work__benefits-grid">
              <div className="office-work__benefits-left">
                <h3 className="office-work__section-title">Що ми даємо:</h3>
                <ul className="office-work__benefits-list">
                  <li className="office-work__benefits-item">
                    <span className="office-work__check">✓</span>
                    Офіс у серці міста (ідеальний фон для сторіс)
                  </li>
                  <li className="office-work__benefits-item">
                    <span className="office-work__check">✓</span>
                    Мінімум бюрократії — максимум дозволено
                  </li>
                  <li className="office-work__benefits-item">
                    <span className="office-work__check">✓</span>
                    Гнучкий графік та можливість віддаленої роботи
                  </li>
                  <li className="office-work__benefits-item">
                    <span className="office-work__check">✓</span>
                    Команда, яка не заморожується цифрочками
                  </li>
                  <li className="office-work__benefits-item">
                    <span className="office-work__check">✓</span>
                    Реальні проєкти, які бачать люди
                  </li>
                </ul>
              </div>

              <div className="office-work__benefits-right">
                <div className="office-work__office-illustration">
                  <img src={workImage2} alt="Office workspace" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="office-work__bottom-section">
          <div className="office-work__team-section">
            <div className="office-work__team-image">
              <img src={impactStrategy} alt="Impact Strategy" className="office-work__team-image-img"/>
            </div>
            
            <div className="office-work__team-content">
              <h3 className="office-work__team-title">😊 Ми шукаємо:</h3>
              <ul className="office-work__team-list">
                <li className="office-work__team-item">
                  • людей, яким ми байдужі
                </li>
                <li className="office-work__team-item">
                  • тих, хто не боїться брати відповідальність
                </li>
                <li className="office-work__team-item">
                  • тих, кому подобається робити "не як усі"
                </li>
              </ul>
              
              <button className="office-work__cta-button" onClick={() => navigate("/work-in-office-apply")}>
                Заповнити анкету
              </button>
            </div>
          </div>
          
          <div className="office-work__contact">
            <p className="office-work__contact-text">
              Телефонуй або пиши нам у Direct — поговоримо.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};