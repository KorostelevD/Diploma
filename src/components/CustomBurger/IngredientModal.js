import React from "react";
import "./IngredientModal.css";

const IngredientModal = ({
  isOpen,
  onClose,
  ingredients,
  categoryName,
  onIngredientSelect,
  onBackToCategories,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            {onBackToCategories && (
              <button className="modal-back" onClick={onBackToCategories}>

                <svg width="33" height="25" viewBox="0 0 66 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_374_604)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.13653 25.0037C8.13679 24.4512 8.42238 23.9214 8.93045 23.531L27.8955 8.95633C28.9535 8.14327 30.6684 8.14405 31.7256 8.95808C32.7828 9.77211 32.7822 11.0913 31.7243 11.9043L17.3843 22.9246L54.1791 22.9415C55.675 22.9422 56.8871 23.8754 56.8865 25.0261C56.886 26.1767 55.6731 27.1088 54.1772 27.1082L17.3824 27.0913L31.7123 38.1247C32.7695 38.9388 32.7689 40.2579 31.7109 41.071C30.6529 41.8841 28.938 41.8833 27.8808 41.0693L8.9291 26.4772C8.42139 26.0864 8.13628 25.5562 8.13653 25.0037Z" fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_374_604">
                      <rect width="50" height="65" fill="white" transform="translate(0 50) rotate(-89.9738)"/>
                    </clipPath>
                  </defs>
                </svg>

              </button>
            )}
            <h3>Оберіть інгредієнт - {categoryName}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="ingredients-grid">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="ingredient-item"
                onClick={() => onIngredientSelect(ingredient)}
              >
                {ingredient.imageUrl && (
                  <div className="ingredient-image">
                    <img src={ingredient.imageUrl} alt={ingredient.name} />
                  </div>
                )}
                <div className="ingredient-info">
                  <span className="ingredient-name">{ingredient.name}</span>
                  {ingredient.price && (
                    <span className="ingredient-price">
                      {ingredient.price} ₴
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;
