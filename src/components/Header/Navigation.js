import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const Navigation = () => {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/menu">
            Меню
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/custom-burger">
            Збирай мене
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/impact-strategy">
            Мета і вплив
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/hygiene-and-quality">
            Якість та гігієна
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/jobs">
            Про роботу
          </Link>
        </li>

        <li className="header__nav-item">
          <Link to="/cart" className="header__top-link header__cart-link" aria-label="Кошик">
            <span className="header__top-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="7"
                  cy="22"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="17"
                  cy="22"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M2 4h2l3.6 13.2a1 1 0 0 0 .96.8H19a1 1 0 0 0 .98-.8l2-8A1 1 0 0 0 21 7H6.16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinejoin="round"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="header__cart-counter">{cartItemsCount}</span>
              )}
            </span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link to="/profile" className="header__top-link" aria-label="Профіль">
            <span className="header__top-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
