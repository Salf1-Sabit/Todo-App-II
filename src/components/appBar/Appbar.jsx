import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./appbar.css";
import { NavLink } from "react-router-dom";

// FONT
import "@fontsource/inter/"; // Specify weight

// MUI ITEMS
import {
  Drawer,
  Box,
  AppBar,
  Toolbar,
  Badge,
  Tooltip,
  createTheme,
  ThemeProvider,
  Chip,
} from "@mui/material";
import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// MUI ICONS
import ListItemIcon from "@mui/material/ListItemIcon";
import TodayIcon from "@mui/icons-material/Today";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu, { MenuPaper } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";

const drawerWidth = 240;
const Appbar2 = (props) => {
  // USER FULL NAME
  const fullName = localStorage.getItem("fullName");

  //ADD BUTTON CONTEXT
  const { toggleAddTaskButton } = useContext(TodoAppContext);

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
      secondary: {
        main: "#e35763",
      },
    },
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // HANDLE LOGOUT
  const navigate = useNavigate();
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("email");
    navigate("/");
  };

  const { window } = props;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        <NavLink className="nav-link" to="/today">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TodayIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={"Today"} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink className="nav-link" to="/upcoming">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <UpcomingIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Upcoming"} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink className="nav-link" to="/completed">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentTurnedInIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={"Completed"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <WorkspacesIcon sx={{ color: "#ff6f00" }} />
            </ListItemIcon>
            <ListItemText primary={"Personal"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GroupsIcon sx={{ color: "#9c27b0" }} />
            </ListItemIcon>
            <ListItemText primary={"Team"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "#5762E3",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <div>
            <Tooltip title="Add task">
              <IconButton
                onClick={toggleAddTaskButton}
                sx={{ marginLeft: 1, color: "#fff" }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Messages">
              <IconButton sx={{ marginLeft: 1, color: "#fff" }}>
                <Badge color="secondary" badgeContent={3}>
                  <MessageIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton sx={{ marginLeft: 1, color: "#fff" }}>
                <Badge color="secondary" badgeContent={17}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ marginLeft: 1, marginRight: 1, color: "#fff" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  // src={Person1}
                  sx={{ width: 32, height: 32 }}
                />
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
              <MenuItem sx={{ color: "primary.main" }}>{fullName}</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Appbar2;
