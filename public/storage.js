import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { app } from "./FirebaseConfig.js"; // Assuming FirebaseConfig.js exports `app`

// Initialize Firebase Storage
const storage = getStorage(app);

// Create a root reference
const rootRef = ref(storage);

// Create a reference to 'Jonathan.jpg'
const mountainsRef = ref(storage, "jonathan.jpg");

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, "images/jonathan.jpg");

// Check reference properties
console.log("Are names equal?", mountainsRef.name === mountainImagesRef.name); // true
console.log("Are full paths equal?", mountainsRef.fullPath === mountainImagesRef.fullPath); // false

// Handle file upload
document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0]; // Get the first selected file

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  // Upload the file to Firebase Storage under the 'uploads/' folder
  const uploadRef = ref(storage, `uploads/${file.name}`);
  try {
    const snapshot = await uploadBytes(uploadRef, file);
    console.log("File uploaded successfully:", snapshot.metadata.fullPath);
    document.getElementById("uploadStatus").textContent = `File uploaded: ${snapshot.metadata.fullPath}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    document.getElementById("uploadStatus").textContent = `Upload failed: ${error.message}`;
  }
});
