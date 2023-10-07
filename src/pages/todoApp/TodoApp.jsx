import * as React from "react";

import "./todoApp.css";

import {
  Alert,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  TextField,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Appbar from "../../components/appBar/Appbar";

import TuneIcon from "@mui/icons-material/Tune";
import LayersIcon from "@mui/icons-material/Layers";
import SortIcon from "@mui/icons-material/Sort";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useState } from "react";

import Snackbar from "@mui/material/Snackbar";

const drawerWidth = 240;

// CURRENT DATE
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = new Date();
let curDate = date.getDate();
let mon = date.getMonth();
let weekDay = date.getDay();

function TodoApp() {
  // Snackbar Toggle
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSaveClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
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
                    <span>{" " + weekday[weekDay].substring(0, 3) + " "}</span>
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
                      variant="standard"
                    />
                    <TextField
                      id="standard-basic"
                      label="Description"
                      variant="standard"
                    />
                  </div>
                </CardContent>

                <Divider />

                <div className="card-bottom">
                  <div className="card-bottom-left">
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </div>
                  <div className="card-bottom-right">
                    <CardActions>
                      <Button size="small" sx={{ color: "#5762E3" }}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={handleSaveClick}
                      >
                        Save
                      </Button>
                      <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                      >
                        <Alert
                          onClose={handleSnackbarClose}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          Your task is successfully added!
                        </Alert>
                      </Snackbar>
                    </CardActions>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default TodoApp;
