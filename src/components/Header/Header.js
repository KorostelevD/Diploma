import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <Link to="/">
            <img
              src="https://www.mcdonalds.com/content/dam/sites/ua/nfl/icons/Logo_on_white_desktop_Small.jpg"
              alt="McDonald's Logo"
              className="header__logo"
            />
          </Link>
        </div>

        <Navigation />
      </div>
    </header>
  );
};
