import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy6OaJEOj4zjjQstSeCCUlA-c_V_jqHYs",
  authDomain: "task-p4-3b50c.firebaseapp.com",
  projectId: "task-p4-3b50c",
  storageBucket: "task-p4-3b50c.firebasestorage.app",
  messagingSenderId: "958826680637",
  appId: "1:958826680637:web:567771e91b8e0f7171f554",
  measurementId: "G-FD2FFFBR90"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);