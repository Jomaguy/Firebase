// Import Firebase services from FirebaseConfig.js
import { auth, provider } from "./FirebaseConfig.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


// Ensure that the JS runs only after the HTML DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("authentication.js is loaded and DOM is ready");

  // Attach Google Sign-In Handler
  document.getElementById("google-sign-in").addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Google Sign-In successful:", user.email);
        document.getElementById("quickstart-sign-in-status").textContent =
          `Google Sign-In successful: ${user.email}`;
          document.getElementById("quickstart-sign-out").disabled = false; // Enable sign-out button
          document.getElementById("quickstart-sign-in").disabled = true; // Disable sign-in button
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in with Google:", errorMessage);
        document.getElementById("quickstart-sign-in-status").textContent =
          `Error: ${errorMessage}`;
      });
  });


  // Redirect to the sign-up page
  function redirectToSignUp() {
    console.log("Redirecting to signup.html");
    window.location.href = "signup.html";
  }

  // Attach event listener to the "Sign Up" button
  document.getElementById("quickstart-sign-up").addEventListener("click", redirectToSignUp);

  // Sign In Button Handler
  document.getElementById("quickstart-sign-in").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed in as:", user.email);
        // Update UI
        document.getElementById("quickstart-sign-in-status").textContent =
          `Sign-in successful: ${user.email}`;
        document.getElementById("quickstart-sign-out").disabled = false; // Enable sign-out button
        document.getElementById("quickstart-sign-in").disabled = true; // Disable sign-in button
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error signing in:", errorMessage);
        document.getElementById("quickstart-sign-in-status").textContent =
          `Error: ${errorMessage}`;
      });
  });
  // Attach event listener to the "Sign Out" button
  document.getElementById("quickstart-sign-out").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");

        // Update UI
        document.getElementById("quickstart-sign-in-status").textContent =
          "You have signed out.";
        document.getElementById("quickstart-sign-out").disabled = true; // Disable sign-out button
        document.getElementById("quickstart-sign-in").disabled = false; // Enable sign-in button
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  });


});

  