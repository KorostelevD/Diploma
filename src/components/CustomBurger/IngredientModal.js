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
                ←
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
