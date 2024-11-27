// Import Firestore and initialize Firebase
import { db } from "./FirebaseConfig.js"; // Assuming FirebaseConfig.js exports 'db'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Handle form submission
document.getElementById("submitProfileButton").addEventListener("click", async () => {
  // Collect form data
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = parseInt(document.getElementById("age").value, 10); // Ensure age is a number
  const email = document.getElementById("email").value;

  // Validate form fields (optional)
  if (!firstName || !lastName || isNaN(age) || !email) {
    alert("Please fill out all fields correctly.");
    return;
  }

  try {
    // Add data to the "profiles" collection in Firestore
    const docRef = await addDoc(collection(db, "profiles"), {
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
      createdAt: new Date().toISOString(), // Optional: timestamp for record creation
    });

    alert(`Profile added successfully with ID: ${docRef.id}`);
    console.log("Profile added with ID:", docRef.id);

    // Optionally reset the form
    document.getElementById("profileForm").reset();
  } catch (error) {
    console.error("Error adding profile:", error);
    alert("Failed to add profile. Check the console for details.");
  }
});
