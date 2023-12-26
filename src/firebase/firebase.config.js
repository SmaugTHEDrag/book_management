// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4GB_QlG0DYYppIg0FqUI5ISZQAx1lZBM",
  authDomain: "library-management-e0fe1.firebaseapp.com",
  projectId: "library-management-e0fe1",
  storageBucket: "library-management-e0fe1.appspot.com",
  messagingSenderId: "989139994425",
  appId: "1:989139994425:web:510a88f39e831e1275cae8",
  measurementId: "G-Q9GE4RVZ86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;