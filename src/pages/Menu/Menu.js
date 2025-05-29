import React, { useState } from "react";
import "./Menu.css";
import Categories from "../../components/menu/Categories";
import Products from "../../components/menu/Products";

const categories = [
  {
    id: 1,
    name: "Меню",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop",
    isActive: true
  },
  {
    id: 2,
    name: "Сніданок",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  },
  {
    id: 3,
    name: "Найкращий комбо",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  },
  {
    id: 4,
    name: "Бургери та роли",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  },
  {
    id: 5,
    name: "Курка",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  },
  {
    id: 6,
    name: "Для компанії",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  },
  {
    id: 7,
    name: "Картопля, Каша та Салати",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  },
  {
    id: 8,
    name: "Соуси",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  },
  {
    id: 9,
    name: "Тонінги та сироли",
    image: "https://s7d1.scene7.com/is/image/mcdonalds/nav_BKFT_Muffin_Roll:category-panel-left-desktop"
  }
];

const products = {
  1: [ 
    {
      id: 1,
      name: "Тейсті Джуніор",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "89 ₴",
      category: "burger",
      discount: 15
    },
    {
      id: 2,
      name: "Біг Тейсті® Сингл",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "159 ₴",
      category: "burger"
    },
    {
      id: 3,
      name: "Дабл Біг Тейсті®",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "199 ₴",
      category: "burger",
      discount: 20
    },
    {
      id: 4,
      name: "МакКрісні",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "139 ₴",
      category: "burger",
      isNew: true
    },
    {
      id: 5,
      name: "МакКрісні Делюкс",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "169 ₴",
      category: "burger",
      isNew: true,
      discount: 10
    },
    {
      id: 6,
      name: "Біг Мак®",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "149 ₴",
      category: "burger"
    }
  ],
  2: [ 
    {
      id: 7,
      name: "Мак Маффін з яйцем",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "69 ₴",
      discount: 25
    },
    {
      id: 8,
      name: "Сосиска Мак Маффін",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "59 ₴"
    }
  ],
  3: [ 
    {
      id: 9,
      name: "НайСрайс Комбо Біг Мак",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "189 ₴",
      discount: 12
    }
  ],
  4: [
    {
      id: 10,
      name: "Чізбургер",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "49 ₴"
    },
    {
      id: 11,
      name: "Гамбургер",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "39 ₴",
      discount: 18
    }
  ],
  5: [
    {
      id: 12,
      name: "Чікен МакНаггетс 6 шт",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "79 ₴",
      discount: 30
    }
  ],
  6: [ 
    {
      id: 13,
      name: "Чікен МакНаггетс 20 шт",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "199 ₴"
    }
  ],
  7: [ 
    {
      id: 14,
      name: "Картопля фрі мала",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "39 ₴",
      discount: 22
    }
  ],
  8: [ 
    {
      id: 15,
      name: "Кетчуп",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "5 ₴"
    }
  ],
  9: [
    {
      id: 16,
      name: "Кока-Кола 0.5л",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/McD_Hamburger:nutrition-calculator-tile",
      price: "29 ₴",
      discount: 15
    }
  ]
};

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const selectedProducts = products[selectedCategory] || [];

  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__sidebar">
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        <div className="menu__content">
          <div className="menu__header">
            <h1 className="menu__title">Меню</h1>
          </div>

          <Products
            products={selectedProducts}
            categoryName={selectedCategoryData?.name}
          />
        </div>
      </div>
    </div>
  );
};
