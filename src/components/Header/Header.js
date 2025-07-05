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
              <img src={logo} alt="McDonald's Logo" className="header__logo" />
            </Link>
          </div>

          <Navigation />
        </div>
      </div>
    </header>
  );
};
