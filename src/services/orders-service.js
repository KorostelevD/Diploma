import { collection, addDoc } from "firebase/firestore";
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