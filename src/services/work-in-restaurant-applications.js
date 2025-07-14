import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const sendRestaurantApplication = async (applicationData) => {
    try {
        const applicationsRef = collection(db, "work-in-restaurant-applications");
        
        const applicationWithTimestamp = {
            ...applicationData,
            submittedAt: new Date()
        };
        
        const docRef = await addDoc(applicationsRef, applicationWithTimestamp);
        
        return {
            success: true,
            id: docRef.id,
            message: 'Application submitted successfully'
        };
    } catch (error) {
        console.error("Error submitting restaurant application:", error);
        
        return {
            success: false,
            error: error.message
        };
    }
}; 