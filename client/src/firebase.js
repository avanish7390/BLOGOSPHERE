// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-2c0ad.firebaseapp.com",
  projectId: "mern-blog-2c0ad",
  storageBucket: "mern-blog-2c0ad.appspot.com",
  messagingSenderId: "815181511507",
  appId: "1:815181511507:web:44da74d9699dc8357c3fa6"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
