import React from "react";
import "./CategoryModal.css";

const CategoryModal = ({ isOpen, onClose, categories, onCategorySelect }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Оберіть категорію</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category}
                className="category-item"
                onClick={() => onCategorySelect(category)}
              >
                <span className="category-name">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
