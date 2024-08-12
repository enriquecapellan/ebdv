import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChCyD17OHnJTtqUcMg64_1h_fgoEQaLxU",
  authDomain: "ebdv-bcab8.firebaseapp.com",
  projectId: "ebdv-bcab8",
  storageBucket: "ebdv-bcab8.appspot.com",
  messagingSenderId: "849555914481",
  appId: "1:849555914481:web:c6db662504b7097df9f350",
  measurementId: "G-1S1LP30R4X",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
