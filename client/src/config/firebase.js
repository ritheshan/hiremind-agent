import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-DljXeuXYaNhySppPSMKQYTl4sp-M7I4",
  authDomain: "hiremind-auth.firebaseapp.com",
  projectId: "hiremind-auth",
  storageBucket: "hiremind-auth.firebasestorage.app",
  messagingSenderId: "919398080762",
  appId: "1:919398080762:web:58c1a0e36ef2bcd66fa943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth instance
export const auth = getAuth(app);

// 🔑 Google provider
export const googleProvider = new GoogleAuthProvider();