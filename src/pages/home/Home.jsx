import React from "react";

import { Link } from "react-router-dom";

// FONT
import "@fontsource/inter/"; // Specify weight

import {
  Toolbar,
  Button,
  createTheme,
  ThemeProvider,
  Paper,
  Avatar,
} from "@mui/material";

import "./home.css";
import Nav from "../../components/Nav/Nav";

import BarChartIcon from "@mui/icons-material/BarChart";
import TaskIcon from "@mui/icons-material/Task";
import GroupsIcon from "@mui/icons-material/Groups";

import HeroImage from "../../assets/images/hero-image.png";
import Person1 from "../../assets/images/person-2.jpg";
import Person2 from "../../assets/images/person-3.jpg";
import Person3 from "../../assets/images/person-4.jpg";
import Footer from "../../components/footer/Footer";

const Home = () => {
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="main-page" data-scroll-container>
          <Nav />
          <Toolbar />
          <div className="hero-section" data-scroll-section>
            <div className="hero-section-container">
              <div className="left-side">
                <div className="left-side-container">
                  <h2 className="main-heading big-heading-style">
                    Organize your work and life, finally.
                  </h2>

                  <p className="sub-heading-line-1 sub-heading-style">
                    Become focused, organized, and calm with Todo Hive. The
                    world’s #1 task manager and to-do list app.
                  </p>

                  <div className="button-social-proof-group">
                    <Button to="/register" component={Link} variant="contained">
                      Sign up for free
                    </Button>
                    <div className="social-proof-1 sub-heading-style">
                      <p>Over 5,000 people like you are using this product</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-side">
                <img
                  className="hero-section-img"
                  src={HeroImage}
                  alt="HeroSectionImage"
                />
              </div>
            </div>
          </div>

          <div className="features-section" data-scroll-section>
            <div className="upper-section">
              <div className="upper-section-text-container">
                <div className="feature-main-heading">
                  <h2 className="feature-main-heading-1 big-heading-style">
                    Organize it all withone simple app
                  </h2>
                </div>

                <p className="feature-sub-heading">
                  Stay organized with tasks, lists, reminders & calendar - all
                  in one app.
                </p>
              </div>
            </div>

            <div className="lower-section">
              <div className="card-container">
                <div className="cards">
                  <Paper elevation={3} sx={{ height: "100%", padding: "1em" }}>
                    <div className="card-headline">
                      <TaskIcon
                        className="feature-icon"
                        sx={{
                          width: "35px",
                          height: "35px",
                          color: "#5762E3",
                        }}
                      />
                      <h2 className="card-title">Task management</h2>
                    </div>
                    <p className="card-desc">
                      Easily add, edit, and delete tasks with a user-friendly
                      interface.
                    </p>
                  </Paper>
                </div>

                <div className="cards">
                  <Paper elevation={3} sx={{ height: "100%", padding: "1em" }}>
                    <div className="card-headline">
                      <GroupsIcon
                        className="feature-icon"
                        sx={{
                          width: "35px",
                          height: "35px",
                          color: "#5762E3",
                        }}
                      />
                      <h2 className="card-title">Collaboration</h2>
                    </div>
                    <p className="card-desc">
                      Share tasks and collaborate with others, ideal for team
                      projects and household chores.
                    </p>
                  </Paper>
                </div>

                <div className="cards">
                  <Paper elevation={3} sx={{ height: "100%", padding: "1em" }}>
                    <div className="card-headline">
                      <BarChartIcon
                        className="feature-icon"
                        sx={{
                          width: "35px",
                          height: "35px",
                          color: "#5762E3",
                        }}
                      />
                      <h2 className="card-title">Progress Tracking</h2>
                    </div>
                    <p className="card-desc">
                      Monitor task completion and track your productivity over
                      time.
                    </p>
                  </Paper>
                </div>
              </div>
            </div>
          </div>

          <div className="social-proof-section" data-scroll-section>
            <div className="upper-proof">
              <h2 className="big-heading-style">What do our clients say?</h2>
              <div className="card-container">
                <Paper
                  elevation={3}
                  sx={{ padding: "1rem" }}
                  className="social-proof-card"
                >
                  <div className="person-header">
                    <Avatar
                      alt="Remy Sharp"
                      src={Person1}
                      sx={{ width: 56, height: 56 }}
                    />
                    <p className="social-proof-person-name">Kylie M</p>
                  </div>
                  <p>
                    I've already recommended this app to so many people! TODO
                    HIVE has changed the way I work.
                  </p>
                </Paper>
                <Paper
                  elevation={3}
                  sx={{ padding: "1rem" }}
                  className="social-proof-card"
                >
                  <div className="person-header">
                    <Avatar
                      alt="Remy Sharp"
                      src={Person2}
                      sx={{ width: 56, height: 56 }}
                    />
                    <p className="social-proof-person-name">Nathan W.</p>
                  </div>
                  <p>
                    No other platform could give my team the kind of tool that's
                    fun and simple to use yet still allows full customization
                    for our unique workflows.
                  </p>
                </Paper>
                <Paper
                  elevation={3}
                  sx={{ padding: "1rem" }}
                  className="social-proof-card"
                >
                  <div className="person-header">
                    <Avatar
                      alt="Remy Sharp"
                      src={Person3}
                      sx={{ width: 56, height: 56 }}
                    />
                    <p className="social-proof-person-name">Dylan R</p>
                  </div>
                  <p>
                    I literally tried every product out there and the simplicity
                    of TODO HIVE was just 100X more powerful than any other
                    complex platform that my team doesn't really need!
                  </p>
                </Paper>
              </div>
            </div>

            <div className="lower-call-to-action">
              <h4 className="sub-heading-style">Switching to TODO HIVE?</h4>
              <h2 className="big-heading-style">
                Organize anything with anyone, anywhere.
              </h2>
              <Button to="/register" component={Link} variant="contained">
                Get Started
              </Button>
            </div>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Home;
