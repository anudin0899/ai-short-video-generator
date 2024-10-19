// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "personal-projects-1f548.firebaseapp.com",
  projectId: "personal-projects-1f548",
  storageBucket: "personal-projects-1f548.appspot.com",
  messagingSenderId: "466435985561",
  appId: "1:466435985561:web:0ab329b4fcce5664fba808",
  measurementId: "G-D4R17MRBY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// storage.maxUploadRetryTime = 600000;
// const analytics = getAnalytics(app);
