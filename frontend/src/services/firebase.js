import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMOTvnqPQkkIQULVCT1Hsjr7b59cl4lZ4",  // Replace this with your actual API key
  authDomain: "letter-editor-app-1589d.firebaseapp.com",
  projectId: "letter-editor-app-1589d",
  storageBucket: "letter-editor-app-1589d.appspot.com",
  messagingSenderId: "524555696982",
  appId: "1:524555696982:web:c05ab70b5c31db231034f7",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
