// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO4A2ge0vtU2XFvNev6bMDLxpwMf86k0A",
  authDomain: "thelab-7660f.firebaseapp.com",
  projectId: "thelab-7660f",
  storageBucket: "thelab-7660f.firebasestorage.app",
  messagingSenderId: "797299483181",
  appId: "1:797299483181:web:6897e2cef6cd43286bcea4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Експортуємо сервіси
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);