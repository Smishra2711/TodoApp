import { useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { AddTaskButton, Container, StyledInput } from "../styles";
import {TopBar } from "../components";
import InputThemeProvider from "../contexts/InputThemeProvider";
import { Formik } from 'formik';
import FileUpload from "../components/FileUpload";


const AddMusic = () => {
  
  const n = useNavigate();

  useEffect(() => {
    document.title = "Vault - Add Music";
  }, []);


  return (
    <>
      <TopBar title="Add New Music" />
      <Container>
        {/* fix for input colors */}
        <Formik
          initialValues={{ title: '', singer:'', composer: '', }}
          validate={values => {
            const errors:any = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if(!values.singer){
              errors.singer = "Password is Required"
            }
            if(!values.composer){
              errors.composer = "Password is Required"
            }
            
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              n("/my-music");
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <InputThemeProvider>
                <StyledInput
                  label="Song Name"
                  name="appName"
                  placeholder="Enter Application Name"
                  autoComplete="off"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <StyledInput
                  label="Singer Name"
                  name="username"
                  placeholder="Enter user name"
                  autoComplete="off"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                />
                <StyledInput
                  label="File"
                  type="file"
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                />
                <FileUpload />
              </InputThemeProvider>
              
              <AddTaskButton
                type="submit"
                disabled={isSubmitting}
              >
                Add Password
              </AddTaskButton>
            </form>
          )}
        </Formik>
        
      </Container>
    </>
  );
};

export default AddMusic;
