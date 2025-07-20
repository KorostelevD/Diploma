import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';
import customBurgerImage from '../../assets/images/custom-burger.png';

export const Cart = () => {
  const { 
    items, 
    customBurgers, 
    updateQuantity, 
    removeItem, 
    updateCustomBurgerQuantity,
    removeCustomBurger,
    getCartTotal,
    getCustomBurgerPrice
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      removeItem(productId);
    }
  };

  const handleCustomBurgerQuantityChange = (burgerId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateCustomBurgerQuantity(burgerId, newQuantity);
    } else {
      removeCustomBurger(burgerId);
    }
  };

  const handleOrder = () => {
    navigate('/nothing-forgotten');
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const getTotalItemsCount = () => {
    const regularItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const customBurgersCount = customBurgers.reduce((acc, burger) => acc + burger.quantity, 0);
    return regularItemsCount + customBurgersCount;
  };

  if (items.length === 0 && customBurgers.length === 0) {
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
                <strong>Інгредієнти:</strong>
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
            
            <div className="cart__item-controls">
              <div className="cart__quantity">
                <button 
                  className="cart__quantity-btn cart__quantity-btn--decrease"
                  onClick={() => handleCustomBurgerQuantityChange(burger.id, burger.quantity, -1)}
                  aria-label="Зменшити кількість"
                >
                  −
                </button>
                <span className="cart__quantity-value">{burger.quantity}</span>
                <button 
                  className="cart__quantity-btn cart__quantity-btn--increase"
                  onClick={() => handleCustomBurgerQuantityChange(burger.id, burger.quantity, 1)}
                  aria-label="Збільшити кількість"
                >
                  +
                </button>
              </div>
              
              <div className="cart__item-price">
                {formatPrice(getCustomBurgerPrice(burger) * burger.quantity)} грн
              </div>
            </div>
            
            <button 
              className="cart__item-remove"
              onClick={() => removeCustomBurger(burger.id)}
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
            Замовити продукти<br/>({getTotalItemsCount()}) за {formatPrice(getCartTotal())} грн
          </button>
        </div>
      </div>
    </div>
  );
};