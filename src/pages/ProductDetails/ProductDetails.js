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
      // alert(`${product.name} додано до кошика!`);
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

        <svg className="product-details__back-icon" width="66" height="51" viewBox="0 0 66 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_374_604)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.13653 25.0037C8.13679 24.4512 8.42238 23.9214 8.93045 23.531L27.8955 8.95633C28.9535 8.14327 30.6684 8.14405 31.7256 8.95808C32.7828 9.77211 32.7822 11.0913 31.7243 11.9043L17.3843 22.9246L54.1791 22.9415C55.675 22.9422 56.8871 23.8754 56.8865 25.0261C56.886 26.1767 55.6731 27.1088 54.1772 27.1082L17.3824 27.0913L31.7123 38.1247C32.7695 38.9388 32.7689 40.2579 31.7109 41.071C30.6529 41.8841 28.938 41.8833 27.8808 41.0693L8.9291 26.4772C8.42139 26.0864 8.13628 25.5562 8.13653 25.0037Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_374_604">
              <rect width="50" height="65" fill="white" transform="translate(0 50) rotate(-89.9738)"/>
            </clipPath>
          </defs>
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