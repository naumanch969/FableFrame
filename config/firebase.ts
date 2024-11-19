import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCGXqkj7-h14Q7iHx92UjGEQiZX7QAuBgc",
    authDomain: "mykeeps-caeb3.firebaseapp.com",
    projectId: "mykeeps-caeb3",
    storageBucket: "mykeeps-caeb3.appspot.com",
    messagingSenderId: "382906398338",
    appId: "1:382906398338:web:def71be9782a4893a9269b",
    measurementId: "G-712R3ED31Q"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);