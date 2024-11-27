// Import Firebase services from FirebaseConfig.js
import { auth, db } from "./FirebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// Handle user sign-up
document.getElementById("signupButton").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user info to Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(), // Optional: timestamp
    });

    alert("Sign-up successful: " + user.email);
    console.log("User added to Firestore with ID:", user.uid);
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    alert("Error: " + error.message);
  }
});
