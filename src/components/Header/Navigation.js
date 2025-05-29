import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item"><Link className="header__nav-link" to="/menu">Меню</Link></li>
        <li className="header__nav-item"><Link className="header__nav-link" to="/custom-burger">Власний бургер</Link></li>
        <li className="header__nav-item"><Link className="header__nav-link" to="/jobs">Робота</Link></li>
        <li className="header__nav-item"><Link className="header__nav-link" to="/impact-strategy">Стратегія впливу</Link></li>
        <li className="header__nav-item"><Link className="header__nav-link" to="/hygiene-and-quality">Якість та гігієна</Link></li>
        <li className="header__nav-item"><Link className="header__nav-link" to="/delivery">McDelivery</Link></li>
      </ul>
    </nav>
  );
}
