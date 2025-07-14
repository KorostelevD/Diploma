import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const sendWorkInOfficeApplication = async (applicationData) => {
    try {
        const applicationsRef = collection(db, "work-in-office-applications");
        
        const applicationWithTimestamp = {
            ...applicationData,
            submittedAt: new Date(),
        };
        
        const docRef = await addDoc(applicationsRef, applicationWithTimestamp);
        
        return {
            success: true,
            id: docRef.id,
            message: 'Application submitted successfully'
        };
    } catch (error) {
        console.error("Error submitting application:", error);
        
        return {
            success: false,
            error: error.message
        };
    }
};
