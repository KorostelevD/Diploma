import React from "react";
import "./Products.css";

const Products = ({ products, categoryName }) => {
  const calculateDiscountedPrice = (price, discount) => {
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    const discountedPrice = numericPrice * (1 - discount / 100);
    return `${Math.round(discountedPrice)} ₴`;
  };

  return (
    <div className="products">
      <div className="products__header">
        <h2 className="products__title">
          {categoryName || "Повне меню"}
        </h2>
      </div>

      <div className="products__grid">
        {products.map((product) => (
          <div key={product.id} className="products__item">
            <div className="products__image">
              <img
                className="products__image-img"
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x150/ffbc0d/ffffff?text=McDonald%27s';
                }}
              />
              {product.isNew && (
                <span className="products__badge products__badge--new">Новинка</span>
              )}
              {product.discount && (
                <span className="products__badge products__badge--discount">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="products__info">
              <h3 className="products__name">{product.name}</h3>
              <div className="products__price-container">
                {product.discount ? (
                  <>
                    <span className="products__price products__price--old">
                      {product.price}
                    </span>
                    <span className="products__price products__price--new">
                      {calculateDiscountedPrice(product.price, product.discount)}
                    </span>
                  </>
                ) : (
                  <span className="products__price">{product.price}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="products__empty">
          <p className="products__empty-text">Продукти для цієї категорії будуть додані незабаром</p>
        </div>
      )}
    </div>
  );
};

export default Products; 