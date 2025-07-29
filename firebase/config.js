// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMAbTaUq4OG5EgWFyIFYfUSjD2WUd_izg',
  authDomain: 'kumbh-rakshak.firebaseapp.com',
  projectId: 'kumbh-rakshak',
  storageBucket: 'kumbh-rakshak.firebasestorage.app',
  messagingSenderId: '500244507573',
  appId: '1:500244507573:web:9c4d97e75e49a8c2a4c7fc',
  measurementId: 'G-KPG4K19DT0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
