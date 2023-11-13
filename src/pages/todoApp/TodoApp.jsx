import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// FONT
import "@fontsource/inter/"; // Specify weight

// CSS FILE
import "./todoApp.css";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";

// IMPORT SERVICES
import { BASE_URL } from "../../services/helper";

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
  CircularProgress,
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
import axios from "axios";
import Toastifier from "../../components/toastifier/Toastifier";

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
  // PAGE LOADING STATE
  const [pageLoading, setPageLoading] = useState(true); // Add loading state

  // HANDLE PAGE TITLE
  const [pageTitle, setPageTitle] = useState("Incomplete");

  // EMPTY PAGE CARD STATE
  const [emptyPageTitle, setEmptyPageTitle] = useState("Congratulations");
  const [emptyPageDescription, setEmptyPageDescription] = useState(
    "Empty to-do list, full potential. Use this moment to dream,   plan, and set new goals. The journey of a thousand tasks   begins with this first step — be ready for tomorrow's adventures!"
  );
  const [emptyPageCardSeverity, setEmptyPageCardSeverity] = useState("success");

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

  // If not logged in navigate to the home page
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/");
    } else if (localStorage.getItem("email") === "admin@gmail.com") {
      navigate("/admin");
    } else {
      let counter = localStorage.getItem("loginCounter");
      // Step 2: Convert the value to a number (if needed)
      counter = parseInt(counter, 10) || 0;
      if (counter) {
        counter = Number(counter + 1);
        localStorage.setItem("loginCounter", counter);
      } else {
        localStorage.setItem("loginCounter", 1);
        setAlertMessage("Welcome, " + localStorage.getItem("fullName"));
        setAlertSeverity("success");
        setSnackbarOpen(true);
      }
    }
  }, [navigate]);

  const email = localStorage.getItem("email");
  // LOADING ALL TODOS
  useEffect(() => {
    const loadAllTodos = async () => {
      await axios
        .get(BASE_URL + "/api/gettodo", {
          params: {
            email: email,
          },
        })
        .then((res) => {
          setAllTodos(res.data.allTodos);
        })
        .catch((err) => {});
      setPageLoading(false);
    };
    loadAllTodos();
  }, [email]);

  return (
    <TodoAppContext.Provider
      value={{
        setPageTitle,
        toggleAddTaskButton,
        allTodos,
        setAllTodos,
        snackbarOpen,
        setSnackbarOpen,
        alertMessage,
        setAlertMessage,
        alertSeverity,
        setAlertSeverity,
        setEmptyPageTitle,
        setEmptyPageDescription,
        setEmptyPageCardSeverity,
      }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Appbar />

          {pageLoading ? (
            <CircularProgress
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : (
            <>
              {/* Main Background  */}
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

                {/* INCOMPLETED TODOS  */}
                <div className="todo-parent-container">
                  <div style={{ marginBottom: "1rem" }}>
                    {!addTaskButtonIsOpen ? (
                      <AddTaskCard taskTitle={""} taskDescription={""} />
                    ) : (
                      <Divider>
                        <AddTaskButton />
                      </Divider>
                    )}
                  </div>

                  <div className="page-header">
                    <div className="page-heading">
                      <h3>
                        {pageTitle}
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
                        if (details.todoStatus === false) {
                          return (
                            <TodoCard
                              key={details._id}
                              _id={details._id}
                              title={details.title}
                              description={details.description}
                              dueDateTime={details.dueDateTime}
                              priority={details.priority}
                              progress={details.progress}
                              cardStatus={details.todoStatus}
                            />
                          );
                        }
                        return true;
                      })
                    ) : (
                      <Alert severity={emptyPageCardSeverity}>
                        <AlertTitle>{emptyPageTitle}</AlertTitle>
                        {emptyPageDescription}
                      </Alert>
                    )}
                  </div>
                </div>

                {/* COMPLETED TODOS  */}
                <div className="todo-parent-container">
                  <div className="page-header">
                    <div className="page-heading">
                      <h3>
                        {"Completed"}
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
                        if (details.todoStatus === true) {
                          return (
                            <TodoCard
                              key={details._id}
                              _id={details._id}
                              title={details.title}
                              description={details.description}
                              dueDateTime={details.dueDateTime}
                              priority={details.priority}
                              progress={details.progress}
                              cardStatus={details.todoStatus}
                            />
                          );
                        }
                        return true;
                      })
                    ) : (
                      <Alert severity="info">
                        <AlertTitle>{emptyPageTitle}</AlertTitle>
                        {
                          "Your todo list is empty, which means you've successfully tackled all your tasks. Enjoy the sense of accomplishment, and whenever you're ready for your next set of goals, feel free to add new tasks. Keep up the great work!"
                        }
                      </Alert>
                    )}
                  </div>
                </div>
              </Box>
              <Toastifier />
            </>
          )}
        </Box>
      </ThemeProvider>
    </TodoAppContext.Provider>
  );
}
export default TodoApp;
