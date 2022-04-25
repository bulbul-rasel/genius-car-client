// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnBUZyv-qVzQ9khSTR2LJFbkJyovPG9nc",
    authDomain: "genius-car-again.firebaseapp.com",
    projectId: "genius-car-again",
    storageBucket: "genius-car-again.appspot.com",
    messagingSenderId: "516407035596",
    appId: "1:516407035596:web:26a38b44d4618ebe592469"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;