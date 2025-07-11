import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProceedOrder.css';

export const ProceedOrder = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedDelivery, setSelectedDelivery] = useState('pickup');
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const deliveryMethods = [
    { id: 'pickup', label: 'Самовивіз з ресторану', price: 0 },
    { id: 'delivery', label: 'Доставка кур\'єром', price: 50 },
    { id: 'express', label: 'Експрес доставка', price: 100 }
  ];

  const paymentMethods = [
    { id: 'cash', label: 'Готівка' },
    { id: 'card', label: 'Картка онлайн' },
    { id: 'card_courier', label: 'Картка при отриманні' }
  ];

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

  const handleCompleteOrder = () => {
    const orderData = {
      items,
      delivery: getSelectedDeliveryMethod(),
      payment: getSelectedPaymentMethod(),
      total: getTotalWithDelivery()
    };
    
    console.log('Order completed:', orderData);
    
    clearCart();
    alert('Замовлення успішно оформлено! Дякуємо за покупку!');
    
    navigate('/');
  };

  if (items.length === 0) {
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
        <h1 className="proceed-order__title">Оформлення замовлення</h1>
        
        <div className="proceed-order__items">
          <h2 className="proceed-order__section-title">Ваше замовлення</h2>
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
                {item.description && (
                  <p className="proceed-order__item-description">{item.description}</p>
                )}
              </div>
              
              <div className="proceed-order__item-details">
                <div className="proceed-order__item-quantity">
                  Кількість: {item.quantity}
                </div>
                <div className="proceed-order__item-price">
                  {formatPrice(item.price * item.quantity)},00 грн
                </div>
              </div>
            </div>
          ))}
          
          <div className="proceed-order__subtotal">
            <span>Вартість товарів: {formatPrice(getCartTotal())},00 грн</span>
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
              <span className="proceed-order__dropdown-arrow">
                {isDeliveryOpen ? '↑' : '↓'}
              </span>
            </button>
            
            {isDeliveryOpen && (
              <div className="proceed-order__dropdown-content">
                {deliveryMethods.map((method) => (
                  <label key={method.id} className="proceed-order__radio-option">
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
                    <span className="proceed-order__radio-label">
                      {method.label}
                      {method.price > 0 && (
                        <span className="proceed-order__option-price">
                          +{method.price},00 грн
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="proceed-order__section">
          <h2 className="proceed-order__section-title">Спосіб оплати</h2>
          <div className="proceed-order__dropdown">
            <button 
              className={`proceed-order__dropdown-toggle ${isPaymentOpen ? 'active' : ''}`}
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
            >
              <span>{getSelectedPaymentMethod()?.label}</span>
              <span className="proceed-order__dropdown-arrow">
                {isPaymentOpen ? '↑' : '↓'}
              </span>
            </button>
            
            {isPaymentOpen && (
              <div className="proceed-order__dropdown-content">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="proceed-order__radio-option">
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
                    <span className="proceed-order__radio-label">
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="proceed-order__total">
          <div className="proceed-order__total-row">
            <span>Товари:</span>
            <span>{formatPrice(getCartTotal())},00 грн</span>
          </div>
          <div className="proceed-order__total-row">
            <span>Доставка:</span>
            <span>{getSelectedDeliveryMethod()?.price || 0},00 грн</span>
          </div>
          <div className="proceed-order__total-row proceed-order__total-final">
            <span>До сплати:</span>
            <span>{formatPrice(getTotalWithDelivery())},00 грн</span>
          </div>
        </div>

        <div className="proceed-order__footer">
          <button 
            className="proceed-order__complete-btn"
            onClick={handleCompleteOrder}
          >
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  );
}; 