import React, { useContext } from "react";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";

// MUI IMPORTS
import { ThemeProvider, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddTaskButton = () => {
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          startIcon={<AddCircleIcon />}
          sx={{ fontWeight: 600, marginTop: ".5rem" }}
          onClick={toggleAddTaskButton}
        >
          Add task
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default AddTaskButton;
