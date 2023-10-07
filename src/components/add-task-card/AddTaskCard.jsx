import React, { useState, useContext } from "react";

// CSS
import "./addTaskCard.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";

// MUI IMPORTS
import {
  Alert,
  Divider,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";

// DATE PICKER
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// TIME PICKER
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

// ICONS
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const AddTaskCard = () => {
  //ADD BUTTON CONTEXT
  const toggleAddTaskButton = useContext(TodoAppContext);

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

  // Snackbar Toggle
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSaveClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            border: 1,
            borderColor: "grey.300",
            maxWidth: "100%",
            marginTop: "1rem",
            boxShadow: 0,
          }}
        >
          <CardContent>
            <div className="todo-item-header">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              ></div>
              <TextField
                id="standard-basic"
                label="Title"
                maxRows={4}
                multiline
                variant="standard"
              />
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                sx={{ marginTop: ".5rem" }}
              />
            </div>
          </CardContent>

          <Divider />

          <div className="card-bottom">
            <div className="card-bottom-left">
              <CardActions>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Due date"
                    sx={{ width: 2 / 6 }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                  <MobileTimePicker
                    label="Time"
                    sx={{ width: 2 / 6 }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </CardActions>
            </div>

            <div className="card-bottom-right">
              <CardActions>
                <Button
                  size="small"
                  sx={{ fontWeight: 600, color: "#5762E3" }}
                  onClick={toggleAddTaskButton}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleSaveClick}
                  sx={{ fontWeight: 600 }}
                >
                  Add task
                </Button>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleSnackbarClose}
                >
                  <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: "100%" }}
                    variant="filled"
                  >
                    Your task is successfully added!
                  </Alert>
                </Snackbar>
              </CardActions>
            </div>
          </div>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default AddTaskCard;
