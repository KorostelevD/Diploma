import React from "react";
import "./Jobs.css";
import workImage1 from "../../assets/images/work-image-1.jpg";
import workImage2 from "../../assets/images/work-image-2.jpg";
import workImage3 from "../../assets/images/work-image-3.jpg";
import { Link } from "react-router-dom";

export const Jobs = () => {
  return (
    <div className="jobs">
      <div className="jobs__container">
        <h1 className="jobs__title">Кар'ера в "THE LAB"</h1>

        <div className="jobs__hero">
          <div className="jobs__hero-images">
            <img
              src={workImage1}
              alt="Person with documents"
              className="jobs__hero-image"
            />
            <img
              src={workImage2}
              alt="Laptop workspace"
              className="jobs__hero-image"
            />
          </div>
        </div>

        <div className="jobs__content">
          <div className="jobs__description">
            <p>Запрошуємо до нашої команди!</p>
            <p>
              Наш ресторан відкриває двері для нових талановитих та
              відповідальних працівників! Ми шукаємо енергійних, доброзичливих і
              відданих своїй справі людей, які готові розвиватися разом з нами.
            </p>

            <div className="jobs__positions">
              <div className="jobs__position-group">
                <h3>Кого шукаємо:</h3>
                <ul>
                  <li>Офіціантів та офіціанток</li>
                  <li>Кухарів та кухонних помічників</li>
                  <li>Прибиральниць</li>
                  <li>Адміністраторів залу</li>
                </ul>
              </div>

              <div className="jobs__position-group">
                <h3>Ми пропонуємо:</h3>
                <ul>
                  <li>Стабільну заробітну плату</li>
                  <li>Комфортні умови праці</li>
                  <li>Гнучкий графік</li>
                  <li>Дружній колектив</li>
                  <li>Безкоштовне навчання</li>
                  <li>Можливість кар’єрного зростання</li>
                </ul>
              </div>
            </div>

            <p>
              Якщо ти хочеш працювати в затишному закладі з гарною атмосферою та
              цінуєш якість у всьому — тобі до нас!
            </p>
            <p>Разом створюймо смачну історію нашого ресторану!</p>

            <div className="jobs__buttons">
              <Link to="/work-in-restaurant" className="jobs__button">
                Робота в ресторані
              </Link>
              <Link to="/work-in-office" className="jobs__button">
                Робота в офісі
              </Link>
            </div>
          </div>
        </div>

        <div className="jobs__team-image">
          <img
            src={workImage3}
            alt="Team working at table"
            className="jobs__team-photo"
          />
        </div>
      </div>
    </div>
  );
};
