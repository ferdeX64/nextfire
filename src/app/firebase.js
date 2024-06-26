// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9sDphKixTzNvVpGeCsgxkgUzbd6NZVXM",
  authDomain: "prueba-tecnia.firebaseapp.com",
  projectId: "prueba-tecnia",
  storageBucket: "prueba-tecnia.appspot.com",
  messagingSenderId: "975927050955",
  appId: "1:975927050955:web:5cf43b8406d29f5d1d114e",
  measurementId: "G-E453N1FL1K"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);