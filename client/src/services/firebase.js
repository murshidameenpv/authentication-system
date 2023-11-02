// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FREBASE_API_KEY,
  authDomain: "mern-auth-99940.firebaseapp.com",
  projectId: "mern-auth-99940",
  storageBucket: "mern-auth-99940.appspot.com",
  messagingSenderId: "721304931149",
  appId: "1:721304931149:web:9f9f88870be17537490504"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider();