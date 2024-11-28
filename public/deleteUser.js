import {auth} from "./FirebaseConfig.js";
import {signInWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Handle user deletion
document.getElementById("deleteUserButton").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
  
    try {
      // Sign in with the provided email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Delete the authenticated user
      await deleteUser(user);
      alert("User deleted successfully from authentication system.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please check the email and password or view the console for details.");
    }
  });