import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div className="footer__column">
          <h4 className="footer__heading">МакДональдз® в Україні</h4>
          <ul className="footer__list">
            <li className="footer__list-item">"МакДональдз®" в Україні</li>
            <li className="footer__list-item">Зворотний зв'язок</li>
            <li className="footer__list-item">Знайти нас</li>
            <li className="footer__list-item">Тендери</li>
            <li className="footer__list-item">Пресмакімната "МакДональдз"</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__heading">Робота</h4>
          <ul className="footer__list">
            <li className="footer__list-item">Робота</li>
            <li className="footer__list-item">Запитання та відповіді</li>
            <li className="footer__list-item">Заробітний калькулятор</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__heading">Стратегія впливу</h4>
          <ul className="footer__list">
            <li className="footer__list-item">Стратегія впливу</li>
            <li className="footer__list-item">Фундація Рональда МакДональда</li>
            <li className="footer__list-item">Бережемо планету</li>
            <li className="footer__list-item">Робочі місця</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__heading">Якість та гігієна</h4>
          <ul className="footer__list">
            <li className="footer__list-item">Якість та гігієна</li>
            <li className="footer__list-item">Гігієна в ресторанах</li>
            <li className="footer__list-item">Якість продукції</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__social">
        </div>
        <div className="footer__app-stores">
        </div>
        <div className="footer__legal">
          <p className="footer__legal-text">Політика конфіденційності  Положення та умови</p>
          <p className="footer__legal-text">© Усі права захищені 2025 МакДональдз</p>
        </div>
      </div>
    </footer>
  );
}
