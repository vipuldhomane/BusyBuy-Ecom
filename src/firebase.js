import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBa1JX6z49AhNYvpyP6Jp8Xe3fCu2KRtSc",
  authDomain: "busybuy-39687.firebaseapp.com",
  projectId: "busybuy-39687",
  storageBucket: "busybuy-39687.appspot.com",
  messagingSenderId: "68208133912",
  appId: "1:68208133912:web:4adb2340ff115a05f9406d",
  measurementId: "G-B083GS5J88",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
