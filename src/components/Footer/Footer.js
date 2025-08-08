import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div className="footer__column">
          <h4 className="footer__heading">“THE LAB”</h4>
          <ul className="footer__list">
            <Link to="/urban-code">
              <li className="footer__list-item">Нова колекція: URBAN CODE</li>
            </Link>
            <Link to="/city-talks">
              <li className="footer__list-item">Проєкт "City Talks" уже в мережі</li>
            </Link>
            <Link to="/download-app">
              <li className="footer__list-item">The LAB App — наш додаток</li>
            </Link>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__heading">Працюй з нами</h4>
          <ul className="footer__list">
            <Link to="/impact-strategy">
              <li className="footer__list-item">Мета і вплив</li>
            </Link>
            <Link to="/jobs">
              <li className="footer__list-item">Кар'ера в "THE LAB"</li>
            </Link>
            <Link to="/work-in-restaurant">
              <li className="footer__list-item">Робота в ресторані</li>
            </Link>
            <Link to="/work-in-office">
              <li className="footer__list-item">Робота в офісі</li>
            </Link>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__heading">Меню і замовлення</h4>
          <ul className="footer__list">
            <Link to="/menu">
              <li className="footer__list-item">Все меню</li>
            </Link>
            <Link to="/hygiene-and-quality">
              <li className="footer__list-item">Якість та гігієна</li>
            </Link>
            <Link to="/custom-burger">
              <li className="footer__list-item">Створити власний бургер</li>
            </Link>
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
