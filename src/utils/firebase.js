// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgnY8_Qgq9ZEsNCQo027x6oWvbXmAwcO4",
  authDomain: "netflixgpt-5cee7.firebaseapp.com",
  projectId: "netflixgpt-5cee7",
  storageBucket: "netflixgpt-5cee7.firebasestorage.app",
  messagingSenderId: "46364710896",
  appId: "1:46364710896:web:8fb25c8d087a69a7a92f35",
  measurementId: "G-DEP4Y4VMWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();