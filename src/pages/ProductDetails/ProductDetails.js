import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/product-service';
import { useCart } from '../../context/CartContext';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, getCartItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      alert(`${product.name} додано до кошика!`);
    }
  };

  const isInCart = product ? getCartItem(product.id) : false;
  const cartItem = isInCart ? getCartItem(product.id) : null;

  const calculateTotals = () => {
    if (!product?.ingredients || !Array.isArray(product.ingredients)) {
      return { totalWeight: 0, totalCalories: 0 };
    }

    const totals = product.ingredients.reduce((acc, ingredient) => {
      const weight = parseFloat(ingredient.weight || 0);
      const calories = parseFloat(ingredient.calories || 0);
      return {
        totalWeight: acc.totalWeight + weight,
        totalCalories: acc.totalCalories + calories
      };
    }, { totalWeight: 0, totalCalories: 0 });

    return totals;
  };

  const { totalWeight, totalCalories } = calculateTotals();

  if (loading) {
    return (
      <div className="product-details">
        <div className="product-details__state product-details__state--loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details">
        <div className="product-details__state product-details__state--error">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details">
        <div className="product-details__state product-details__state--error">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-details__back-arrow" onClick={handleGoBack}>
        <svg 
          className="product-details__back-icon"
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15 18L9 12L15 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="product-details__content">
        <div className="product-details__image-section">
          <img 
            src={product.image || product.imageUrl || '/placeholder-image.jpg'} 
            alt={product.name}
            className="product-details__image"
          />
        </div>

        <div className="product-details__info">
          <h1 className="product-details__title">{product.name}</h1>
          
          <div className="product-details__tabs">
            <div className="product-details__tab-buttons">
              <button 
                className={`product-details__tab-button ${activeTab === 'description' ? 'product-details__tab-button--active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Опис
              </button>
              <button 
                className={`product-details__tab-button ${activeTab === 'ingredients' ? 'product-details__tab-button--active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Інгредієнти
              </button>
            </div>

            <div className="product-details__tab-content">
              {activeTab === 'description' && (
                <div className="product-details__description">
                  {product.description && (
                    <div className="product-details__description-text">
                      {product.description}
                    </div>
                  )}
                  
                  {product.features && product.features.length > 0 && (
                    <ul className="product-details__list product-details__list--features">
                      {product.features.map((feature, index) => (
                        <li key={index} className="product-details__list-item">{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="product-details__ingredients">
                  {product.ingredients && product.ingredients.length > 0 ? (
                    <>
                      <div className="product-details__nutrition-summary">
                        <span className="product-details__nutrition-total">
                          {totalWeight}g / {totalCalories} калорій
                        </span>
                      </div>
                      
                      <ul className="product-details__ingredients-list">
                        {product.ingredients.map((ingredient, index) => (
                          <li key={ingredient.id || index} className="product-details__ingredient-item">
                            <span className="product-details__ingredient-name">
                              {ingredient.name || ingredient}
                            </span>
                            {ingredient.weight || ingredient.calories ? (
                              <span className="product-details__ingredient-nutrition">
                                ({ingredient.weight || 0}g / {ingredient.calories || 0} калорій)
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div className="product-details__no-ingredients">
                      Інформація про інгредієнти недоступна
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {product.price && (
            <div className="product-details__price">
              ${product.price}
            </div>
          )}

          <button 
            className={`product-details__button ${isInCart ? 'product-details__button--in-cart' : 'product-details__button--add-to-cart'}`}
            onClick={handleAddToCart}
          >
            {isInCart ? `У кошику (${cartItem.quantity})` : 'додати до кошика'}
          </button>
        </div>
      </div>
    </div>
  );
};