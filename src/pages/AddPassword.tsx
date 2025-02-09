import { useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { AddTaskButton, Container, StyledInput } from "../styles";
import {TopBar } from "../components";
import { useTheme } from "@emotion/react";
import { ColorPalette } from "../theme/themeConfig";
import InputThemeProvider from "../contexts/InputThemeProvider";
import { Formik } from 'formik';

const AddPassword = () => {
  const theme = useTheme();

  const n = useNavigate();

  useEffect(() => {
    document.title = "Vault - Add Password";
  }, []);


  return (
    <>
      <TopBar title="Add New Task" />
      <Container>
        {/* fix for input colors */}
        <Formik
          initialValues={{ appName: '', username:'',password: '' }}
          validate={values => {
            const errors = {};
            if (!values.appName) {
              errors.appName = 'Required';
            }
            if(!values.username){
              errors.username = "Password is Required"
            }
            if(!values.password){
              errors.password = "Password is Required"
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <InputThemeProvider>
                <StyledInput
                  label="Application Name"
                  name="appName"
                  placeholder="Enter Application Name"
                  autoComplete="off"
                  value={values.appName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors.appName !== ""}
                  helpercolor={errors.appName && ColorPalette.red}
                />
                <StyledInput
                  label="User Name"
                  name="username"
                  placeholder="Enter user name"
                  autoComplete="off"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  error={errors.username !== ""}
                  helpercolor={errors.username && ColorPalette.red}
                />
                <StyledInput
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  error={errors.password !== ""}
                  helpercolor={errors.password && ColorPalette.red}
                />
              </InputThemeProvider>
              {errors.password && touched.password && errors.password}
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

export default AddPassword;
