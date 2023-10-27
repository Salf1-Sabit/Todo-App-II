import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// CSS
import "./todoCard.css";

// IMPORTED LOCAL COMPONENTS
import EditTaskCard from "../edit-task-card/EditTaskCard";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";
import { TodoCardContext } from "../../components/contexts/TodoCardContext";

// MUI ITEMS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  createTheme,
  Snackbar,
  Alert,
  Stack,
  Chip,
  ThemeProvider,
  Slider,
  Grid,
  Input,
} from "@mui/material";

// ICONS
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// MODAL STYLE
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TodoCard = ({
  id,
  taskTitle,
  taskDescription,
  dueTime,
  dueDate,
  dueMonth,
  dueYear,
}) => {
  console.log("FROM TODOCARD: " + dueTime + " " + dueDate + " " + dueMonth);
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  // PROGRESS MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // EditTaskButton State
  const [editTaskButtonIsOpen, setEditTaskButtonIsOpen] = useState(false);

  const toggleEditTaskButton = () => {
    setEditTaskButtonIsOpen(!editTaskButtonIsOpen);
  };

  // ADD BUTTON CONTEXT
  const { allTodos, setAllTodos } = useContext(TodoAppContext);

  // Snackbar Toggle
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  // DELETE TODOS ACTION
  const deleteTodos = () => {
    setSnackbarOpen(true);
    console.log(snackbarOpen);
    const newAllTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(newAllTodos);
  };

  // CARD MOUSE ENTERED EVENT HANDLER
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const toggleMouseEnter = () => {
    setIsMouseEntered((prevState) => !prevState);
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

  // DATE | TIME CHIP HANDLER
  const handleDateClick = () => {
    console.info("You clicked the Date Chip.");
  };

  return (
    <div>
      <TodoCardContext.Provider value={toggleEditTaskButton}>
        <ThemeProvider theme={theme}>
          {editTaskButtonIsOpen ? (
            <EditTaskCard
              taskTitle={taskTitle}
              taskDescription={taskDescription}
            />
          ) : (
            <Card
              sx={{
                borderRadius: 0,
                boxShadow: 0,
                borderBottom: "1px solid #eeeeee",
                maxWidth: "100%",
                backgroundColor: `${isMouseEntered && "#fafafa"} `,
              }}
              onMouseEnter={toggleMouseEnter}
              onMouseLeave={toggleMouseEnter}
            >
              <CardContent>
                {/* CARD HEADER  */}
                <div className="card-header">
                  <FormControlLabel
                    control={<Checkbox color="success" />}
                    label={taskTitle}
                  />

                  {isMouseEntered && (
                    <div className="header-right">
                      <IconButton
                        sx={{ "&:hover": { color: "#5762e3" } }}
                        onClick={toggleEditTaskButton}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        sx={{ "&:hover": { color: "#5762e3" } }}
                        onClick={deleteTodos}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <IconButton sx={{ "&:hover": { color: "#5762e3" } }}>
                        <MoreHorizIcon />
                      </IconButton>
                    </div>
                  )}
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                  >
                    <Alert
                      onClose={handleSnackbarClose}
                      severity="warning"
                      sx={{ width: "100%" }}
                      variant="filled"
                    >
                      Your task is successfully deleted!
                    </Alert>
                  </Snackbar>
                </div>

                {/* CARD DESCRIPTION  */}
                <Typography
                  sx={{ paddingBottom: ".5rem" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {taskDescription}
                </Typography>

                {/* CARD DATE | TIME CHIP  */}
                <Stack
                  sx={{ alignItems: "center" }}
                  direction="row"
                  spacing={1}
                >
                  {dueYear !== 1970 && (
                    <Chip
                      variant="outlined"
                      label={
                        dueTime + " " + dueDate + " " + dueMonth + " " + dueYear
                      }
                      color="secondary"
                      onClick={handleDateClick}
                    />
                  )}
                  {/* CARD PROGRESS BAR  */}
                  <Chip
                    onClick={handleOpen}
                    variant="outlined"
                    label={`Progress: ${value}%`}
                    color="success"
                    aria-describedby={id}
                  />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Progress: {value}%
                      </Typography>
                      <Box sx={{ width: 250 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs>
                            <Slider
                              value={typeof value === "number" ? value : 0}
                              onChange={handleSliderChange}
                              aria-labelledby="input-slider"
                            />
                          </Grid>
                          <Grid item>
                            <Input
                              value={value}
                              size="small"
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: "number",
                                "aria-labelledby": "input-slider",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Modal>
                </Stack>
              </CardContent>
            </Card>
          )}
        </ThemeProvider>
      </TodoCardContext.Provider>
    </div>
  );
};

export default TodoCard;
