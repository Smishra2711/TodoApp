"use client"; // Required for Firebase SDK in Next.js App Router

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddTaskButton, Container, StyledInput } from "../styles";
import { TopBar } from "../components";
import InputThemeProvider from "../contexts/InputThemeProvider";
import { Formik } from "formik";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";
import { storage, database } from "../utils/firebase";

const AddMusic = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    document.title = "Vault - Add Music";
  }, []);

  return (
    <>
      <TopBar title="Add New Music" />
      <Container>
        <Formik
          initialValues={{ title: "", singer: "", composer: "" }}
          validate={(values) => {
            const errors: any = {};
            if (!values.title) errors.title = "Required";
            if (!values.singer) errors.singer = "Required";
            if (!values.composer) errors.composer = "Required";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!file) {
              alert("Please select a file to upload.");
              setSubmitting(false);
              return;
            }

            setUploading(true);

            try {
              // Upload file to Firebase Storage
              const fileRef = ref(storage, `music/${file.name}`);
              await uploadBytes(fileRef, file);
              const fileUrl = await getDownloadURL(fileRef);

              // Save metadata in Realtime Database
              const metadataRef = dbRef(database, "music");
              await push(metadataRef, {
                title: values.title,
                singer: values.singer,
                composer: values.composer,
                path: fileUrl, // Save the file URL
                uploadedAt: new Date().toISOString(),
              });

              alert("Music uploaded successfully!");
              navigate("/my-music");
            } catch (error) {
              console.error("Upload error:", error);
              alert("Upload failed. Please try again.");
            } finally {
              setUploading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <InputThemeProvider>
                <StyledInput
                  label="Song Name"
                  name="title"
                  placeholder="Enter Song Name"
                  autoComplete="off"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <StyledInput
                  label="Singer Name"
                  name="singer"
                  placeholder="Enter Singer Name"
                  autoComplete="off"
                  value={values.singer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <StyledInput
                  label="Composer Name"
                  name="composer"
                  placeholder="Enter Composer Name"
                  autoComplete="off"
                  value={values.composer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <StyledInput
                  label="File"
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  onBlur={handleBlur}
                />
              </InputThemeProvider>

              <AddTaskButton type="submit" disabled={isSubmitting || uploading}>
                {uploading ? "Uploading..." : "Add Music"}
              </AddTaskButton>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default AddMusic;
