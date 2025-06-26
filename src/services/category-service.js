import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const categoryService = {
  async getCategories() {
    try {
      const categoriesRef = collection(db, 'categories');
      const q = query(categoriesRef, orderBy('name'));
      const querySnapshot = await getDocs(q);
      
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getCategoryById(categoryId) {
    try {
      const categoriesRef = collection(db, 'categories');
      const q = query(categoriesRef, where('id', '==', categoryId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  },
};
