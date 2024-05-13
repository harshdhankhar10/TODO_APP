// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJ1Ol7lNIazbs2lIg2u6HMrB4FHxq-BTQ",
  authDomain: "todoapp-c515d.firebaseapp.com",
  databaseURL: "https://todoapp-c515d-default-rtdb.firebaseio.com",
  projectId: "todoapp-c515d",
  storageBucket: "todoapp-c515d.appspot.com",
  messagingSenderId: "555691969519",
  appId: "1:555691969519:web:325d8ff6917e722c85041a",
  measurementId: "G-GV44F89XS7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db  = getFirestore(app);
export const auth = getAuth(app);