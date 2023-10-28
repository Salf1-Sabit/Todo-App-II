import React from "react";

// IMPORT CSS
import "./login.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORT IMAGES
import GoogleIcon from "../../assets/images/google.png";

// IMPORT LOCAL COMPONENTS
import BrandName from "../../components/brand-name/BrandName";

// MUI COMPONENTS
import {
  Button,
  Divider,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="register-bg">
        <div className="center-container">
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
                required
                id="outlined-required"
                label="Email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
            </div>
          </div>
          <div className="agree-to-terms">
            <div className="forgot-password">Forgot password?</div>
          </div>
          <div className="register-footer">
            <Button>Create account</Button>
            <Button
              className="register-button"
              variant="contained"
              disableElevation
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Registration;
