// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a2c4b.firebaseapp.com",
  projectId: "mern-auth-a2c4b",
  storageBucket: "mern-auth-a2c4b.appspot.com",
  messagingSenderId: "581644664153",
  appId: "1:581644664153:web:d33ac782ada6e538ade048",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
