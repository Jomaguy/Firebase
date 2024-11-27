// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQt6oEbrzYhPnxKYHJO9LpKiTnzFckC2U",
  authDomain: "jomaguy-12893.firebaseapp.com",
  projectId: "jomaguy-12893",
  storageBucket: "jomaguy-12893.firebasestorage.app",
  messagingSenderId: "432603205530",
  appId: "1:432603205530:web:5d73b21c027e71f57d7423",
  measurementId: "G-5SYPBNK2CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Export initialized services
export { app, analytics, auth, db, provider };
