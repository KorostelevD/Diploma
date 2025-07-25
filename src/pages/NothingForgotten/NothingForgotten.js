import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/product-service';
import './NothingForgotten.css';

export const NothingForgotten = () => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem, getCartTotal, getCartItemsCount, items, customBurgers, getCustomBurgerPrice } = useCart();
  const navigate = useNavigate();

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return Math.round(price * (1 - discount / 100));
  };

  const getItemFinalPrice = (item) => {
    return calculateDiscountedPrice(item.price, item.discount);
  };

  const getCartTotalWithDiscounts = () => {
    const regularItemsTotal = items.reduce((total, item) => {
      return total + (getItemFinalPrice(item) * item.quantity);
    }, 0);
    
    const customBurgersTotal = customBurgers.reduce((total, burger) => {
      return total + (getCustomBurgerPrice(burger) * burger.quantity);
    }, 0);
    
    return regularItemsTotal + customBurgersTotal;
  };

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        setLoading(true);
        const categoryId = 'K8INUbSwLd510KU4wNzN';
        const products = await productService.getProductsByCategory(categoryId);
        setSuggestedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching suggested products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedProducts();
  }, []);

  const handleAddProduct = (product) => {
    addItem(product);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const handleOrderProducts = () => {
    navigate('/proceed-order');
  };

  if (loading) {
    return (
      <div className="nothing-forgotten">
        <div className="nothing-forgotten__loading">Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="nothing-forgotten">
      <div className="nothing-forgotten__container">
        <div className="nothing-forgotten__header">
          <h1 className="nothing-forgotten__title">Нічого не забули?</h1>
          <button 
            className="nothing-forgotten__close"
            onClick={() => navigate('/cart')}
            aria-label="Закрити"
          >
            ×
          </button>
        </div>

        <div className="nothing-forgotten__products">
          {suggestedProducts.map((product) => (
            <div key={product.id} className="nothing-forgotten__product">
              <div className="nothing-forgotten__product-image">
                <img 
                  src={product.imageUrl || product.image || '/placeholder-image.jpg'} 
                  alt={product.name}
                  className="nothing-forgotten__product-img"
                />
                <button 
                  className="nothing-forgotten__add-btn"
                  onClick={() => handleAddProduct(product)}
                  aria-label={`Додати ${product.name}`}
                >
                  +
                </button>
              </div>
              <div className="nothing-forgotten__product-info">
                <h3 className="nothing-forgotten__product-name">{product.name}</h3>
                <p className="nothing-forgotten__product-price">
                  {formatPrice(getItemFinalPrice(product))} ₴
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="nothing-forgotten__footer">
          <button 
            className="nothing-forgotten__order-btn"
            onClick={handleOrderProducts}
            disabled={getCartItemsCount() === 0}
          >
            Замовити продукти<br/>({getCartItemsCount()}) за {formatPrice(getCartTotalWithDiscounts())} грн
          </button>
        </div>
      </div>
    </div>
  );
};