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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
  Divider,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

// ICONS
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlagIcon from "@mui/icons-material/Flag";
import { month } from "../../data/currentDateData";

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

// PRIORITY COLORS
const priorityColors = [
  { r: 220, g: 47, b: 2 },
  { r: 244, g: 140, b: 6 },
  { r: 83, g: 144, b: 217 },
  { r: 125, g: 125, b: 125 },
];

const TodoCard = ({
  id,
  taskTitle,
  taskDescription,
  dueTime,
  dueDate,
  dueMonth,
  dueYear,
  dueDateTime,
}) => {
  // CARD STATES
  const [cardTitle, setCardTitle] = useState(taskTitle);
  const [cardDescription, setCardDescription] = useState(taskDescription);
  const [cardDueDateTime, setCardDueDateTime] = useState(dueDateTime);

  console.log(
    "FROM TODOCARD: " +
      cardTitle +
      " " +
      cardDescription +
      " " +
      cardDueDateTime
  );

  // DESTRUCTURE THE DATE NORMAL FORM
  const date2 = new Date(cardDueDateTime);
  const dueTime2 = date2.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // PROGRESS STATE
  const [value, setValue] = React.useState(0);

  // PRIORITY STATE
  const [priorityValue, setPriorityValue] = React.useState(4);

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

  // PRIORITY MODAL
  const [priorityOpen, setPriorityOpen] = React.useState(false);
  const handlePriorityOpen = () => setPriorityOpen(true);
  const handlePriorityClose = () => setPriorityOpen(false);

  // EditTaskButton State
  const [editTaskButtonIsOpen, setEditTaskButtonIsOpen] = useState(false);

  const toggleEditTaskButton = () => {
    if (editTaskButtonIsOpen) {
      setIsMouseEntered(false);
    }
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

  // MENU UTILITES
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <TodoCardContext.Provider
        value={{
          toggleEditTaskButton,
          setIsMouseEntered,
          setCardTitle,
          setCardDescription,
          setCardDueDateTime,
        }}
      >
        <ThemeProvider theme={theme}>
          {editTaskButtonIsOpen ? (
            <EditTaskCard
              id={id}
              taskTitle={cardTitle}
              taskDescription={cardDescription}
              dueTime={dueTime}
              dueDate={dueDate}
              dueMonth={dueMonth}
              dueYear={dueYear}
              dueDateTime={dueDateTime}
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
              onMouseEnter={() => setIsMouseEntered(true)}
              onMouseLeave={() => setIsMouseEntered(false)}
            >
              <CardContent>
                {/* CARD HEADER  */}
                <div className="card-header">
                  <FormControlLabel
                    control={<Checkbox color="success" />}
                    label={cardTitle}
                  />

                  {/* MOUSE ENTERED ACTIONS  */}
                  {isMouseEntered && (
                    <div className="header-right">
                      <Tooltip title="Edit task">
                        <IconButton
                          sx={{ "&:hover": { color: "#5762e3" } }}
                          onClick={toggleEditTaskButton}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete task">
                        <IconButton
                          sx={{ "&:hover": { color: "#5762e3" } }}
                          onClick={deleteTodos}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="More task actions">
                        <IconButton
                          aria-controls={menuOpen ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={menuOpen ? "true" : undefined}
                          onClick={handleMenuClick}
                          sx={{ "&:hover": { color: "#5762e3" } }}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleMenuClose}>Priority</MenuItem>
                        <MenuItem>
                          <Tooltip title="Priority 1">
                            <FlagIcon sx={{ color: "#dc2f02" }} />
                          </Tooltip>
                          <Tooltip title="Priority 2">
                            <FlagIcon sx={{ color: "#f48c06" }} />
                          </Tooltip>
                          <Tooltip title="Priority 3">
                            <FlagIcon sx={{ color: "#5390d9" }} />
                          </Tooltip>
                          <Tooltip title="Priority 4">
                            <FlagIcon sx={{ color: "#ced4da" }} />
                          </Tooltip>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleMenuClose}>
                          <typography>Delete</typography>
                        </MenuItem>
                      </Menu>
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
                  {cardDescription}
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
                        dueTime2 +
                        " " +
                        date2.getDate() +
                        " " +
                        month[date2.getMonth()].substring(0, 3) +
                        " " +
                        date2.getFullYear()
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

                  {/* PRIORITY  */}
                  <Chip
                    onClick={handlePriorityOpen}
                    label={`Priority ${priorityValue}`}
                    sx={{
                      color: `rgb(${priorityColors[priorityValue - 1].r}, ${
                        priorityColors[priorityValue - 1].g
                      }, ${priorityColors[priorityValue - 1].b})`,
                      border: `1px solid rgb(${
                        priorityColors[priorityValue - 1].r
                      }, ${priorityColors[priorityValue - 1].g}, ${
                        priorityColors[priorityValue - 1].b
                      })`,
                      backgroundColor: `rgba(${
                        priorityColors[priorityValue - 1].r
                      }, ${priorityColors[priorityValue - 1].g}, ${
                        priorityColors[priorityValue - 1].b
                      }, 0.1)`,
                    }}
                    aria-describedby={id}
                  />
                  <Modal
                    open={priorityOpen}
                    onClose={handlePriorityClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Priority
                      </Typography>
                      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Value
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={priorityValue}
                          label="Age"
                          onChange={(e) => setPriorityValue(e.target.value)}
                        >
                          <MenuItem value={1}>
                            <IconButton>
                              <FlagIcon sx={{ color: "#dc2f02" }} />
                            </IconButton>
                            1
                          </MenuItem>
                          <MenuItem value={2}>
                            <IconButton>
                              <FlagIcon sx={{ color: "#f48c06" }} />
                            </IconButton>
                            2
                          </MenuItem>
                          <MenuItem value={3}>
                            <IconButton>
                              <FlagIcon sx={{ color: "#5390d9" }} />
                            </IconButton>
                            3
                          </MenuItem>
                          <MenuItem value={4}>
                            <IconButton>
                              <FlagIcon sx={{ color: "#ced4da" }} />
                            </IconButton>
                            4
                          </MenuItem>
                        </Select>
                      </FormControl>
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
