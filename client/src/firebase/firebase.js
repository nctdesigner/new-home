// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-3mCEcDGUv-ibl2vrEX4NrWFZMgvvEBg",
  authDomain: "nctedge-b8160.firebaseapp.com",
  projectId: "nctedge-b8160",
  storageBucket: "nctedge-b8160.appspot.com",
  messagingSenderId: "447534880315",
  appId: "1:447534880315:web:d0bead285ceff10b58ee1e",
  measurementId: "G-BZ5FE1PDN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const getAuth = getAuth(app);

export default { app, auth };
