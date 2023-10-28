import React, { useState, useContext } from "react";

// CSS
import "./editTaskCard.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORTED LOCAL CONTEXTS
import { TodoCardContext } from "../../components/contexts/TodoCardContext";

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

const EditTaskCard = ({ taskTitle, taskDescription, dueDateTime }) => {
  // TODO-CARD EDIT BUTTON CONTEXT
  const {
    toggleEditTaskButton,
    setIsMouseEntered,
    setCardTitle,
    setCardDescription,
    setCardDueDateTime,
  } = useContext(TodoCardContext);

  // DUE-DATE STATE
  const [editedDueTime, setEditedDueTime] = React.useState(dueDateTime);

  // TITLE STATE
  const [title, setTitle] = useState(taskTitle);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  // DESCRIPOTION STATE
  const [description, setDescription] = useState(taskDescription);

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
    setCardTitle(title);
    setCardDescription(description);
    setCardDueDateTime(editedDueTime);
    toggleEditTaskButton();
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
                value={title}
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
                value={description}
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
                      value={editedDueTime}
                      onChange={(newValue) => setEditedDueTime(newValue)}
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
                  disabled={title === ""}
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
