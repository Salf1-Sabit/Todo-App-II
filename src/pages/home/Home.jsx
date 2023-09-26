import React from "react";

import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "./Home.css";
import "../../locomotive-scroll.css";

import Nav from "../../components/Nav/Nav";
import PrimaryButton from "../../components/primary-button/PrimaryButton";
import HeroImage from "../../assets/images/hero-section-img.png";

import BarChartIcon from "@mui/icons-material/BarChart";
import TaskIcon from "@mui/icons-material/Task";
import GroupsIcon from "@mui/icons-material/Groups";

const Home = () => {
  return (
    <>
      <LocomotiveScrollProvider
        options={{
          smooth: true,
        }}
      >
        <div className="main-page" data-scroll-container>
          <div className="hero-section" data-scroll-section>
            <Nav />

            <div className="hero-section-container">
              <div className="left-side">
                <div className="left-side-container">
                  <div className="main-heading">
                    <h2 className="heading-line-1">Organize your</h2>
                    <h2 className="heading-line-2">work and life,</h2>
                    <h2 className="heading-line-3">finally.</h2>
                  </div>

                  <div className="sub-heading">
                    <p className="sub-heading-line-1">
                      Become focused, organized, and calm with Todo Hive.
                    </p>
                    <p className="sub-heading-line-2">
                      The world’s #1 task manager and to-do list app.
                    </p>
                  </div>

                  <div className="button-social-proof-group">
                    <PrimaryButton buttonName={"Start for free"} />
                    <div className="social-proof-1">
                      <p>Over 5,000 people like you </p>
                      <p>are using this product</p>
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
                  <h2 className="feature-main-heading-1">
                    Organize it all with
                  </h2>
                  <h2 className="feature-main-heading-2">one simple app</h2>
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
                  <div className="card-headline">
                    <TaskIcon
                      className="feature-icon"
                      sx={{ height: "4rem", width: "4rem", color: "#5762E3" }}
                    />
                    <h2 className="card-title">Task management</h2>
                  </div>
                  <p className="card-desc">
                    Easily add, edit, and delete tasks with a user-friendly
                    interface.
                  </p>
                </div>

                <div className="cards">
                  <div className="card-headline">
                    <GroupsIcon
                      className="feature-icon"
                      sx={{ height: "4rem", width: "4rem", color: "#5762E3" }}
                    />
                    <h2 className="card-title">Collaboration</h2>
                  </div>
                  <p className="card-desc">
                    Share tasks and collaborate with others, ideal for team
                    projects and household chores.
                  </p>
                </div>

                <div className="cards">
                  <div className="card-headline">
                    <BarChartIcon
                      className="feature-icon"
                      sx={{ height: "4rem", width: "4rem", color: "#5762E3" }}
                    />
                    <h2 className="card-title">Progress Tracking</h2>
                  </div>
                  <p className="card-desc">
                    Monitor task completion and track your productivity over
                    time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LocomotiveScrollProvider>
    </>
  );
};

export default Home;
