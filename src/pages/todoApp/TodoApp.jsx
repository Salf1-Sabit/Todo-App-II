import React, { useState } from "react";

// FONT
import "@fontsource/inter/"; // Specify weight

// CSS FILE
import "./todoApp.css";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";

// IMPORTED LOCAL COMPONENTS
import AddTaskButton from "../../components/add-task-button-group/AddTaskButton";
import { month, weekday } from "../../data/currentDateData";
import Appbar from "../../components/appBar/Appbar";
import AddTaskCard from "../../components/add-task-card/AddTaskCard";
import TodoCard from "../../components/todo-card/TodoCard";

// MUI IMPORTS
import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

// ICONS
import TuneIcon from "@mui/icons-material/Tune";

// GLOBAL VARIABLES
const drawerWidth = 240;

// DATE UTILITES
let date = new Date();
let curDate = date.getDate();
let mon = date.getMonth();
let weekDay = date.getDay();
const hour = date.getHours();
const minute = date.getMinutes();

function TodoApp() {
  // SNACKBAR UTILITIES
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // TodoCard container
  const [allTodos, setAllTodos] = useState([]);

  // AddTaskButton State
  const [addTaskButtonIsOpen, setAddTaskButtonIsOpen] = useState(true);

  const toggleAddTaskButton = () => {
    setAddTaskButtonIsOpen(!addTaskButtonIsOpen);
  };

  // MENU TOGGLE
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <TodoAppContext.Provider
      value={{
        toggleAddTaskButton,
        allTodos,
        setAllTodos,
        snackbarOpen,
        setSnackbarOpen,
        alertMessage,
        setAlertMessage,
        alertSeverity,
        setAlertSeverity,
      }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Appbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Toolbar />
            <div className="todo-parent-container">
              <div className="page-header">
                <div className="page-heading">
                  <h3>
                    Today
                    <span className="current-date">
                      <span>{" " + hour + ":"}</span>
                      <span>{minute}</span>
                      <span>
                        {" " + weekday[weekDay].substring(0, 3) + " "}
                      </span>
                      <span>{curDate}</span>
                      <span>{" " + month[mon].substring(0, 3) + " "}</span>
                    </span>
                  </h3>
                </div>

                <Tooltip title="View">
                  <IconButton
                    onClick={handleClick}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <TuneIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Sorting</MenuItem>
                  <MenuItem onClick={handleClose}>Grouping</MenuItem>
                </Menu>
              </div>

              <Divider />

              <div className="todo-child-container">
                {allTodos.length ? (
                  allTodos.map((details) => {
                    return (
                      <TodoCard
                        key={details.id}
                        id={details.id}
                        taskTitle={details.title}
                        taskDescription={details.description}
                        dueTime={details.dueTime}
                        dueDate={details.dueDate}
                        dueMonth={details.dueMonth}
                        dueYear={details.dueYear}
                        dueDateTime={details.dueDateTime}
                      />
                    );
                  })
                ) : (
                  <Alert severity="success">
                    <AlertTitle>Congratulations</AlertTitle>
                    Empty to-do list, full potential. Use this moment to dream,
                    plan, and set new goals. The journey of a thousand tasks
                    begins with this first step —{" "}
                    <strong>be ready for tomorrow's adventures!</strong>
                  </Alert>
                )}
                {!addTaskButtonIsOpen ? (
                  <AddTaskCard taskTitle={""} taskDescription={""} />
                ) : (
                  <AddTaskButton />
                )}
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </TodoAppContext.Provider>
  );
}
export default TodoApp;
