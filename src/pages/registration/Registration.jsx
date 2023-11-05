import React, { useEffect } from "react";

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
  Button,
  Checkbox,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
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

const Registration = () => {
  // SNACKBAR UTILITIES
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertSeverity, setAlertSeverity] = useState("success");

  // REGISTERED DATA STATES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If still logged in navigate to the app
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/today");
    }
  });

  // HANDLE REGISTER
  const handlRegister = () => {
    axios
      .post(BASE_URL + "/register", { fullName, email, password })
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
  };
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
            <div className="regiter-inputs">
              <TextField
                required
                id="outlined-required"
                label="Full Name"
                size="small"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="email-container">
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="email-rules">
                  You can use letters, numbers & periods
                </div>
              </div>
              <div className="password-container">
                <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="password-rules">
                  Use 8 or more characters with a mix of letter, numbers &
                  symbols
                </div>
              </div>
            </div>
            <div className="agree-to-terms">
              <div>
                <Checkbox style={{ paddingLeft: 0 }} />
              </div>
              <div>I agree to the terms & privacy</div>
            </div>
            <div className="register-footer">
              <Link to="/login">
                <Button>Sign in instead</Button>
              </Link>
              <Button
                className="register-button"
                variant="contained"
                disableElevation
                onClick={handlRegister}
              >
                Create Account
              </Button>
              <Toastifier2 />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </RegisterContext.Provider>
  );
};

export default Registration;
