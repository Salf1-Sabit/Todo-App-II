import React from "react";

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

import "./Sidebar.css";
import { Feed, Task } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="brand-name">
          <Navbar.Brand to="/">Todo Hive</Navbar.Brand>
        </div>
        <div className="icon-text-container">
          <img className="icon" src={Home} />
          <span>
            <Link to="/admin/home">Dashboard</Link>
          </span>
        </div>

        <div className="icon-text-container">
          <img className="icon" src={Users} />
          <span>
            <Link to="/admin/users">Users</Link>
          </span>
        </div>

        <div className="icon-text-container">
          <img className="icon" src={Tasks} />
          <span>
            <Link to="/admin/monitor-tasks">Monitor Tasks</Link>
          </span>
        </div>

        <div className="icon-text-container">
          <img className="icon" src={Analytics} />
          <span>
            <Link to="/admin/analytics">Analytics</Link>
          </span>
        </div>

        <div className="icon-text-container">
          <img className="icon" src={Feedback} />
          <span>
            <Link to="/admin/feedback">Users Feedback</Link>
          </span>
        </div>

        <div className="icon-text-container">
          <img className="icon" src={Information} />
          <span>
            <Link to="/admin/support">Help and Information</Link>
          </span>
        </div>

        <div className="icon-text-container">
          <img className="icon" src={Settings} />
          <span>
            <Link to="/admin/settings">Settings</Link>
          </span>
        </div>

        <div className="icon-text-container">
          <img className="icon" src={Logout} />
          <span>
            <Link to="/admin/logout">Logout</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
