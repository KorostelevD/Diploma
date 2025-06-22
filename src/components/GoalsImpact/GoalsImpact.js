import React from "react";
import "./GoalsImpact.css";
import pageCover from "../../assets/images/impact-strategy-cover.jpg";
import burger from "../../assets/images/impact-strategy-burger.jpg";

export const GoalsImpact = () => {
  return (
    <section className="goals-impact">
      <div className="goals-impact__container">
        <h2 className="goals-impact__title">Мета і вплив</h2>

        <div className="goals-impact__image-container">
          <img
            src={pageCover}
            alt="Team with burgers"
            className="goals-impact__image"
          />
        </div>

        <div className="goals-impact__mission">
          <p>
             Наша місія — готувати «на межі» У "The Lab" ми черпаємо натхнення з
            культового серіалу Breaking Bad, де кожна дія — продумана, кожен
            інгредієнт — точний, і кожна страва — справжній вибух смаку. Наша
            мета — створити атмосферу інтриги, хімії та шаленого гастро-драйву,
            де відвідувачі відчувають себе не просто гостями, а частиною великої
            історії.
          </p>
        </div>

        <div className="goals-impact__content">
          <img
            src={burger}
            alt="Team with burgers"
            className="goals-impact__image"
          />

          <div className="goals-impact__impact">
            <p>
              <strong>Наш вплив — непорівнянна гастрономічна революція</strong>
            </p>
            <p>
              Ми не просто готуємо. Ми експериментуємо, інновуємо та
              переосмислюємо:
            </p>
            <ul>
              <li>Дизайн і кухня в стилі свічури</li>
              <li>
                Локальна підтримка — частина прибутку йде на підтримку
                осіб-підприємців для молоді, щоб кожен міг цікаво обрати
                горизонтальний шлях.
              </li>
              <li>
                Інноваційні технології — кожен інгредієнт проходить через
                автентичність екологічні норми і перевірено якісним дизайном і
                поведінко відгуками
              </li>
            </ul>
            <p>Ми не просто ресторан. Ми — історія, яку ми створюємо.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
