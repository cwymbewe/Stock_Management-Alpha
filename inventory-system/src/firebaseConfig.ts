import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCdhQDbcsIb2sOd3QKtJL3vd5MtvKxbVes",
  authDomain: "alphalp-gas-stock-management.firebaseapp.com",
  projectId: "alphalp-gas-stock-management",
  storageBucket: "alphalp-gas-stock-management.firebasestorage.app",
  messagingSenderId: "56327613798",
  appId: "1:56327613798:web:9e2a4d0b6d88ceeb5eaca7",
  measurementId: "G-4T997KDH2Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
