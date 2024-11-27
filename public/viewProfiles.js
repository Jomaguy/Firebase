// Import Firestore and initialize Firebase
import { db } from "./FirebaseConfig.js"; // Assuming FirebaseConfig.js exports 'db'
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Function to fetch and display profiles
async function displayProfiles() {
  const profilesTableBody = document.getElementById("profilesTable").querySelector("tbody");

  try {
    // Fetch all documents from the "profiles" collection
    const querySnapshot = await getDocs(collection(db, "profiles"));

    // Iterate through each document and add it to the table
    querySnapshot.forEach((doc) => {
      const profile = doc.data();
      const row = document.createElement("tr");

      const firstNameCell = document.createElement("td");
      firstNameCell.textContent = profile.firstName;

      const lastNameCell = document.createElement("td");
      lastNameCell.textContent = profile.lastName;

      const ageCell = document.createElement("td");
      ageCell.textContent = profile.age;

      const emailCell = document.createElement("td");
      emailCell.textContent = profile.email;

      const createdAtCell = document.createElement("td");
      createdAtCell.textContent = profile.createdAt ? new Date(profile.createdAt).toLocaleString() : "N/A";

      // Append cells to the row
      row.appendChild(firstNameCell);
      row.appendChild(lastNameCell);
      row.appendChild(ageCell);
      row.appendChild(emailCell);
      row.appendChild(createdAtCell);

      // Append the row to the table body
      profilesTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    alert("Failed to fetch profiles. Check the console for details.");
  }
}

// Call the function to display profiles
displayProfiles();
