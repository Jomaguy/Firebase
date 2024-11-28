// Import Firestore
import { db } from "./FirebaseConfig.js";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Function to fetch and display profiles as well as allow editing and deleting
async function displayProfiles() {
  const profilesTableBody = document.getElementById("profilesTable").querySelector("tbody");

  try {
    // Fetch all documents from the "profiles" collection
    const querySnapshot = await getDocs(collection(db, "profiles"));

    // Iterate through each document and add it to the table
    querySnapshot.forEach((docSnapshot) => {
      const profile = docSnapshot.data();
      const row = document.createElement("tr");

      // Create editable cells
      const firstNameCell = document.createElement("td");
      firstNameCell.contentEditable = "true";
      firstNameCell.textContent = profile.firstName;

      const lastNameCell = document.createElement("td");
      lastNameCell.contentEditable = "true";
      lastNameCell.textContent = profile.lastName;

      const ageCell = document.createElement("td");
      ageCell.contentEditable = "true";
      ageCell.textContent = profile.age;

      const emailCell = document.createElement("td");
      emailCell.contentEditable = "true";
      emailCell.textContent = profile.email;

      const createdAtCell = document.createElement("td");
      createdAtCell.textContent = profile.createdAt
        ? new Date(profile.createdAt).toLocaleString()
        : "N/A";

      // Add an Update button
      const actionCell = document.createElement("td");
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", async () => {
        try {
          // Prepare updated data
          const updatedData = {
            firstName: firstNameCell.textContent.trim(),
            lastName: lastNameCell.textContent.trim(),
            age: parseInt(ageCell.textContent.trim(), 10),
            email: emailCell.textContent.trim(),
          };

          // Validate data
          if (!updatedData.firstName || !updatedData.lastName || isNaN(updatedData.age) || !updatedData.email.includes("@")) {
            alert("Invalid data. Please ensure all fields are correctly filled.");
            return;
          }

          // Update Firestore document using the correct doc ID
          const documentRef = doc(db, "profiles", docSnapshot.id);
          await updateDoc(documentRef, updatedData);

          alert("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Failed to update profile. Check console for details.");
        }
      });

      // Add a Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this profile?")) {
          try {
            // Delete the document from Firestore
            const documentRef = doc(db, "profiles", docSnapshot.id);
            await deleteDoc(documentRef);

            // Remove the row from the table
            row.remove();

            alert("Profile deleted successfully!");
          } catch (error) {
            console.error("Error deleting profile:", error);
            alert("Failed to delete profile. Check console for details.");
          }
        }
      });

      // Append the Update and Delete buttons to the Actions column
      actionCell.appendChild(updateButton);
      actionCell.appendChild(deleteButton);

      // Append cells to the row
      row.appendChild(firstNameCell);
      row.appendChild(lastNameCell);
      row.appendChild(ageCell);
      row.appendChild(emailCell);
      row.appendChild(createdAtCell);
      row.appendChild(actionCell);

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



