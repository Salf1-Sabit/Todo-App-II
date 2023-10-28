import * as React from "react";

import "@fontsource/inter/"; // Specify weight
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import BrandName from "../brand-name/BrandName";

const drawerWidth = 240;
const navItems = ["today", "home", "pricing", "contact"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#9fa4ef",
        main: "#5763e3",
        dark: "#3545dc",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: "Inter",
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <BrandName />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              to={"/" + item}
              component={Link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={item}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            to={"/login"}
            component={Link}
            sx={{ textAlign: "center" }}
            variant="contained"
          >
            <ListItemText
              sx={{ color: "primary.main", textTransform: "capitalize" }}
              primary={"Sign up"}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ color: "#000", bgcolor: "#fff" }}>
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
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 900,
                fontSize: "2rem",
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              TODO HIVE<span style={{ color: "#5762e3" }}>.</span>
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  to={"/" + item}
                  component={Link}
                  key={item}
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 400,
                    fontSize: 18,
                    fontFamily: "Inter",
                    color: "#000",
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <Button
                to="/login"
                component={Link}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 400,
                  fontSize: 18,
                  fontFamily: "Inter",
                  color: "primary.main",
                }}
                variant="outlined"
              >
                Log In
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
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
        </nav>
      </Box>
    </ThemeProvider>
  );
}

export default DrawerAppBar;
