import React from "react";
import "./DownloadMobileApp.css";
import qrCode from "../../assets/images/download.png";
import appStore from "../../assets/images/Download_on_the_App_Store_Badge.svg";
import googlePlay from "../../assets/images/Google_Play_Store_badge_EN.svg";

export const DownloadMobileApp = () => {
  return (
    <section className="download-app">
      <div className="download-app__container">
        <div className="download-app__content">
          <div className="download-app__header">
            <h1 className="download-app__title">📱 Завантаж додаток The LAB</h1>
            <p className="download-app__subtitle">
              І замовляй улюблені страви ще швидше 😊🔥
            </p>
          </div>

          <div className="download-app__qr-section">
            <div className="qr-code-container">
              <img src={qrCode} alt="QR Code" className="qr-code-image"/>
            </div>
          </div>

          <div className="download-app__stores">
            <p className="download-stores__title">📱 Завантажити зараз:</p>
            <div className="store-links">
              <div className="store-link-code">
                <a href="#" target="_blank">
                  <img src={appStore} alt="Download on the App Store" width="180"/>
                </a>
                <a href="#" target="_blank">
                  <img src={googlePlay} alt="Get it on Google Play" width="180"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
