import React from "react";
import "./HygieneAndQuality.css";
import hygieneImage1 from "../../assets/images/hygiene-image-1.jpg";
import hygieneImage2 from "../../assets/images/hygiene-image-2.jpg";
import hygieneImage3 from "../../assets/images/hygiene-image-3.jpg";
import hygieneImage4 from "../../assets/images/hygiene-image-4.jpg";

export const HygieneAndQuality = () => {
  return (
    <div className="hygiene-quality">
      <div className="hygiene-quality__container">
        <h1 className="hygiene-quality__title">Якість. Чистота. Контроль.</h1>

        <div className="hygiene-quality__hero">
          <img
            src={hygieneImage1}
            alt="Restaurant tables from above"
            className="hygiene-quality__hero-image"
          />
        </div>

        <div className="hygiene-quality__intro">
          <p>
            The Lab — це місце, де точність і чистота мають вирішальне значення.
            Ми не просто дотримуємося стандартів — ми створюємо власні
            протоколи, як справжня гастро-лабораторія.
          </p>
        </div>

        <div className="hygiene-quality__section">
          <div className="hygiene-quality__content">
            <h2 className="hygiene-quality__section-title">Абсолютна якість</h2>
            <div className="hygiene-quality__section-body">
              <div className="hygiene-quality__text">
                <ul>
                  <li>
                    Інгредієнти преміум-класу
                    <br />
                    Ми обираємо тільки свіжі, сертифіковані продукти, перевірені
                    постачальники — наші постійні партнери. Жодних компромісів.
                  </li>
                  <li>
                    Харчова безпека на рівні лабораторії
                    <br />
                    Кожна страва проходить через суворий контроль: температури,
                    зберігання, транспортування — все під наглядом
                    шефа-технолога.
                  </li>
                </ul>
              </div>
              <div className="hygiene-quality__image-container">
                <img
                  src={hygieneImage2}
                  alt="Kitchen work"
                  className="hygiene-quality__section-image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hygiene-quality__section">
          <div className="hygiene-quality__content">
            <h2 className="hygiene-quality__section-title">
              Гігієна на рівні "чистої кімнати"
            </h2>
            <div className="hygiene-quality__section-body">
              <div className="hygiene-quality__image-container">
                <img
                  src={hygieneImage3}
                  alt="Hand washing"
                  className="hygiene-quality__section-image"
                />
              </div>
              <div className="hygiene-quality__text">
                <ul>
                  <li>
                    Стерильні зони приготування Наші кухні розділені на зони,
                    щоб уникнути перехресного забруднення. Поверхні
                    дезінфікуються щогодини.
                  </li>
                  <li>
                    Персонал, навчений за протоколами HACCP Кожен член команди
                    проходить регулярне навчання та сертифікацію у сфері
                    харчової безпеки.
                  </li>
                  <li>
                    Одяг персоналу — лабораторного зразка Комбінезони,
                    рукавички, маски — не тільки стиль, а й частина суворої
                    гігієнічної політики.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="hygiene-quality__final">
          <img
            src={hygieneImage4}
            alt="Drinks and glasses"
            className="hygiene-quality__final-image"
          />
          <div className="hygiene-quality__final-text">
            <ul>
              <li>The Lab — місце, де кухня і наука зустрічаються</li>
              <li>
                Ми стильимось до створення не само страв, а лімана та формату.
                Тут кожен пів стерильних, а кожна страва — результат точного
                процесу.
              </li>
              <li>The Lab: майбутнє кухні. Насіння смаку.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
