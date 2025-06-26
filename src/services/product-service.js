import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

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
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("id", "==", productId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }
};
