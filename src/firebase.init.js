// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBshdDi3C-9Ktf64Q7yomtMTMaZyEyRDyg",
  authDomain: "client-pawmart-next.firebaseapp.com",
  projectId: "client-pawmart-next",
  storageBucket: "client-pawmart-next.firebasestorage.app",
  messagingSenderId: "1017482930848",
  appId: "1:1017482930848:web:41d3a06eb1bfb83353f7c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);