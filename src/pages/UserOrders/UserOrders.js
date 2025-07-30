import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../services/orders-service';
import './UserOrders.css';
import customBurgerImage from "../../assets/images/custom-burger.png";

export const UserOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrders, setOpenOrders] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Помилка завантаження замовлень');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated]);

  const formatDate = (date) => {
    if (!date) return '';
    
    let dateObj;
    if (date.toDate) {
      dateObj = date.toDate();
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      dateObj = new Date(date);
    }
    
    return dateObj.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const getDeliveryMethodLabel = (deliveryType) => {
    const methods = {
      'pickup': 'Самовивіз з ресторану',
      'delivery': 'Доставка кур\'єром',
      'express': 'Експрес доставка'
    };
    return methods[deliveryType] || deliveryType;
  };

  const getPaymentMethodLabel = (paymentMethod) => {
    const methods = {
      'cash': 'Готівка',
      'card': 'Картка онлайн',
      'card_courier': 'Картка при отриманні'
    };
    return methods[paymentMethod] || paymentMethod;
  };

  const toggleOrder = (orderId) => {
    setOpenOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getCustomBurgerPrice = (burger) => {
    return burger.ingredients.reduce((total, ingredient) => total + ingredient.price, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="user-orders">
        <div className="user-orders__container">
          <div className="user-orders__message">
            <h1>Авторизуйтеся для перегляду замовлень</h1>
            <p>Для перегляду історії замовлень необхідно увійти в систему</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="user-orders">
        <div className="user-orders__container">
          <div className="user-orders__loading">
            <h1>Завантаження замовлень...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-orders">
        <div className="user-orders__container">
          <div className="user-orders__error">
            <h1>Помилка</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="user-orders">
        <div className="user-orders__container">
          <div className="user-orders__empty">
            <h1>У вас поки немає замовлень</h1>
            <p>Ваші замовлення з'являться тут після оформлення</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-orders">
      <div className="user-orders__container">
        <h1 className="user-orders__title">Мої замовлення</h1>
        
        <div className="user-orders__list">
          {orders.map((order) => (
            <div key={order.id} className="user-orders__item">
              <div className="user-orders__header" onClick={() => toggleOrder(order.id)}>
                <div className="user-orders__info">
                  <h3 className="user-orders__order-label">
                    Замовлення {formatDate(order.createdAt)}
                  </h3>
                  <div className="user-orders__details">
                    <p><strong>Адреса:</strong> {order.address || 'Самовивіз'}</p>
                    <p><strong>Телефон:</strong> {order.phone}</p>
                    <p><strong>Доставка:</strong> {getDeliveryMethodLabel(order.deliveryType)}</p>
                    <p><strong>Оплата:</strong> {getPaymentMethodLabel(order.paymentMethod)}</p>
                  </div>
                </div>
                
                <div className="user-orders__toggle">
                  <span className="user-orders__total">
                    {formatPrice(order.totalAmount)} грн
                  </span>
                  <span className={`user-orders__arrow ${openOrders[order.id] ? 'open' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M22.0504 11.7382L22.149 25.3325L16.0771 20.0829C15.5023 19.5862 14.5797 19.5929 13.9975 20.098C13.43 20.6042 13.4359 21.4171 14.0107 21.9151L22.3522 29.1196C22.7059 29.424 23.1899 29.5168 23.6434 29.4429C24.0978 29.5102 24.5804 29.4104 24.9297 29.1009L33.1658 21.7762C33.7333 21.2699 33.7274 20.457 33.1527 19.9591C32.5779 19.4624 31.6406 19.4692 31.0731 19.9742L25.0779 25.3113L24.9793 11.717C24.9742 11.0081 24.311 10.4376 23.5056 10.4434C22.7001 10.4493 22.0453 11.0294 22.0504 11.7382Z"
                            fill="currentColor"/>
                    </svg>
                  </span>
                </div>
              </div>

              {openOrders[order.id] && (
                <div className="user-orders__content">
                  <div className="user-orders__products">
                    <h4>Товари в замовленні:</h4>
                    
                    {order.products.map((product) => (
                      <div key={product.id} className="user-orders__product">
                        <div className="user-orders__product-image">
                          <img
                            src={product.image || product.imageUrl || '/placeholder-image.jpg'}
                            alt={product.name}
                            className="user-orders__product-img"
                          />
                        </div>
                        <div className="user-orders__product-info">
                          <h5 className="user-orders__product-name">{product.name}</h5>
                          <div className="user-orders__product-details">
                            <span className="user-orders__product-quantity">
                              Кількість: {product.quantity}
                            </span>
                            <span className="user-orders__product-price">
                              {formatPrice(product.price * product.quantity)} грн
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {order.customBurgers && order.customBurgers.map((burger, index) => (
                      <div key={`custom-${index}`} className="user-orders__product user-orders__product--custom">
                        <div className="user-orders__product-image">
                          <img
                            src={customBurgerImage}
                            alt="Custom Burger"
                            className="user-orders__product-img"
                          />
                        </div>
                        <div className="user-orders__product-info">
                          <h5 className="user-orders__product-name">Бургер "Збирай мене"</h5>
                          <div className="user-orders__custom-burger-ingredients">
                            <p className="user-orders__ingredients-title">Інгредієнти:</p>
                            <ul className="user-orders__ingredients-list">
                              {burger.ingredients.map((ingredient, ingredientIndex) => (
                                <li key={`${ingredient.id}-${ingredientIndex}`} className="user-orders__ingredient-item">
                                  {ingredient.name}
                                  {ingredient.category === "Стандарт" && (
                                    <span className="user-orders__ingredient-label"> Основа</span>
                                  )}
                                  {ingredient.price > 0 && (
                                    <span className="user-orders__ingredient-price"> (+{ingredient.price} ₴)</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="user-orders__product-details">
                            <span className="user-orders__product-quantity">
                              Кількість: {burger.quantity}
                            </span>
                            <span className="user-orders__product-price">
                              {formatPrice(getCustomBurgerPrice(burger) * burger.quantity)} грн
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="user-orders__order-total">
                    <div className="user-orders__total-line">
                      <span>Загальна сума:</span>
                      <span>{formatPrice(order.totalAmount)} грн</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};