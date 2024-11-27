// Import Firebase Firestore
import { db } from "./FirebaseConfig.js"; // Assuming FirebaseConfig.js exports 'db'
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Function to fetch and display user emails
async function displayUserEmails() {
  const emailListElement = document.getElementById("userEmailList");

  try {
    // Fetch all documents from the "users" collection
    const querySnapshot = await getDocs(collection(db, "users"));

    // Iterate through each document and append email to the list
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const emailItem = document.createElement("li");
      emailItem.textContent = userData.email; // Assuming each document has an "email" field
      emailListElement.appendChild(emailItem);
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Failed to fetch user emails. Check the console for details.");
  }
}

// Call the function to display emails
displayUserEmails();
