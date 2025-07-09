import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const fetchIngredients = async (ingredientRefs) => {
  if (!ingredientRefs || !Array.isArray(ingredientRefs) || ingredientRefs.length === 0) {
    return [];
  }

  try {
    const ingredientPromises = ingredientRefs.map(async (ingredientRef) => {
      try {
        const ingredientSnap = await getDoc(ingredientRef);
        
        if (ingredientSnap.exists()) {
          return {
            id: ingredientSnap.id,
            ...ingredientSnap.data()
          };
        }
      } catch (refError) {
        console.error('Error fetching ingredient:', refError);
      }
      return null;
    });

    const ingredients = await Promise.all(ingredientPromises);
    return ingredients.filter(ingredient => ingredient !== null);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

const processProductWithIngredients = async (productDoc) => {
  const productData = {
    id: productDoc.id,
    ...productDoc.data()
  };

  const ingredients = productData.ingredients;

  if (ingredients && Array.isArray(ingredients)) {
    if (ingredients.length > 0) {
      const firstIngredient = ingredients[0];
      
      if (firstIngredient && typeof firstIngredient === 'object' && firstIngredient.path) {
        productData.ingredients = await fetchIngredients(ingredients);
      } else if (typeof firstIngredient === 'object' && (firstIngredient.name || firstIngredient.id)) {
        productData.ingredients = ingredients;
      } else {
        productData.ingredients = await fetchIngredients(ingredients);
      }
    } else {
      productData.ingredients = [];
    }
  } else {
    productData.ingredients = [];
  }

  return productData;
};

export const productService = {
  async getAllProducts() {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("name"));
      const querySnapshot = await getDocs(q);

      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  async getProductsByCategory(categoryId) {
    try {
      const categoryRef = doc(db, "categories", categoryId);
      const productsRef = collection(db, "products");

      const q = query(
        productsRef,
        where("category", "==", categoryRef),
        orderBy("name")
      );

      const querySnapshot = await getDocs(q);

      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return products;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  async getProductById(productId) {
    try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        return await processProductWithIngredients(productSnap);
      }

      return null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }
};
