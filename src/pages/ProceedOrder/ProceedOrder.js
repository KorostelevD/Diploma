import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../../context/CartContext';
import {createOrder} from '../../services/orders-service';
import {doc} from 'firebase/firestore';
import {db} from '../../firebase';
import './ProceedOrder.css';
import customBurgerImage from "../../assets/images/custom-burger.png";

export const ProceedOrder = () => {
  const {items, customBurgers, getCustomBurgerPrice, getCartTotal, clearCart} = useCart();
  const navigate = useNavigate();

  const [selectedDelivery, setSelectedDelivery] = useState('pickup');
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryMethods = [
    {id: 'pickup', label: 'Самовивіз з ресторану', price: 0},
    {id: 'delivery', label: 'Доставка кур\'єром', price: 50},
    {id: 'express', label: 'Експрес доставка', price: 100}
  ];

  const paymentMethods = [
    {id: 'cash', label: 'Готівка'},
    {id: 'card', label: 'Картка онлайн'},
    {id: 'card_courier', label: 'Картка при отриманні'}
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const getSelectedDeliveryMethod = () => {
    return deliveryMethods.find(method => method.id === selectedDelivery);
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(method => method.id === selectedPayment);
  };

  const getTotalWithDelivery = () => {
    const cartTotal = getCartTotal();
    const deliveryPrice = getSelectedDeliveryMethod()?.price || 0;
    return cartTotal + deliveryPrice;
  };

  const validateForm = () => {
    if (!phone.trim()) {
      alert('Будь ласка, введіть номер телефону');
      return false;
    }

    if (selectedDelivery === 'delivery' && !address.trim()) {
      alert('Будь ласка, введіть адресу доставки');
      return false;
    }

    return true;
  };

  const handleCompleteOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        address: selectedDelivery === 'delivery' ? address : '',
        phone: phone.trim(),
        paymentMethod: selectedPayment,
        deliveryType: selectedDelivery,
        totalAmount: getTotalWithDelivery(),
        createdAt: new Date(),
        products: items.map(item => ({
          product: doc(db, 'products', item.id),
          quantity: item.quantity
        })),
        customBurgers: customBurgers.map((burger) => (
          burger
        )),
      };

      /*customBurgers.map((burger) => (
        console.log("!burger!",JSON.stringify(burger))
      ))*/
      /*console.log("!orderData!",JSON.stringify(orderData))*/

      await createOrder(orderData);

      clearCart();
      alert('Замовлення успішно оформлено! Дякуємо за покупку!');

      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Помилка при оформленні замовлення. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && customBurgers.length === 0) {
    return (
      <div className="proceed-order">
        <div className="proceed-order__empty">
          <h1>Кошик порожній</h1>
          <button onClick={() => navigate('/')}>Повернутися до покупок</button>
        </div>
      </div>
    );
  }

  return (
    <div className="proceed-order">
      <div className="proceed-order__container">
        <div className="proceed-order__title-container">

          <div className="product-details__back-arrow-2" onClick={handleGoBack}>
            <svg className="product-details__back-icon" width="66" height="51" viewBox="0 0 66 51" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_374_604)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M8.13653 25.0037C8.13679 24.4512 8.42238 23.9214 8.93045 23.531L27.8955 8.95633C28.9535 8.14327 30.6684 8.14405 31.7256 8.95808C32.7828 9.77211 32.7822 11.0913 31.7243 11.9043L17.3843 22.9246L54.1791 22.9415C55.675 22.9422 56.8871 23.8754 56.8865 25.0261C56.886 26.1767 55.6731 27.1088 54.1772 27.1082L17.3824 27.0913L31.7123 38.1247C32.7695 38.9388 32.7689 40.2579 31.7109 41.071C30.6529 41.8841 28.938 41.8833 27.8808 41.0693L8.9291 26.4772C8.42139 26.0864 8.13628 25.5562 8.13653 25.0037Z"
                      fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_374_604">
                  <rect width="50" height="65" fill="white" transform="translate(0 50) rotate(-89.9738)"/>
                </clipPath>
              </defs>
            </svg>
          </div>

          <h1 className="proceed-order__title">Інформація про замовлення</h1>

        </div>

        <div className="proceed-order__items">

          {items.map((item) => (
            <div key={item.id} className="proceed-order__item">
              <div className="proceed-order__item-image">
                <img
                  src={item.image || item.imageUrl || '/placeholder-image.jpg'}
                  alt={item.name}
                  className="proceed-order__item-img"
                />
              </div>

              <div className="proceed-order__item-info">
                <h3 className="proceed-order__item-name">{item.name}</h3>
              </div>

              <div className="proceed-order__item-details">
                <div className="proceed-order__item-quantity">
                  Кількість: {item.quantity}
                </div>
                <div className="proceed-order__item-price">
                  {formatPrice(item.price * item.quantity)} грн
                </div>
              </div>
            </div>
          ))}

          {customBurgers.map((burger) => (
            <div key={burger.id} className="cart__item cart__item--custom-burger">
              <div className="cart__item-image">
                <img
                  src={customBurgerImage}
                  alt="Custom Burger"
                  className="cart__item-img"
                />
              </div>

              <div className="cart__item-info">
                <h3 className="cart__item-name">Бургер “Збирай мене“</h3>
                <div className="cart__custom-burger-ingredients">
                  <p className="cart__ingredients-title">Інгредієнти:</p>
                  <ul className="cart__ingredients-list">
                    {burger.ingredients.map((ingredient, index) => (
                      <li key={`${ingredient.id}-${index}`} className="cart__ingredient-item">
                        {ingredient.name}
                        {ingredient.category === "Стандарт" && (
                          <span className="cart__ingredient-label"> Основа</span>
                        )}
                        {ingredient.price > 0 && (
                          <span className="cart__ingredient-price"> (+{ingredient.price} ₴)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/*+++*/}
              <div className="proceed-order__item-details">
                <div className="proceed-order__item-quantity">
                  Кількість: {burger.quantity}
                </div>
                <div className="proceed-order__item-price">
                  {formatPrice(getCustomBurgerPrice(burger) * burger.quantity)} грн
                </div>
              </div>
            </div>
          ))}


          <div className="proceed-order__subtotal">
            <span>Вартість товарів: {formatPrice(getCartTotal())} грн</span>
          </div>
        </div>

        <div className="proceed-order__section">
          <h2 className="proceed-order__section-title">Контактна інформація</h2>
          <label className="proceed-order__label">
            Номер телефону *
          </label>
          <div className="proceed-order__input-group">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380"
              className="proceed-order__input"
              required
            />
          </div>
        </div>

        <div className="proceed-order__section">
          <h2 className="proceed-order__section-title">Спосіб доставки</h2>
          <div className="proceed-order__dropdown">
            <button
              className={`proceed-order__dropdown-toggle ${isDeliveryOpen ? 'active' : ''}`}
              onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
            >
              <span>{getSelectedDeliveryMethod()?.label}</span>
              {isDeliveryOpen ?
                <span className="proceed-order__dropdown-arrow" style={{transform: "rotate(180deg)"}}>
                    <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M22.0504 11.7382L22.149 25.3325L16.0771 20.0829C15.5023 19.5862 14.5797 19.5929 13.9975 20.098C13.43 20.6042 13.4359 21.4171 14.0107 21.9151L22.3522 29.1196C22.7059 29.424 23.1899 29.5168 23.6434 29.4429C24.0978 29.5102 24.5804 29.4104 24.9297 29.1009L33.1658 21.7762C33.7333 21.2699 33.7274 20.457 33.1527 19.9591C32.5779 19.4624 31.6406 19.4692 31.0731 19.9742L25.0779 25.3113L24.9793 11.717C24.9742 11.0081 24.311 10.4376 23.5056 10.4434C22.7001 10.4493 22.0453 11.0294 22.0504 11.7382ZM44.0824 20.5682C44.1544 30.4974 35.0307 38.6132 23.7104 38.6953C12.3902 38.7774 3.14976 30.7948 3.07776 20.8655C3.00576 10.9363 12.1295 2.82047 23.4497 2.73839C34.7699 2.6563 44.0104 10.6389 44.0824 20.5682ZM0.148856 20.8868C0.231139 32.2338 10.7833 41.3576 23.7291 41.2637C36.6748 41.1698 47.0936 31.8939 47.0113 20.5469C46.929 9.19996 36.3768 0.0761562 23.4311 0.170032C10.4853 0.263908 0.0665738 9.53978 0.148856 20.8868Z"
                            fill="black"/>
                    </svg>
                  </span>
                :
                <span className="proceed-order__dropdown-arrow" style={{transform: "rotate(0deg)"}}>
                    <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M22.0504 11.7382L22.149 25.3325L16.0771 20.0829C15.5023 19.5862 14.5797 19.5929 13.9975 20.098C13.43 20.6042 13.4359 21.4171 14.0107 21.9151L22.3522 29.1196C22.7059 29.424 23.1899 29.5168 23.6434 29.4429C24.0978 29.5102 24.5804 29.4104 24.9297 29.1009L33.1658 21.7762C33.7333 21.2699 33.7274 20.457 33.1527 19.9591C32.5779 19.4624 31.6406 19.4692 31.0731 19.9742L25.0779 25.3113L24.9793 11.717C24.9742 11.0081 24.311 10.4376 23.5056 10.4434C22.7001 10.4493 22.0453 11.0294 22.0504 11.7382ZM44.0824 20.5682C44.1544 30.4974 35.0307 38.6132 23.7104 38.6953C12.3902 38.7774 3.14976 30.7948 3.07776 20.8655C3.00576 10.9363 12.1295 2.82047 23.4497 2.73839C34.7699 2.6563 44.0104 10.6389 44.0824 20.5682ZM0.148856 20.8868C0.231139 32.2338 10.7833 41.3576 23.7291 41.2637C36.6748 41.1698 47.0936 31.8939 47.0113 20.5469C46.929 9.19996 36.3768 0.0761562 23.4311 0.170032C10.4853 0.263908 0.0665738 9.53978 0.148856 20.8868Z"
                            fill="black"/>
                    </svg>
                  </span>
              }
            </button>

            {isDeliveryOpen && (
              <div className="proceed-order__dropdown-content">

                <div className="proceed-order__dropdown-title">
                  <div>Виберіть спосіб доставки</div>
                  <div className="proceed-order__dropdown-title-icon" onClick={() => setIsDeliveryOpen(false)}>
                    <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M19.0734 15.75H7.8125V12.25H18.9625L17.2656 10.3495L19.475 7.875L25 14.063L19.475 20.2493L17.2656 17.7747L19.0734 15.75ZM15.625 7H12.5V3.5H3.125V24.5H12.5V21H15.625V28H0V0H15.625V7Z"
                            fill="black"/>
                    </svg>
                  </div>
                </div>

                {deliveryMethods.map((method) => (
                  <label key={method.id} className="proceed-order__radio-option">
                    <span className="proceed-order__radio-label">
                      {method.label}
                      {method.price > 0 && (
                        <span className="proceed-order__option-price">
                          +{method.price},00 грн
                        </span>
                      )}
                    </span>
                    <input
                      type="radio"
                      name="delivery"
                      value={method.id}
                      checked={selectedDelivery === method.id}
                      onChange={(e) => {
                        setSelectedDelivery(e.target.value);
                        setIsDeliveryOpen(false);
                      }}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
          {selectedDelivery === 'delivery' && (
            <div className="proceed-order__input-group">
              <label className="proceed-order__label">
                Адреса доставки *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Введіть адресу доставки"
                className="proceed-order__input"
                required
              />
            </div>
          )}
        </div>

        <div className="proceed-order__section">
          <h2 className="proceed-order__section-title">Спосіб оплати</h2>
          <div className="proceed-order__dropdown">
            <button
              className={`proceed-order__dropdown-toggle ${isPaymentOpen ? 'active' : ''}`}
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
            >
              <svg width="51" height="35" viewBox="0 0 51 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 11.1808H48M11 31.6328H40C42.8003 31.6328 44.2005 31.6328 45.27 31.1869C46.2108 30.7948 46.9757 30.169 47.455 29.3994C48 28.5245 48 27.3789 48 25.0881V9.54463C48 7.2538 48 6.10837 47.455 5.2334C46.9757 4.46373 46.2108 3.83798 45.27 3.44583C44.2005 3 42.8003 3 40 3H11C8.19975 3 6.7996 3 5.73005 3.44583C4.78923 3.83798 4.02432 4.46373 3.54497 5.2334C3 6.10837 3 7.25378 3 9.54463V25.0881C3 27.3789 3 28.5245 3.54497 29.3994C4.02432 30.169 4.78923 30.7948 5.73005 31.1869C6.7996 31.6328 8.19972 31.6328 11 31.6328Z"
                  stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{getSelectedPaymentMethod()?.label}</span>
              {isPaymentOpen ?
                <span className="proceed-order__dropdown-arrow" style={{transform: "rotate(180deg)"}}>
                    <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M22.0504 11.7382L22.149 25.3325L16.0771 20.0829C15.5023 19.5862 14.5797 19.5929 13.9975 20.098C13.43 20.6042 13.4359 21.4171 14.0107 21.9151L22.3522 29.1196C22.7059 29.424 23.1899 29.5168 23.6434 29.4429C24.0978 29.5102 24.5804 29.4104 24.9297 29.1009L33.1658 21.7762C33.7333 21.2699 33.7274 20.457 33.1527 19.9591C32.5779 19.4624 31.6406 19.4692 31.0731 19.9742L25.0779 25.3113L24.9793 11.717C24.9742 11.0081 24.311 10.4376 23.5056 10.4434C22.7001 10.4493 22.0453 11.0294 22.0504 11.7382ZM44.0824 20.5682C44.1544 30.4974 35.0307 38.6132 23.7104 38.6953C12.3902 38.7774 3.14976 30.7948 3.07776 20.8655C3.00576 10.9363 12.1295 2.82047 23.4497 2.73839C34.7699 2.6563 44.0104 10.6389 44.0824 20.5682ZM0.148856 20.8868C0.231139 32.2338 10.7833 41.3576 23.7291 41.2637C36.6748 41.1698 47.0936 31.8939 47.0113 20.5469C46.929 9.19996 36.3768 0.0761562 23.4311 0.170032C10.4853 0.263908 0.0665738 9.53978 0.148856 20.8868Z"
                            fill="black"/>
                    </svg>
                  </span>
                :
                <span className="proceed-order__dropdown-arrow" style={{transform: "rotate(0deg)"}}>
                    <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M22.0504 11.7382L22.149 25.3325L16.0771 20.0829C15.5023 19.5862 14.5797 19.5929 13.9975 20.098C13.43 20.6042 13.4359 21.4171 14.0107 21.9151L22.3522 29.1196C22.7059 29.424 23.1899 29.5168 23.6434 29.4429C24.0978 29.5102 24.5804 29.4104 24.9297 29.1009L33.1658 21.7762C33.7333 21.2699 33.7274 20.457 33.1527 19.9591C32.5779 19.4624 31.6406 19.4692 31.0731 19.9742L25.0779 25.3113L24.9793 11.717C24.9742 11.0081 24.311 10.4376 23.5056 10.4434C22.7001 10.4493 22.0453 11.0294 22.0504 11.7382ZM44.0824 20.5682C44.1544 30.4974 35.0307 38.6132 23.7104 38.6953C12.3902 38.7774 3.14976 30.7948 3.07776 20.8655C3.00576 10.9363 12.1295 2.82047 23.4497 2.73839C34.7699 2.6563 44.0104 10.6389 44.0824 20.5682ZM0.148856 20.8868C0.231139 32.2338 10.7833 41.3576 23.7291 41.2637C36.6748 41.1698 47.0936 31.8939 47.0113 20.5469C46.929 9.19996 36.3768 0.0761562 23.4311 0.170032C10.4853 0.263908 0.0665738 9.53978 0.148856 20.8868Z"
                            fill="black"/>
                    </svg>
                  </span>
              }
            </button>

            {isPaymentOpen && (
              <div className="proceed-order__dropdown-content">

                <div className="proceed-order__dropdown-title">
                  <div>Виберіть спосіб оплати</div>
                  <div className="proceed-order__dropdown-title-icon" onClick={() => setIsPaymentOpen(false)}>
                    <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M19.0734 15.75H7.8125V12.25H18.9625L17.2656 10.3495L19.475 7.875L25 14.063L19.475 20.2493L17.2656 17.7747L19.0734 15.75ZM15.625 7H12.5V3.5H3.125V24.5H12.5V21H15.625V28H0V0H15.625V7Z"
                            fill="black"/>
                    </svg>
                  </div>
                </div>

                {paymentMethods.map((method) => (
                  <label key={method.id} className="proceed-order__radio-option">
                    <span className="proceed-order__radio-label">
                      {method.label}
                    </span>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => {
                        setSelectedPayment(e.target.value);
                        setIsPaymentOpen(false);
                      }}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="proceed-order__total">
          <div className="proceed-order__total-row">
            <span>Товари:</span>
            <span>{formatPrice(getCartTotal())} грн</span>
          </div>
          <div className="proceed-order__total-row">
            <span>Доставка:</span>
            <span>{getSelectedDeliveryMethod()?.price || 0} грн</span>
          </div>
          <div className="proceed-order__total-row proceed-order__total-final">
            <span>До сплати:</span>
            <span>{formatPrice(getTotalWithDelivery())} грн</span>
          </div>
        </div>

        <div className="proceed-order__footer">
          <button
            className="proceed-order__complete-btn"
            onClick={handleCompleteOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Оформлення...' : 'Оформити замовлення'}
          </button>
        </div>
      </div>
    </div>
  );
};