// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Ensure this line is correct
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkUQj1Oz33bWg66mdaHMvRkimWQwq7LS0",
  authDomain: "legal-forge.firebaseapp.com",
  projectId: "legal-forge",
  storageBucket: "legal-forge.appspot.com",
  messagingSenderId: "862726630638",
  appId: "1:862726630638:web:76819b977c5778a65dd7ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword };