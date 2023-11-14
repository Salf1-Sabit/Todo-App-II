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
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ICONS
import axios from "axios";
import Toastifier from "../../components/toastifier/Toastifier";

// GLOBAL VARIABLES
const drawerWidth = 240;

function TodoApp() {
  // ACCORDION STATES
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // PAGE LOADING STATE
  const [pageLoading, setPageLoading] = useState(true); // Add loading state

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

  // DATE UTILITES
  const date = new Date();

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

                {/* ADD TODO BUTTON */}
                <div className="todo-parent-container">
                  <div>
                    {!addTaskButtonIsOpen ? (
                      <AddTaskCard taskTitle={""} taskDescription={""} />
                    ) : (
                      <Divider>
                        <AddTaskButton />
                      </Divider>
                    )}
                  </div>
                </div>

                <div className="todo-parent-container">
                  {/* UPCOMING TASKS  */}
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    sx={{ bgcolor: "#E5F6FD" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        sx={{
                          width: "33%",
                          flexShrink: 0,
                          color: "#014361",
                          fontWeight: "600",
                        }}
                      >
                        Upcoming Tasks
                      </Typography>
                      <Typography sx={{ color: "#014361" }}>
                        Click here to show all of your upcoming tasks
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="todo-child-container">
                        {allTodos.length ? (
                          allTodos.map((details) => {
                            if (
                              details.todoStatus === false &&
                              date <= new Date(details.dueDateTime)
                            ) {
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
                                  accordionNo={0}
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
                    </AccordionDetails>
                  </Accordion>

                  {/* OVERDUE TASKS  */}
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                    sx={{ bgcolor: "#FFF4E5" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography
                        sx={{
                          width: "33%",
                          flexShrink: 0,
                          color: "#663C00",
                          fontWeight: "600",
                        }}
                      >
                        Overdue Tasks
                      </Typography>
                      <Typography sx={{ color: "#663C00" }}>
                        Click here to show all of your overdue tasks
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className="todo-child-container">
                          {allTodos.length ? (
                            allTodos.map((details) => {
                              if (
                                new Date(details.dueDateTime) < date &&
                                details.todoStatus === false
                              ) {
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
                                    accordionNo={1}
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
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* COMPLETED TASKS  */}
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                    sx={{ bgcolor: "#EDF7ED" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography
                        sx={{
                          width: "33%",
                          flexShrink: 0,
                          color: "#1E4620",
                          fontWeight: "600",
                        }}
                      >
                        Completed Tasks
                      </Typography>
                      <Typography sx={{ color: "#1E4620" }}>
                        Click here to show all of your completed tasks
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                  accordionNo={2}
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
                    </AccordionDetails>
                  </Accordion>
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
