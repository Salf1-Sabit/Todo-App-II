import React from "react";

import "./Sidebar.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import Analytics from "../../../assets/Analytics.png";
import Feedback from "../../../assets/Feedback.png";
import Home from "../../../assets/Home.png";
import Information from "../../../assets/Information.png";
import Logout from "../../../assets/Logout.png";
import Settings from "../../../assets/Settings.png";
import Tasks from "../../../assets/Tasks.png";
import Users from "../../../assets/Users.png";

import SidebarData from "../../../Data/SidebarData";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <div
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
