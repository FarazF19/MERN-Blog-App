// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from "dotenv"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-c20f6.firebaseapp.com",
    projectId: "mern-blog-c20f6",
    storageBucket: "mern-blog-c20f6.appspot.com",
    messagingSenderId: "61000996394",
    appId: "1:61000996394:web:c26a0faf82982254e4d553"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
