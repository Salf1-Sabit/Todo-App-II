import { React, useContext } from "react";

// MUI IMPORTS
import { Snackbar, Alert } from "@mui/material";

// IMPORTED LOCAL CONTEXTS
import { RegisterContext } from "../contexts/RegisterContext";

const Toastifier2 = () => {
  const { snackbarOpen, setSnackbarOpen, alertMessage, alertSeverity } =
    useContext(RegisterContext);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={alertSeverity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default Toastifier2;
