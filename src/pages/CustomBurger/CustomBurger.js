import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { ingredientService } from "../../services/ingredient-service";
import CategoryModal from "../../components/CustomBurger/CategoryModal";
import IngredientModal from "../../components/CustomBurger/IngredientModal";
import "./CustomBurger.css";

export const CustomBurger = () => {
  const { addCustomBurger } = useCart();
  const [allIngredients, setAllIngredients] = useState([]);
  const [groupedIngredients, setGroupedIngredients] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingIngredientIndex, setEditingIngredientIndex] = useState(null);
  const [isEditingStandard, setIsEditingStandard] = useState(false);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const ingredients = await ingredientService.getAllIngredients();
      const grouped = ingredientService.groupIngredientsByCategory(ingredients);

      setAllIngredients(ingredients);
      setGroupedIngredients(grouped);

      const standardIngredient = ingredients.find(
        (ingredient) =>
          ingredient.name === "Стандартна" && ingredient.category === "Стандарт"
      );
      if (standardIngredient) {
        setSelectedIngredients([
          {
            ...standardIngredient,
            isStandard: true,
          },
        ]);
      }

      setError(null);
    } catch (err) {
      setError("Помилка завантаження інгредієнтів");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCategoryModal = () => {
    setEditingIngredientIndex(null);
    setIsEditingStandard(false);
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(false);
    setIsIngredientModalOpen(true);
  };

  const handleCloseIngredientModal = () => {
    setIsIngredientModalOpen(false);
    setSelectedCategory("");
    setEditingIngredientIndex(null);
    setIsEditingStandard(false);
  };

  const handleBackToCategories = () => {
    setIsIngredientModalOpen(false);
    setIsCategoryModalOpen(true);
    setEditingIngredientIndex(null);
    setIsEditingStandard(false);
  };

  const findIngredientCategory = (ingredient) => {
    for (const [category, ingredients] of Object.entries(groupedIngredients)) {
      if (ingredients.some((ing) => ing.id === ingredient.id)) {
        return category;
      }
    }
    return null;
  };

  const handleIngredientClick = (ingredient, index) => {
    if (ingredient.isStandard) {
      setEditingIngredientIndex(index);
      setIsEditingStandard(true);
      setSelectedCategory("Стандарт");
      setIsCategoryModalOpen(false);
      setIsIngredientModalOpen(true);
      return;
    }

    const category = findIngredientCategory(ingredient);
    if (category) {
      setEditingIngredientIndex(index);
      setIsEditingStandard(false);
      setSelectedCategory(category);
      setIsCategoryModalOpen(false);
      setIsIngredientModalOpen(true);
    }
  };

  const handleIngredientSelect = (ingredient) => {
    if (editingIngredientIndex !== null) {
      setSelectedIngredients((prev) =>
        prev.map((item, index) =>
          index === editingIngredientIndex
            ? { ...ingredient, isStandard: isEditingStandard }
            : item
        )
      );
    } else {
      setSelectedIngredients((prev) => [
        ...prev,
        { ...ingredient, isStandard: false },
      ]);
    }
    handleCloseIngredientModal();
  };

  const handleRemoveIngredient = (ingredientIndex) => {
    setSelectedIngredients((prev) =>
      prev.filter((ingredient, index) => index !== ingredientIndex)
    );
  };

  const calculateTotalPrice = () => {
    return selectedIngredients.reduce((total, ingredient) => {
      return total + (ingredient.price || 0);
    }, 0);
  };

  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      alert("Будь ласка, оберіть інгредієнти для бургера");
      return;
    }

    try {
      addCustomBurger(selectedIngredients);
      alert("Бургер додано до кошика!");
    } catch (error) {
      alert("Помилка при додаванні бургера до кошика");
    }
  };

  const availableCategories = Object.keys(groupedIngredients).filter(
    (category) => groupedIngredients[category].length > 0 && category !== "Стандарт"
  );

  if (loading) {
    return <div className="custom-burger-loading">Завантаження...</div>;
  }

  if (error) {
    return <div className="custom-burger-error">{error}</div>;
  }

  if (selectedIngredients.length === 0) {
    return <div className="custom-burger-loading">Ініціалізація...</div>;
  }



  return (
    <div className="custom-burger">
      <div className="custom-burger__container">
        <h1 className="custom-burger__title">Власний бургер</h1>

        <div className="custom-burger__content">
          <div className="custom-burger__builder">
            <h2 className="custom-burger__section-title">
              Конфігуратор бургера
            </h2>

            <div className="custom-burger__ingredients-list">
              {selectedIngredients[0] && (
                <div
                  key={`${selectedIngredients[0].id}-top`}
                  className="custom-burger__ingredient custom-burger__ingredient--clickable"
                  onClick={() => handleIngredientClick(selectedIngredients[0], 0)}
                >
                  <div className="custom-burger__ingredient-info">
                    <span className="custom-burger__ingredient-name">
                      {selectedIngredients[0].name.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              {selectedIngredients.slice(1).map((ingredient, index) => {
                const actualIndex = index + 1;
                return (
                  <div
                    key={`${ingredient.id}-${actualIndex}`}
                    className="custom-burger__ingredient custom-burger__ingredient--clickable"
                    onClick={() => handleIngredientClick(ingredient, actualIndex)}
                  >
                    <div className="custom-burger__ingredient-info">
                      <span className="custom-burger__ingredient-name">
                        {ingredient.name.toUpperCase()}
                      </span>
                    </div>
                    {!ingredient.isStandard && (
                      <button
                        className="custom-burger__remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveIngredient(actualIndex);
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}

              <button
                className="custom-burger__add-btn"
                onClick={handleOpenCategoryModal}
              >
                +
              </button>

              {selectedIngredients[0] && (
                <div
                  key={`${selectedIngredients[0].id}-bottom`}
                  className="custom-burger__ingredient custom-burger__ingredient--clickable"
                  onClick={() => handleIngredientClick(selectedIngredients[0], 0)}
                >
                  <div className="custom-burger__ingredient-info">
                    <span className="custom-burger__ingredient-name">
                      {selectedIngredients[0].name.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="custom-burger__total-price">
              Загальна ціна: {calculateTotalPrice()} ₴
            </div>
            <button
              className="custom-burger__order-btn"
              onClick={handleAddToCart}
            >
              додати до кошика
            </button>
          </div>

          <div className="custom-burger__summary">
            <div className="custom-burger__burger-image">
              {selectedIngredients.length > 0 ? (
                <div className="custom-burger__ingredients-images">
                  <img
                    src={selectedIngredients[0].topImageSrc}
                    alt="Burger"
                    className="custom-burger__burger-image"
                  />

                  {selectedIngredients.slice(1).map((ingredient, index) => {
                    if (ingredient.category === 'Соус') {
                      return null;
                    }
                    let imageSrc =
                      ingredient.imageUrl ||
                      ingredient.image ||
                      "/placeholder-image.jpg";

                    return (
                      <div
                        key={`${ingredient.id}-${index}`}
                        className="custom-burger__ingredient-image"
                      >
                        <img
                          src={imageSrc}
                          alt={ingredient.name}
                          className="custom-burger__ingredient-img"
                        />
                        <span className="custom-burger__ingredient-label">
                          {ingredient.name}
                        </span>
                      </div>
                    );
                  })}

                  <img
                    src={
                      selectedIngredients[0]
                        .bottomImageSrc
                    }
                    alt="Burger"
                    className="custom-burger__burger-image"
                  />
                </div>
              ) : (
                <div className="custom-burger__no-ingredients">
                  <span>Оберіть інгредієнти для вашого бургера</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        categories={availableCategories}
        onCategorySelect={handleCategorySelect}
      />

      <IngredientModal
        isOpen={isIngredientModalOpen}
        onClose={handleCloseIngredientModal}
        ingredients={groupedIngredients[selectedCategory] || []}
        categoryName={selectedCategory}
        onIngredientSelect={handleIngredientSelect}
        {...(!isEditingStandard && {
          onBackToCategories: handleBackToCategories,
        })}
      />
    </div>
  );
};
