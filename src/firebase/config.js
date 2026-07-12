import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFKXCH3tNpFe0eN7bhhCGMzLOOa4XDHzA",
  authDomain: "j-coins.firebaseapp.com",
  projectId: "j-coins",
  storageBucket: "j-coins.firebasestorage.app",
  messagingSenderId: "233503461495",
  appId: "1:233503461495:web:7ada0175495d50ddb2b672",
  measurementId: "G-MRBL706DPH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
