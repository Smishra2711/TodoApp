import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";
import { storage, database } from "../utils/firebase";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    const fileRef = ref(storage, `uploads/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // Save metadata in Realtime Database
      const metadataRef = dbRef(database, "uploads");
      await push(metadataRef, {
        fileName: file.name,
        fileUrl: url,
        uploadedAt: new Date().toISOString(),
        userId: "test_user", // Replace with actual authenticated user ID
      });

      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
