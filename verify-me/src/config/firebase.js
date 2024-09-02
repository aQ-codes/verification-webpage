// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_rrHdxw57cxwdAvHi4hZ5HvMVXqpjfhY",
  authDomain: "verify-me-71b1e.firebaseapp.com",
  projectId: "verify-me-71b1e",
  storageBucket: "verify-me-71b1e.appspot.com",
  messagingSenderId: "707658024307",
  appId: "1:707658024307:web:f53bed2d1beed4078f7106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
console.log("Firebase App Initialized:", app);

const auth = getAuth(app);
auth.useDeviceLanguage();

export {auth};




