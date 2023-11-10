import React, { useState, useContext } from "react";
import dayjs from "dayjs";

// CSS
import "./editTaskCard.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORT SERVICES
import { BASE_URL } from "../../services/helper";

// IMPORTED LOCAL CONTEXTS
import { TodoCardContext } from "../../components/contexts/TodoCardContext";
import { TodoAppContext } from "../contexts/TodoAppContext";

// MUI IMPORTS
import { Divider, TextField, ThemeProvider, createTheme } from "@mui/material";

// DATE PICKER
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// ICONS
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";

const EditTaskCard = ({ _id, title, description, dueDateTime }) => {
  // TODO-CARD EDIT BUTTON CONTEXT
  const {
    toggleEditTaskButton,
    setIsMouseEntered,
    setCardTitle,
    setCardDescription,
    setCardDueDateTime,
  } = useContext(TodoCardContext);

  const { setSnackbarOpen, setAlertMessage, setAlertSeverity } =
    useContext(TodoAppContext);

  // DUE-DATE STATE
  const [editedDueTime, setEditedDueTime] = React.useState(dueDateTime);

  // TITLE STATE
  const [thisTitle, setTitle] = useState(title);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  // DESCRIPOTION STATE
  const [thisDescription, setDescription] = useState(description);

  function handleDescription(e) {
    setDescription(e.target.value);
  }

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

  // SAVE CLICK HANDLER
  const handleSaveClick = () => {
    setIsMouseEntered(false);
    setCardTitle(thisTitle);
    setCardDescription(thisDescription);
    setCardDueDateTime(editedDueTime);
    toggleEditTaskButton();
    setAlertMessage("The task was saved successfully!");
    setAlertSeverity("success");
    setSnackbarOpen(true);
    axios
      .patch(BASE_URL + "/api/updatetodo", {
        _id,
        thisTitle,
        thisDescription,
        editedDueTime,
      })
      .then((res) => {})
      .catch((err) => {});
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
                value={thisTitle}
                onChange={handleTitle}
                required
              />
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                sx={{ marginTop: ".5rem" }}
                value={thisDescription}
                onChange={handleDescription}
              />
            </div>
          </CardContent>

          <Divider />

          <div className="card-bottom">
            <div className="card-bottom-left">
              <CardActions>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Due Date and Time"
                      slotProps={{ textField: { size: "small" } }}
                      value={dayjs(editedDueTime)}
                      onChange={(newVal) => setEditedDueTime(dayjs(newVal))}
                      sx={{ width: 2 / 6 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </CardActions>
            </div>

            <div className="card-bottom-right">
              <CardActions>
                <Button
                  size="small"
                  sx={{ fontWeight: 600, color: "#5762E3" }}
                  onClick={toggleEditTaskButton}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleSaveClick}
                  sx={{ fontWeight: 600 }}
                  disabled={thisTitle === ""}
                >
                  Save
                </Button>
              </CardActions>
            </div>
          </div>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default EditTaskCard;
