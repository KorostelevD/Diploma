import React from "react";
import "./Categories.css";

const Categories = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="categories">
      <div className="categories__list">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`categories__item ${
              selectedCategory === category.id ? "categories__item--active" : ""
            }`}
            onClick={() => onCategoryClick(category.id)}
          >
            <div className="categories__icon">
              <img
                className="categories__icon-img"
                src={category.image}
                alt={category.name}
              />
              <span className="categories__emoji" style={{display: 'none'}}>
                {category.icon}
              </span>
            </div>
            <span className={`categories__name ${
              selectedCategory === category.id ? "categories__name--active" : ""
            }`}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; 