// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/storage";
// Your web app's Firebase configuration
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCNlrZ5DgSAKE1acE1bffSZ8OLU5rhfV4c",
  authDomain: "interfacecreatorfilesystem.firebaseapp.com",
  projectId: "interfacecreatorfilesystem",
  storageBucket: "interfacecreatorfilesystem.appspot.com",
  messagingSenderId: "615961197891",
  appId: "1:615961197891:web:a74209058f0c04b5efc3f6",
  measurementId: "G-YQSRQ78CCD",
};

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(db);
