import React, { useState, useEffect } from "react";
import "./Menu.css";
import Categories from "../../components/menu/Categories";
import Products from "../../components/menu/Products";
import Loader from "../../components/Loader/Loader";
import { categoryService } from "../../services/category-service";
import { productService } from "../../services/product-service";
import menuIcon from "../../assets/images/menu-icon.png";

export const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedCategories = await categoryService.getCategories();

        const allCategory = {
          id: "all",
          name: "Меню",
          image: menuIcon,
        };

        const categoriesWithAll = [allCategory, ...fetchedCategories];
        setCategories(categoriesWithAll);
        setSelectedCategory("all");
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      try {
        setProductsLoading(true);
        let fetchedProducts;

        if (selectedCategory === "all") {
          fetchedProducts = await productService.getAllProducts();
        } else {
          fetchedProducts = await productService.getProductsByCategory(
            selectedCategory
          );
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again.");
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === selectedCategory) {
      return;
    }

    setSelectedCategory(categoryId);
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

  if (loading) {
    return (
      <div className="menu">
        <div className="menu__container">
          <div className="menu__loading">
            <Loader
              type="spinner"
              text="Завантаження меню..."
              size="large"
              color="primary"
            />
          </div>
        </div>
      </div>
    );
  }

  if (error && categories.length === 0) {
    return (
      <div className="menu">
        <div className="menu__container">
          <div className="menu__error">
            <p className="menu__error-text">{error}</p>
            <button
              className="menu__error-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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

          {productsLoading ? (
            <div className="menu__products-loading">
              <Loader
                type="dots"
                text="Завантаження продуктів..."
                size="medium"
                color="primary"
              />
            </div>
          ) : (
            <Products
              products={products}
              categoryName={selectedCategoryData?.name}
            />
          )}

          {error && products.length === 0 && !productsLoading && (
            <div className="menu__products-error">
              <p className="menu__products-error-text">
                Не вдалося завантажити продукти для цієї категорії.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
