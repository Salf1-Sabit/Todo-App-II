import * as React from "react";

import "./todoApp.css";

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
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Appbar from "../../components/appBar/Appbar";

import TuneIcon from "@mui/icons-material/Tune";
import Checkbox from "@mui/material/Checkbox";
import LayersIcon from "@mui/icons-material/Layers";
import SortIcon from "@mui/icons-material/Sort";

const drawerWidth = 240;

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

const date = new Date();
let mon = date.getMonth();
let day = date.getDay();

function TodoApp() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
                  <span>{" " + weekday[day].substring(0, 3) + " "}</span>
                  <span>{day}</span>
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
            <div className="todo-item">
              <div className="todo-item-header">
                <Checkbox size="small" color="success" />
                <div>Heading</div>
              </div>
              <div>hello</div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
export default TodoApp;
