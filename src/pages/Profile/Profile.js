import React from "react";
import "./Profile.css";

export const Profile = () => {
  const profileData = {
    name: "Оксана",
    email: "user@gmail.com",
    phone: "+38097657790"
  };

  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__content">
          <h1 className="profile__title">Обліковий запис</h1>
          
          <div className="profile__form">
            <div className="profile__field">
              <div className="profile__field-icon">
                <svg className="profile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="profile__field-content">
                <label className="profile__field-label">Ім'я</label>
                <div className="profile__field-value">{profileData.name}</div>
              </div>
            </div>

            <div className="profile__field">
              <div className="profile__field-icon">
                <svg className="profile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="profile__field-content">
                <label className="profile__field-label">Адреса ел. пошти</label>
                <div className="profile__field-value">{profileData.email}</div>
              </div>
            </div>

            <div className="profile__field">
              <div className="profile__field-icon">
                <svg className="profile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="profile__field-content">
                <label className="profile__field-label">Номер телефону</label>
                <div className="profile__field-value">{profileData.phone}</div>
              </div>
            </div>

            <div className="profile__field profile__field--action">
              <div className="profile__field-icon">
                <svg className="profile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className="profile__field-content">
                <div className="profile__field-label">Змінити пароль</div>
              </div>
              <div className="profile__field-arrow">
                <svg className="profile__arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </div>

            <div className="profile__field profile__field--action">
              <div className="profile__field-icon">
                <svg className="profile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div className="profile__field-content">
                <div className="profile__field-label">Способи оплати</div>
              </div>
              <div className="profile__field-arrow">
                <svg className="profile__arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </div>

            <div className="profile__field profile__field--action">
              <div className="profile__field-icon">
                <svg className="profile__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="profile__field-content">
                <div className="profile__field-label">Конфіденційність</div>
              </div>
              <div className="profile__field-arrow">
                <svg className="profile__arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};