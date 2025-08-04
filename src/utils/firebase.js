// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7LwSWsEN7VDWy28cV_Q2a5fTgX1PhGOs",
  authDomain: "skote-admin-panel.firebaseapp.com",
  projectId: "skote-admin-panel",
  storageBucket: "skote-admin-panel.appspot.com",
  messagingSenderId: "320711974215",
  appId: "1:320711974215:web:fe8ebc129605cb666e8062",
  measurementId: "G-L3G632K7FB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

