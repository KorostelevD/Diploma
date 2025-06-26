import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";
import logo from "../../assets/images/logo.png";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__main">
        <div className="header__main-container">
          <div className="header__logo-container">
            <Link to="/">
              <img
                src={logo}
                alt="McDonald's Logo"
                className="header__logo"
              />
            </Link>
          </div>

          <Navigation />

          <div className="header__right-container">
            <Link to="/search" className="header__top-link">
              <svg
                className="header__top-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="header__top-label">Пошук</span>
            </Link>
            <Link to="/cart" className="header__top-link">
              <span className="header__top-label">Замовлення</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
