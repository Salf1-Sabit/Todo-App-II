import { React, useContext } from "react";

// MUI IMPORTS
import { Snackbar, Alert } from "@mui/material";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../contexts/TodoAppContext";

const Toastifier = () => {
  const { snackbarOpen, setSnackbarOpen, alertMessage, alertSeverity } =
    useContext(TodoAppContext);

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

export default Toastifier;
