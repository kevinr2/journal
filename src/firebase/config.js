// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCB0gZ0-f2c8Z116huZthQXZIcQpTGwmVA",
  authDomain: "react-curso-98802.firebaseapp.com",
  projectId: "react-curso-98802",
  storageBucket: "react-curso-98802.appspot.com",
  messagingSenderId: "460669981735",
  appId: "1:460669981735:web:abf00c6fa6ea8138b4ea02",
  measurementId: "G-8ZL1ZP52TM"
};

// Initialize Firebase
export const FirebaseApp= initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)