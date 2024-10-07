// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHf1s2euScMSRPPkurhbrZvgjGeZOLLDk",
  authDomain: "web-24-c5a52.firebaseapp.com",
  projectId: "web-24-c5a52",
  storageBucket: "web-24-c5a52.appspot.com",
  messagingSenderId: "921607681020",
  appId: "1:921607681020:web:e98d645f8d7f3762c53879"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const database = getDatabase(app);

export {
  firestore,
  database,
};
