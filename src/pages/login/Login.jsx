import React, { useEffect } from "react";

// FORM VALIDATION
import { useFormik } from "formik";
import * as Yup from "yup";

// CROSS PLATFORM RESOURCE SHARING
import axios from "axios";

// IMPORT CSS
import "./login.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORT IMAGES
import GoogleIcon from "../../assets/images/google.png";

// IMPORT LOCAL COMPONENTS
import BrandName from "../../components/brand-name/BrandName";

// IMPORT SERVICES
import { BASE_URL } from "../../services/helper";

// MUI COMPONENTS
import {
  Alert,
  Button,
  Divider,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

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

let date = new Date();
let curTime = new Date(date.getTime());

const Registration = () => {
  const navigate = useNavigate();
  // FORMIK SCHEMA VALIDATION
  const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please provide your email address"),

      password: Yup.string()
        .required("Please enter your password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    }),
    onSubmit: (values) => {
      axios
        .post(BASE_URL + "/login", {
          email: formik.values.email,
          password: formik.values.password,
        })
        .then((res) => {
          if (res.data.email === "admin@gmail.com") {
            navigate("/admin");
          } else {
            navigate("/today");
          }
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("fullName", res.data.fullName);
          axios
            .patch(BASE_URL + "/api/updateuser", {
              email: formik.values.email,
              curTime,
            })
            .then((res) => {})
            .catch((err) => {});
        })
        .catch((err) => {
          navigate("/login");
        });
    },
  });

  const handleLogin = () => {};

  // If still logged in navigate to the app
  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/today");
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="register-bg">
        <div className="center-container">
          <form onSubmit={formik.handleSubmit}>
            <BrandName className="brand-name" />
            <div className="sub-headings">
              <div className="heading-1">Login to your account</div>
              <div className="heading-2">
                Enter your credentials to access your account
              </div>
            </div>
            <div className="login-with-google">
              <img
                style={{ width: "25px", height: "25px" }}
                src={GoogleIcon}
                alt="googleIcon"
              />
              <div className="login-with-google-text">Continue with google</div>
            </div>

            <Divider sx={{ marginBottom: "1rem" }}>OR</Divider>

            <div className="regiter-inputs">
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
              </div>
            </div>
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
            <div className="agree-to-terms">
              <div className="forgot-password">Forgot password?</div>
            </div>
            <div className="register-footer">
              <Link to="/register">
                <Button>Create account</Button>
              </Link>
              <Button
                className="register-button"
                variant="contained"
                onClick={handleLogin}
                disableElevation
                type="submit"
              >
                Sign In
              </Button>

              {/* <Toastifier2 /> */}
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Registration;
