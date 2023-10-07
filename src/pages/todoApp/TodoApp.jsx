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

// MUI IMPORTS
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

// ICONS
import TuneIcon from "@mui/icons-material/Tune";
import LayersIcon from "@mui/icons-material/Layers";
import SortIcon from "@mui/icons-material/Sort";

// GLOBAL VARIABLES
const drawerWidth = 240;

let date = new Date();
let curDate = date.getDate();
let mon = date.getMonth();
let weekDay = date.getDay();

function TodoApp() {
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
    <TodoAppContext.Provider value={toggleAddTaskButton}>
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
                      <span>
                        {" " + weekday[weekDay].substring(0, 3) + " "}
                      </span>
                      <span>{curDate}</span>
                      <span>{" " + month[mon].substring(0, 3) + " "}</span>
                    </span>
                  </h3>
                </div>

                <IconButton
                  onClick={handleClick}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <TuneIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <SortIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sorting" fontSize="small" />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <LayersIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Grouping" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Menu>
              </div>

              <Divider />

              <div className="todo-child-container">
                {!addTaskButtonIsOpen ? <AddTaskCard /> : <AddTaskButton />}
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </TodoAppContext.Provider>
  );
}
export default TodoApp;
