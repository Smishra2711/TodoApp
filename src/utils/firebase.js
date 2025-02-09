import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDsPfMguIbg8F43PUbcA92a0DX5FhCagQ",
  authDomain: "office-wmishra.firebaseapp.com",
  databaseURL: "https://office-wmishra-default-rtdb.firebaseio.com",
  projectId: "office-wmishra",
  storageBucket: "office-wmishra.appspot.com",
  messagingSenderId: "1007096321725",
  appId: "1:1007096321725:web:6cea4cdde1a20e9957c9d4",
  measurementId: "G-7W459FB4E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
