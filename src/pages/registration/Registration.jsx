import React from "react";

// IMPORT CSS
import "./registration.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORT LOCAL COMPONENTS
import BrandName from "../../components/brand-name/BrandName";

// MUI COMPONENTS
import {
  Button,
  Checkbox,
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
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
                Use 8 or more characters with a mix of letter, numbers & symbols
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
            <Button>Sign in instead</Button>
            <Button
              className="register-button"
              variant="contained"
              disableElevation
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Registration;
