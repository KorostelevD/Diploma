import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Navigation = () => {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

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

              <svg width="47" height="35" viewBox="0 0 47 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.5001 3.5C20.0827 3.5 17.0587 5.25541 16.0247 7.83941L14.2598 12.25H15.7794H31.2206H32.7402L30.9753 7.83941C29.9412 5.25541 26.9172 3.5 23.5001 3.5ZM37.3688 12.25L35.1801 6.78037C33.5646 2.74284 28.8396 0 23.5001 0C18.1604 0 13.4354 2.74284 11.8198 6.78037L9.63108 12.25H4.41467C1.45431 12.25 -0.665992 14.5173 0.192531 16.765L2.67245 23.2575L5.73393 31.2725C6.57948 33.4863 9.15155 35 12.0672 35H19.0882H27.9118H34.9328C37.8483 35 40.4204 33.4863 41.2659 31.2725L44.3274 23.2575L46.8075 16.765C47.666 14.5173 45.5457 12.25 42.5852 12.25H37.3688ZM11.2452 15.75H4.41467L6.42 21H14.7563L13.8539 15.75H11.2452ZM18.3065 15.75L19.209 21H27.7909L28.6933 15.75H18.3065ZM33.1459 15.75L32.2437 21H40.5799L42.5852 15.75H35.7548H33.1459ZM39.2431 24.5H31.6419L30.4388 31.5H34.9328C35.9048 31.5 36.762 30.9955 37.0439 30.2575L39.2431 24.5ZM25.9863 31.5L27.1894 24.5H19.8105L21.0136 31.5H25.9863ZM16.5612 31.5L15.358 24.5H7.75689L9.95607 30.2575C10.2379 30.9955 11.0953 31.5 12.0672 31.5H16.5612Z"
                  fill="currentColor"
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

              <svg width="51" height="45" viewBox="0 0 51 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_373_138)">
                  <mask id="mask0_373_138" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="51" height="51">
                    <path d="M51 0H0V51H51V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_373_138)">
                    <path d="M51 0H0V51H51V0Z" fill="white"/>
                    <g filter="url(#filter0_d_373_138)">
                      <path d="M30.4647 26.2365L29.9122 25.3289C29.5546 25.5468 29.3582 25.9541 29.4107 26.3695C29.463 26.7848 29.7543 27.1307 30.1549 27.2529L30.4647 26.2365ZM20.5344 26.2365L20.8443 27.2529C21.2447 27.1307 21.5361 26.7848 21.5886 26.3695C21.6409 25.9541 21.4445 25.5468 21.0869 25.3289L20.5344 26.2365ZM33.9997 18.0625C33.9997 21.1395 32.3653 23.8357 29.9122 25.3289L31.0172 27.1441C34.0772 25.2813 36.1247 21.9115 36.1247 18.0625H33.9997ZM25.4997 9.5625C30.194 9.5625 33.9997 13.3681 33.9997 18.0625H36.1247C36.1247 12.1945 31.3676 7.4375 25.4997 7.4375V9.5625ZM16.9996 18.0625C16.9996 13.3681 20.8051 9.5625 25.4997 9.5625V7.4375C19.6316 7.4375 14.8746 12.1945 14.8746 18.0625H16.9996ZM21.0869 25.3289C18.6339 23.8357 16.9996 21.1395 16.9996 18.0625H14.8746C14.8746 21.9115 16.9219 25.2813 19.9819 27.1441L21.0869 25.3289ZM20.2245 25.2201C13.5164 27.2657 8.46472 33.1084 7.57622 40.2479L9.68494 40.5104C10.4682 34.2163 14.9253 29.0577 20.8443 27.2529L20.2245 25.2201ZM7.57622 40.2479C7.34138 42.1349 8.90458 43.5625 10.6246 43.5625V41.4375C9.99738 41.4375 9.6299 40.9528 9.68494 40.5104L7.57622 40.2479ZM10.6246 43.5625H40.3747V41.4375H10.6246V43.5625ZM40.3747 43.5625C42.0946 43.5625 43.6578 42.1349 43.423 40.2479L41.3141 40.5104C41.3692 40.9528 41.0017 41.4375 40.3747 41.4375V43.5625ZM43.423 40.2479C42.5345 33.1084 37.4827 27.2657 30.7745 25.2201L30.1549 27.2529C36.0739 29.0577 40.5308 34.2163 41.3141 40.5104L43.423 40.2479Z" fill="currentColor"/>
                    </g>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_d_373_138" x="5.05273" y="7.4375" width="40.8936" height="41.125" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2.5"/>
                    <feGaussianBlur stdDeviation="1.25"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_373_138"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_373_138" result="shape"/>
                  </filter>
                  <clipPath id="clip0_373_138">
                    <rect width="51" height="45" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
