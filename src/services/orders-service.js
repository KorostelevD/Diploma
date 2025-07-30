import { collection, addDoc, query, where, getDocs, orderBy, doc as firestoreDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createOrder = async (orderData) => {
    try {
        const orderRef = collection(db, "orders");
        const docRef = await addDoc(orderRef, orderData);
        return docRef.id;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}

export const getUserOrders = async (userId) => {
    try {
        const ordersRef = collection(db, "orders");
        const userRef = firestoreDoc(db, "users", userId);
        const q = query(
            ordersRef, 
            where("user", "==", userRef),
            orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const orders = [];
        
        for (const orderDoc of querySnapshot.docs) {
            const orderData = orderDoc.data();
            const order = {
                id: orderDoc.id,
                ...orderData,
                products: []
            };
            
            if (orderData.products && orderData.products.length > 0) {
                for (const productRef of orderData.products) {
                    try {
                        const productDoc = await getDoc(productRef.product);
                        if (productDoc.exists()) {
                            order.products.push({
                                ...productDoc.data(),
                                id: productDoc.id,
                                quantity: productRef.quantity
                            });
                        }
                    } catch (error) {
                        console.error("Error fetching product:", error);
                    }
                }
            }
            
            orders.push(order);
        }
        
        return orders;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
}

export const getAllOrders = async () => {
    try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        
        const querySnapshot = await getDocs(q);
        const orders = [];
        
        for (const orderDoc of querySnapshot.docs) {
            const orderData = orderDoc.data();
            const order = {
                id: orderDoc.id,
                ...orderData,
                products: [],
                clientName: null
            };
            
            if (orderData.user) {
                try {
                    const userDoc = await getDoc(orderData.user);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        order.clientName = userData.displayName || userData.name || 'Невідомий користувач';
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    order.clientName = 'Помилка завантаження користувача';
                }
            }
            
            if (orderData.products && orderData.products.length > 0) {
                for (const productRef of orderData.products) {
                    try {
                        const productDoc = await getDoc(productRef.product);
                        if (productDoc.exists()) {
                            order.products.push({
                                ...productDoc.data(),
                                id: productDoc.id,
                                quantity: productRef.quantity
                            });
                        }
                    } catch (error) {
                        console.error("Error fetching product:", error);
                    }
                }
            }
            
            orders.push(order);
        }
        
        return orders;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
    }
}