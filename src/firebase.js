import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7jhGwkJGgkhhJqA2PB4WbnvoWkHfKczw",
  authDomain: "conameuprep.firebaseapp.com",
  projectId: "conameuprep",
  storageBucket: "conameuprep.firebasestorage.app",
  messagingSenderId: "639248366760",
  appId: "1:639248366760:web:7e30448ac65889a578969d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
