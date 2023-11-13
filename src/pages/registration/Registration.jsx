import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// FORM VALIDATION
import { useFormik } from "formik";
import * as Yup from "yup";

// CROSS PLATFORM RESOURCE SHARING
import axios from "axios";

// IMPORT CSS
import "./registration.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORT LOCAL COMPONENTS
import Toastifier2 from "../../components/toastifier/Toastifier2";
import BrandName from "../../components/brand-name/BrandName";

// IMPORTED LOCAL CONTEXTS
import { RegisterContext } from "../../components/contexts/RegisterContext";

// IMPORT SERVICES
import { BASE_URL } from "../../services/helper";

// MUI COMPONENTS
import {
  Alert,
  Button,
  Checkbox,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// MUI THEME
const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      light: "#7780e8",
      main: "#5763e3",
      dark: "#3545dc",
      contrastText: "#fff",
    },
  },
});

const Registration = () => {
  // FORMIK SCHEMA validation
  const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Please enter your full name")
        .max(25, "Must be 25 characters or less"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please provide your email address"),

      password: Yup.string()
        .required("Please enter a password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    }),
    onSubmit: (values) => {
      axios
        .post(BASE_URL + "/register", {
          fullName: formik.values.fullName,
          email: formik.values.email,
          password: formik.values.password,
        })
        .then((res) => {
          // setAlertMessage("Congratulations, your registration is complete!");
          // setAlertSeverity("success");
          // setSnackbarOpen(true);
          navigate("/login");
          console.log(
            "Register response: " +
              res.data.success +
              " " +
              res.data.message +
              " " +
              res.data.user.id +
              " " +
              res.data.user.email +
              " " +
              res.data.user.fullName
          );
        })
        .catch((err) => {
          navigate("/register");
        });
    },
  });

  // SNACKBAR UTILITIES
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertSeverity, setAlertSeverity] = useState("success");

  // If still logged in navigate to the app
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/today");
    }
  });

  // AGREED TO TERM STATE
  const [agreedTerms, setAgreedTerms] = useState(false);
  return (
    <RegisterContext.Provider
      value={{
        snackbarOpen,
        setSnackbarOpen,
        // setAlertMessage,
        // setAlertSeverity,
      }}
    >
      <ThemeProvider theme={theme}>
        <div className="register-bg">
          <div className="center-container">
            <BrandName className="brand-name" />
            <div className="sub-headings">
              <div className="heading-1">Create your TODO HIVE account</div>
              <div className="heading-2">to continue to TODO HIVE</div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="regiter-inputs">
                <div className="fullName-container">
                  <TextField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    size="small"
                    value={formik.values.fullName}
                    {...formik.getFieldProps("fullName")}
                  />

                  <div>
                    {formik.touched.fullName && formik.errors.fullName ? (
                      <Alert
                        sx={{ marginTop: ".5rem", padding: "0 10px" }}
                        severity="error"
                      >
                        {formik.errors.fullName}
                      </Alert>
                    ) : null}
                  </div>
                </div>
                <div className="email-container">
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                    value={formik.values.email}
                    {...formik.getFieldProps("email")}
                  />
                  <div>
                    {formik.touched.email && formik.errors.email ? (
                      <Alert
                        sx={{ marginTop: ".5rem", padding: "0 10px" }}
                        severity="error"
                      >
                        {formik.errors.email}
                      </Alert>
                    ) : null}
                  </div>
                </div>
                <div className="password-container">
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size="small"
                    value={formik.values.password}
                    {...formik.getFieldProps("password")}
                  />
                  <div>
                    {formik.touched.password && formik.errors.password ? (
                      <Alert
                        sx={{ marginTop: ".5rem", padding: "0 10px" }}
                        severity="error"
                      >
                        {formik.errors.password}
                      </Alert>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="agree-to-terms">
                <div>
                  <Checkbox
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    style={{ paddingLeft: 0 }}
                  />
                </div>
                <div>I agree to the terms & privacy</div>
              </div>
              <div className="register-footer">
                <Button component={Link} to="/login">
                  Sign in instead
                </Button>
                <Button
                  className="register-button"
                  variant="contained"
                  disableElevation
                  disabled={agreedTerms === false}
                  type="submit"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>
          <Toastifier2 />
        </div>
      </ThemeProvider>
    </RegisterContext.Provider>
  );
};

export default Registration;
