import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div className="footer__column">
          <h4 className="footer__heading">Мета і вплив</h4>
          <ul className="footer__list">
            <li className="footer__list-item">Якість їжі та джерела постачання</li>
            <li className="footer__list-item">Збереження планети</li>
            <li className="footer__list-item">Підтримка громад</li>
            <li className="footer__list-item">Турбота про людей</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__heading">Працюй з нами</h4>
          <ul className="footer__list">
            <li className="footer__list-item">Зарплатний калькулятор</li>
            <li className="footer__list-item">Запитання та відповіді</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__heading">Прескімната “THE LAB”</h4>
          <ul className="footer__list">
            <li className="footer__list-item">Новини</li>
            <li className="footer__list-item">Візуальні матеріали</li>
            <li className="footer__list-item">Контакти для ЗМІ</li>
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
          <p className="footer__legal-text">© Усі права захищені 2025 THE LAB</p>
        </div>
      </div>
    </footer>
  );
}
