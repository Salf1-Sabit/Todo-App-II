import React from "react";

import "./about.css";

// IMPORT IMAGES
import SabitImage from "../../assets/images/Sabit.png";
import SirImage from "../../assets/images/Imtiaz-Sir.jpg";

// NAVBAR
import Nav from "../../components/Nav/Nav";

// IMPORT MUI COMPONENTS
import { Avatar, Toolbar } from "@mui/material";

// LOCAL COMPONENTS
import Footer from "../../components/footer/Footer";

const About = () => {
  return (
    <div>
      <Nav />
      <Toolbar />
      <div className="about-page-container">
        <div className="about-page-heading">Minds behind this project</div>
        <div className="about-top">
          <div className="about-card">
            <div className="about-img-container">
              <Avatar
                alt="Al Imtiaz"
                src={SirImage}
                sx={{ width: 200, height: 200 }}
              />
            </div>
            <div className="about-card-heading heading-top-margin">
              Al Imtiaz (Project Lead)
            </div>
            <div className="about-card-subheading ">
              Department Head of IT and CSE
            </div>

            <div className="about-card-subheading">
              University of Information Technology & Sciences
            </div>

            <div className="about-card-desc heading-top-margin">
              Al Imtiaz sir, our dedicated and visionary Project Lead, played a
              pivotal role in the development and success of our TODO app. With
              a wealth of experience and expertise, Al Imtiaz led the project
              with passion and precision. His strategic guidance, innovative
              thinking, and commitment to excellence were instrumental in
              shaping the app's features and ensuring a seamless user
              experience. Under his leadership, the TODO app became a testament
              to effective project management and creative problem-solving,
              making it a valuable tool for users in organizing and managing
              their tasks efficiently.
            </div>
          </div>
          <div className="about-card">
            <div className="about-img-container">
              <Avatar
                alt="Salfi Sabit"
                src={SabitImage}
                sx={{ width: 200, height: 200 }}
              />
            </div>
            <div className="about-card-heading heading-top-margin">
              Sheikh Shalfi Alam Sabit (Developer)
            </div>
            <div className="about-card-subheading ">
              Bachelor Sciences in Information Technology
            </div>
            <div className="about-card-subheading">
              University of Information Technology & Sciences
            </div>
            <div className="about-card-desc heading-top-margin">
              As the skilled developer behind this project, Sheikh Shalfi Alam
              Sabit brought the TODO app to life with ingenuity and technical
              prowess. With a keen eye for detail and a passion for coding,
              Sheikh Shalfi Alam Sabit played a key role in crafting the app's
              functionalities and ensuring a robust, user-friendly experience.
              His dedication to coding excellence and problem-solving skills
              shine through in every line of code, making the TODO app a
              testament to his expertise in the world of software development.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
