import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const ingredientService = {
  async getAllIngredients() {
    try {
      const ingredientsRef = collection(db, "ingredients");
      const q = query(ingredientsRef, orderBy("name"));
      const querySnapshot = await getDocs(q);

      const ingredients = [];
      querySnapshot.forEach((doc) => {
        ingredients.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return ingredients;
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      throw error;
    }
  },

  groupIngredientsByCategory(ingredients) {
    return ingredients.reduce((groups, ingredient) => {
      const category = ingredient.category || "other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(ingredient);
      return groups;
    }, {});
  },

  getStandardIngredients(ingredients) {
    return ingredients.filter(
      (ingredient) => ingredient.category === "Стандарт"
    );
  },
};
