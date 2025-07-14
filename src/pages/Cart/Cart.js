import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

export const Cart = () => {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      removeItem(productId);
    }
  };

  const handleOrder = () => {
    navigate('/nothing-forgotten');
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  if (items.length === 0) {
    return (
      <div className="cart">
        <h1 className="cart__title">Кошик</h1>
        <div className="cart__empty">
          <p className="cart__empty-text">Ваш кошик порожній</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart__title">Кошик</h1>
      
      <div className="cart__items">
        {items.map((item) => (
          <div key={item.id} className="cart__item">
            <div className="cart__item-image">
              <img 
                src={item.image || item.imageUrl || '/placeholder-image.jpg'} 
                alt={item.name}
                className="cart__item-img"
              />
            </div>
            
            <div className="cart__item-info">
              <h3 className="cart__item-name">{item.name}</h3>
            </div>
            
            <div className="cart__item-controls">
              <div className="cart__quantity">
                <button 
                  className="cart__quantity-btn cart__quantity-btn--decrease"
                  onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                  aria-label="Зменшити кількість"
                >
                  −
                </button>
                <span className="cart__quantity-value">{item.quantity}</span>
                <button 
                  className="cart__quantity-btn cart__quantity-btn--increase"
                  onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                  aria-label="Збільшити кількість"
                >
                  +
                </button>
              </div>
              
              <div className="cart__item-price">
                {formatPrice(item.price * item.quantity)} грн
              </div>
            </div>
            
            <button 
              className="cart__item-remove"
              onClick={() => removeItem(item.id)}
              aria-label="Видалити товар"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart__footer">
        <div className="cart__total">
          <button
            className="cart__order-btn"
            onClick={handleOrder}
          >
            Замовити продукти<br/>({items.reduce((acc, item) => acc + item.quantity, 0)}) за {formatPrice(getCartTotal())} грн
          </button>
        </div>
      </div>
    </div>
  );
};