import React from 'react';
import './AboutUs.css';
import character1 from "../../assets/images/about-us-photo-1.jpg";
import character2 from "../../assets/images/about-us-photo-2.jpg";

export const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us__container">
        <h2 className="about-us__title">ЩО МИ РОБИМО</h2>
        
        <div className="about-us__content">
          <div className="about-us__text">
            <ul className="about-us__list">
              <li>Дизайн одягу і аксесуарів</li>
              <li>UI/UX та digital-продукти</li>
              <li>Креативні кампанії і брендинг</li>
              <li>Івенти й колаборації з артистами</li>
              <li>Ми не просто створюємо тренди — ми створюємо контекст.</li>
            </ul>
          </div>
          
          <div className="about-us__images">
            <img 
              src={character2} 
              alt="Character 1" 
              className="about-us__image"
            />
            <img 
              src={character1} 
              alt="Character 2" 
              className="about-us__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}; 