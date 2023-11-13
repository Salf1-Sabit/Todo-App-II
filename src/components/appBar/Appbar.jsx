import React, { useContext, useState } from "react";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
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
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";
import BrandName from "../brand-name/BrandName";

// IMPORTED IMAGE COMPONENTS
import axios from "axios";
import { BASE_URL } from "../../services/helper";

const drawerWidth = 240;
const Appbar2 = (props) => {
  // USER FULL NAME
  const fullName = localStorage.getItem("fullName");

  //ADD BUTTON CONTEXT
  const {
    toggleAddTaskButton,
    setAllTodos,
    setPageTitle,
    setEmptyPageTitle,
    setEmptyPageDescription,
    setEmptyPageCardSeverity,
    setSnackbarOpen,
    setAlertMessage,
    setAlertSeverity,
  } = useContext(TodoAppContext);

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
    localStorage.removeItem("fullName");
    localStorage.removeItem("loginCounter");
    navigate("/");
  };

  // CHANGING CURRENT TODOS
  const changeInboxTodos = () => {
    setPageTitle("Today");
    setEmptyPageTitle("Congratulations");
    setEmptyPageDescription(
      "Empty to-do list, full potential. Use this moment to dream, plan, and set new goals. The journey of a thousand tasks begins with this first step — be ready for tomorrow's adventures!"
    );
    setEmptyPageCardSeverity("success");
    const email = localStorage.getItem("email");
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
    };
    loadAllTodos();
  };

  const { window } = props;

  const drawer = (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <BrandName />
      </div>

      <List>
        <NavLink className="nav-link" to="/today" onClick={changeInboxTodos}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TodayIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={"Inbox"} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        {/* <NavLink className="nav-link" onClick={changeUpcomingTodos}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <UpcomingIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Upcoming"} />
            </ListItemButton>
          </ListItem>
        </NavLink> */}

        {/* <NavLink className="nav-link" onClick={changeCompleteTodos}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentTurnedInIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={"Completed"} />
            </ListItemButton>
          </ListItem>
        </NavLink> */}
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

  // HANDLE QUOTE
  const [myQuote, setMyQuote] = useState("");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const handleQuoateOpen = () => {
    setQuoteOpen(true);
    axios
      .get("https://api.quotable.io/random")
      .then((res) => {
        console.log(res.data.content);
        setMyQuote(res.data.content);
      })
      .catch((err) => {});
  };
  const handleQuoateClose = () => setQuoteOpen(false);
  console.log("quoteOpen: ", quoteOpen);

  // HANDLE QUOATE COPY
  const handleCopyQuote = () => {
    navigator.clipboard.writeText(myQuote);
    setAlertMessage("Quote copied!");
    setAlertSeverity("success");
    setSnackbarOpen(true);
  };

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

            <Tooltip title="Quotes">
              <IconButton
                onClick={handleQuoateOpen}
                sx={{
                  border: "1px solid white",
                  marginLeft: 1,
                  color: "#fff",
                }}
                size="small"
              >
                <FormatQuoteIcon />
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

            {/* MOTIVATIONAL MODAL  */}
            <Dialog
              open={quoteOpen}
              onClose={handleQuoateClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                }}
                variant="h5"
              >
                {"Quote of the day"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  fontSize="18px"
                  sx={{ color: "black" }}
                >
                  {myQuote ? (
                    myQuote
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Tooltip title="Copy quote">
                    <IconButton onClick={handleCopyQuote}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share on twitter">
                    <IconButton>
                      <TwitterIcon sx={{ color: "#00acee" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share on facebook">
                    <IconButton>
                      <FacebookIcon sx={{ color: "#3b5998" }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Close the dialog">
                    <Button size="small" onClick={handleQuoateClose}>
                      CLOSE
                    </Button>
                  </Tooltip>
                  <Tooltip title="Show next quote">
                    <Button size="small" onClick={handleQuoateOpen} autoFocus>
                      NEXT
                    </Button>
                  </Tooltip>
                </div>
              </DialogActions>
            </Dialog>

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
