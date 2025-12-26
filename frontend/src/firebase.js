// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD13JkJ-RrEwoApYoPHN4EVYnBvAQbpRvQ",
  authDomain: "cheatcode-481617.firebaseapp.com",
  projectId: "cheatcode-481617",
  storageBucket: "cheatcode-481617.firebasestorage.app",
  messagingSenderId: "250275454878",
  appId: "1:250275454878:web:c6cf8ab1c0494f83f1808f",
  measurementId: "G-JN7QXEDZ42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
export {app};