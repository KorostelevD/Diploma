import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

export const Profile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/");
    }
  };

  if (loading || !user) {
    return (
      <section className="profile">
        <div className="profile__container">
          <div className="profile__content">
            <div className="profile__loading">Завантаження...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__content">
          <h1 className="profile__title">Обліковий запис</h1>

          <div className="profile__form">
            <div className="profile__field">
              <div className="profile__field-icon">

                <svg width="51" height="45" viewBox="0 0 51 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_373_138)">
                    <mask id="mask0_373_138" maskUnits="userSpaceOnUse" x="0" y="0" width="51" height="51"
                          style={{maskType:"luminance;"}}>
                      <path d="M51 0H0V51H51V0Z" fill="white">
                      </path>
                    </mask>
                    <g mask="url(#mask0_373_138)">
                      <path d="M51 0H0V51H51V0Z" fill="white">
                      </path>
                      <g filter="url(#filter0_d_373_138)">
                        <path
                          d="M30.4647 26.2365L29.9122 25.3289C29.5546 25.5468 29.3582 25.9541 29.4107 26.3695C29.463 26.7848 29.7543 27.1307 30.1549 27.2529L30.4647 26.2365ZM20.5344 26.2365L20.8443 27.2529C21.2447 27.1307 21.5361 26.7848 21.5886 26.3695C21.6409 25.9541 21.4445 25.5468 21.0869 25.3289L20.5344 26.2365ZM33.9997 18.0625C33.9997 21.1395 32.3653 23.8357 29.9122 25.3289L31.0172 27.1441C34.0772 25.2813 36.1247 21.9115 36.1247 18.0625H33.9997ZM25.4997 9.5625C30.194 9.5625 33.9997 13.3681 33.9997 18.0625H36.1247C36.1247 12.1945 31.3676 7.4375 25.4997 7.4375V9.5625ZM16.9996 18.0625C16.9996 13.3681 20.8051 9.5625 25.4997 9.5625V7.4375C19.6316 7.4375 14.8746 12.1945 14.8746 18.0625H16.9996ZM21.0869 25.3289C18.6339 23.8357 16.9996 21.1395 16.9996 18.0625H14.8746C14.8746 21.9115 16.9219 25.2813 19.9819 27.1441L21.0869 25.3289ZM20.2245 25.2201C13.5164 27.2657 8.46472 33.1084 7.57622 40.2479L9.68494 40.5104C10.4682 34.2163 14.9253 29.0577 20.8443 27.2529L20.2245 25.2201ZM7.57622 40.2479C7.34138 42.1349 8.90458 43.5625 10.6246 43.5625V41.4375C9.99738 41.4375 9.6299 40.9528 9.68494 40.5104L7.57622 40.2479ZM10.6246 43.5625H40.3747V41.4375H10.6246V43.5625ZM40.3747 43.5625C42.0946 43.5625 43.6578 42.1349 43.423 40.2479L41.3141 40.5104C41.3692 40.9528 41.0017 41.4375 40.3747 41.4375V43.5625ZM43.423 40.2479C42.5345 33.1084 37.4827 27.2657 30.7745 25.2201L30.1549 27.2529C36.0739 29.0577 40.5308 34.2163 41.3141 40.5104L43.423 40.2479Z"
                          fill="currentColor">
                        </path>
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_d_373_138" x="5.05273" y="7.4375" width="40.8936" height="41.125"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix">
                      </feFlood>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                     result="hardAlpha">
                      </feColorMatrix>
                      <feOffset dy="2.5">
                      </feOffset>
                      <feGaussianBlur stdDeviation="1.25">
                      </feGaussianBlur>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0">
                      </feColorMatrix>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_373_138">
                      </feBlend>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_373_138" result="shape">
                      </feBlend>
                    </filter>
                    <clipPath id="clip0_373_138">
                      <rect width="51" height="45" fill="white">
                      </rect>
                    </clipPath>
                  </defs>
                </svg>

              </div>
              <div className="profile__field-content">
                <label className="profile__field-label">Ім'я</label>
                <div className="profile__field-value">{user?.displayName || "Не вказано"}</div>
              </div>
            </div>

            <div className="profile__field">
              <div className="profile__field-icon">

                <svg width="43" height="30" viewBox="0 0 43 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.79167 0L0 1.66667V28.3333L1.79167 30H41.2083L43 28.3333V1.66667L41.2083 0H1.79167ZM3.58333 5.43444V26.6667H39.4167V5.43389L21.4998 20.5858L3.58333 5.43444ZM36.5737 3.33333H6.42578L21.4998 16.0809L36.5737 3.33333Z" fill="#080341"/>
                </svg>

              </div>
              <div className="profile__field-content">
                <label className="profile__field-label">Адреса ел. пошти</label>
                <div className="profile__field-value">{user?.email || "Не вказано"}</div>
              </div>
            </div>

            <div className="profile__field">
              <div className="profile__field-icon">

                <svg width="53" height="46" viewBox="0 0 53 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8.55556C3 27.5787 21.1201 43 43.4722 43C44.4807 43 45.4805 42.9687 46.4705 42.9069C47.6066 42.836 48.1747 42.8007 48.6918 42.5473C49.12 42.3376 49.5262 41.9656 49.7408 41.5867C50 41.1293 50 40.5958 50 39.5289V33.2682C50 32.3709 50 31.9222 49.8265 31.5378C49.6732 31.198 49.4243 30.8956 49.1015 30.6569C48.7361 30.3867 48.2407 30.2333 47.25 29.9267L38.8765 27.3353C37.7238 26.9787 37.1474 26.8002 36.6006 26.8304C36.1184 26.8571 35.6543 26.9973 35.2601 27.2351C34.813 27.5047 34.4975 27.9522 33.8664 28.8476L31.7222 31.8889C24.803 29.222 19.1938 24.442 16.0556 18.5556L19.6291 16.7307C20.6811 16.1936 21.207 15.9251 21.5237 15.5446C21.8031 15.2091 21.9679 14.8142 21.9992 14.4038C22.0347 13.9384 21.8251 13.4478 21.406 12.4668L18.3612 5.34047C18.0008 4.49724 17.8207 4.07562 17.5032 3.76467C17.2227 3.48998 16.8673 3.27811 16.4681 3.14767C16.0164 3 15.4892 3 14.4348 3H7.07856C5.82496 3 5.19803 3 4.66066 3.22056C4.21547 3.40324 3.77837 3.74891 3.53188 4.1134C3.23421 4.55349 3.1927 5.03693 3.10941 6.00384C3.03682 6.84636 3 7.69729 3 8.55556Z" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </div>
              <div className="profile__field-content">
                <label className="profile__field-label">Номер телефону</label>
                <div className="profile__field-value">{user?.phone || "Не вказано"}</div>
              </div>
            </div>

            <div className="profile__field profile__field--action">
              <div className="profile__field-icon">

                <svg width="51" height="47" viewBox="0 0 51 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.5 29.1944V33.75M11.4375 19.01C12.7634 18.9444 14.3979 18.9444 16.5 18.9444H34.5C36.6021 18.9444 38.2367 18.9444 39.5625 19.01M11.4375 19.01C9.78285 19.0918 8.60894 19.2759 7.60696 19.6893C6.01933 20.3444 4.72856 21.3896 3.91963 22.6754C3 24.1373 3 26.0507 3 29.8778V33.0667C3 36.8938 3 38.8071 3.91963 40.269C4.72856 41.5548 6.01933 42.6001 7.60696 43.2552C9.41183 44 11.7746 44 16.5 44H34.5C39.2256 44 41.5881 44 43.3931 43.2552C44.9808 42.6001 46.2714 41.5548 47.0803 40.269C48 38.8071 48 36.8938 48 33.0667V29.8778C48 26.0507 48 24.1373 47.0803 22.6754C46.2714 21.3896 44.9808 20.3444 43.3931 19.6893C42.391 19.2759 41.2171 19.0918 39.5625 19.01M11.4375 19.01V14.3889C11.4375 8.09899 17.7335 3 25.5 3C33.2664 3 39.5625 8.09899 39.5625 14.3889V19.01" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
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

                <svg width="53" height="37" viewBox="0 0 53 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 11.8571H50M11.3556 34H41.6444C44.5691 34 46.0316 34 47.1487 33.5173C48.1312 33.0928 48.9302 32.4152 49.4308 31.582C50 30.6347 50 29.3945 50 26.9143V10.0857C50 7.60549 50 6.36536 49.4308 5.41804C48.9302 4.58474 48.1312 3.90726 47.1487 3.48269C46.0316 3 44.5691 3 41.6444 3H11.3556C8.43085 3 6.96847 3 5.85139 3.48269C4.86875 3.90726 4.06985 4.58474 3.5692 5.41804C3 6.36536 3 7.60547 3 10.0857V26.9143C3 29.3945 3 30.6347 3.5692 31.582C4.06985 32.4152 4.86875 33.0928 5.85139 33.5173C6.96847 34 8.43082 34 11.3556 34Z" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
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

                <svg width="46" height="52" viewBox="0 0 46 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.255 48.3983C21.8085 48.7132 22.0853 48.8707 22.4758 48.9524C22.779 49.0158 23.221 49.0158 23.5242 48.9524C23.9147 48.8707 24.1915 48.7132 24.745 48.3983C29.615 45.6266 43 36.92 43 24.9494V11.7797C43 10.4191 43 9.7387 42.7315 9.22015C42.4935 8.76044 42.1217 8.39349 41.6532 8.15588C41.125 7.88785 40.4157 7.87968 38.997 7.86332C31.568 7.77762 27.284 7.17918 23 3C18.716 7.17918 14.432 7.77762 7.003 7.86332C5.58433 7.87968 4.87498 7.88785 4.34663 8.15588C3.87823 8.39349 3.50647 8.76044 3.26847 9.22015C3 9.7387 3 10.4191 3 11.7797V24.9494C3 36.92 16.3849 45.6266 21.255 48.3983Z" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
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

            <div className="profile__field profile__field--action profile__field--logout" onClick={handleLogout}>
              <div className="profile__field-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 7L15.59 8.41L21.17 14H3V16H21.17L15.59 21.59L17 23L25 15L17 7ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z" fill="currentColor" transform="scale(2)"/>
                </svg>
              </div>
              <div className="profile__field-content">
                <div className="profile__field-label">Вийти з облікового запису</div>
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