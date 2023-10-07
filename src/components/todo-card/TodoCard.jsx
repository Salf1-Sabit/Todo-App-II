import React, { useState, useContext } from "react";

// CSS
import "./todoCard.css";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";

// MUI ITEMS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  createTheme,
} from "@mui/material";

// ICONS
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ThemeProvider } from "react-bootstrap";

const TodoCard = ({ id, taskTitle, taskDescription }) => {
  //ADD BUTTON CONTEXT
  const { allTodos, setAllTodos } = useContext(TodoAppContext);

  const deleteTodos = () => {
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
                  <IconButton>
                    <DeleteIcon onClick={deleteTodos} />
                  </IconButton>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </div>
              )}
            </div>
            <Typography variant="body2" color="text.secondary">
              {taskDescription}
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default TodoCard;
