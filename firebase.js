// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMG301v5f1ajKlJNg-KB-3bHvUtXHuE8M",
  authDomain: "weatherapp-c0d50.firebaseapp.com",
  projectId: "weatherapp-c0d50",
  storageBucket: "weatherapp-c0d50.appspot.com",
  messagingSenderId: "705881570700",
  appId: "1:705881570700:web:1283d705e3eba6f7ff6aa9",
  measurementId: "G-MDH8CS6H8R"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp(); // if already initialized, use that one
}

const auth = getAuth(app); // pass the app instance to getAuth

export { auth };