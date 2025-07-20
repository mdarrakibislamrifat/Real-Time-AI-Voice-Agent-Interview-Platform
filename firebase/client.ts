// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { get } from "http";

const firebaseConfig = {
  apiKey: "AIzaSyAnAC1YeCYvEVkp5PM2m10yVN0KxdWiyFk",
  authDomain: "prepyourself-2ab85.firebaseapp.com",
  projectId: "prepyourself-2ab85",
  storageBucket: "prepyourself-2ab85.firebasestorage.app",
  messagingSenderId: "960050924867",
  appId: "1:960050924867:web:a0fe35eafa698f6d36f3f6",
  measurementId: "G-KQ2FZTFTS7"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
