import React from "react";
import "./DownloadMobileApp.css";
import qrCode from "../../assets/images/download.png";

export const DownloadMobileApp = () => {
  return (
    <section className="download-app">
      <div className="download-app__container">
        <div className="download-app__content">
          <div className="download-app__header">
            <h1 className="download-app__title">📱 Завантаж додаток The LAB</h1>
            <p className="download-app__subtitle">
              і замовляй улюблені страви ще швидше 😊🔥
            </p>
          </div>

          <div className="download-app__qr-section">
            <div className="qr-code-container">
              <img src={qrCode} alt="QR Code" className="qr-code-image" />
            </div>
          </div>

          <div className="download-app__stores">
            <p className="download-stores__title">📱 Завантажити зараз:</p>
            <div className="store-links">
              <div className="store-link-code">
                &lt;div style="display: flex; gap: 20px; flex-wrap: wrap;
                margin-top: 20px;"&gt; &lt;a href="#" target="_blank"&gt;
                &lt;img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store" width="180"&gt; &lt;/a&gt; &lt;a
                href="#" target="_blank"&gt; &lt;img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play" width="180"&gt; &lt;/a&gt;
                &lt;/div&gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
