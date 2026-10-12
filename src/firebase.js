import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7jhGwkJGgkhhJqA2PB4WbnvoWkHfKczw",
  authDomain: "conameuprep.firebaseapp.com",
  projectId: "conameuprep",
  storageBucket: "conameuprep.firebasestorage.app",
  messagingSenderId: "639248366760",
  appId: "1:639248366760:web:7e30448ac65889a578969d",
  measurementId: "G-0H4FT1ZEQ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
