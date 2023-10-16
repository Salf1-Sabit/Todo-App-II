import React, { useState, useContext } from "react";

// CSS
import "./todoCard.css";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";
import CircularProgressBar from "../circular-progress/CircularProgressBar";

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
} from "@mui/material";

// ICONS
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ThemeProvider } from "react-bootstrap";

const TodoCard = ({ id, taskTitle, taskDescription }) => {
  //ADD BUTTON CONTEXT
  const { allTodos, setAllTodos } = useContext(TodoAppContext);

  // SNACKBAR TOGGLE
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(true);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDeleteSnackbarOpen(false);
    console.log("delete todos: " + deleteSnackbarOpen);
  };

  // DELETE TODOS ACTION
  const deleteTodos = () => {
    setDeleteSnackbarOpen(true);
    console.log("delete todos: " + deleteSnackbarOpen);
    const newAllTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(newAllTodos);
  };

  // CARD MOUSE ENTERED EVENT HANDLER
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const toggleMouseEnter = () => {
    console.log("Mouse entered!");
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

  const handleTimeClick = () => {
    console.info("You clicked the Date Chip.");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
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
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={deleteTodos}>
                    <DeleteIcon />
                  </IconButton>

                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </div>
              )}
              <Snackbar
                open={deleteSnackbarOpen}
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
            <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
              <Chip
                variant="outlined"
                label="date"
                color="primary"
                onClick={handleDateClick}
              />
              <Chip
                variant="outlined"
                label="time"
                color="primary"
                onClick={handleTimeClick}
              />

              {/* CARD PROGRESS BAR  */}
              <CircularProgressBar progress={70} />
            </Stack>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default TodoCard;
