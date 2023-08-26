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
    <>
      <div className="sidebar">
        <ul className="sidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div>{val.icon}</div>
                <div>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* <div className="sidebar">
          <div className="brand-name">
            <Navbar.Brand to="/">Todo Hive</Navbar.Brand>
          </div>
          <div className="navigation-items">
            <div className="icon-text-container active">
              <img className="icon" src={Home} />
              <span>
                <Link to="/admin/home" className="navigation-texts">
                  Dashboard
                </Link>
              </span>
            </div>

            <div className="icon-text-container">
              <img className="icon" src={Users} />
              <span>
                <Link to="/admin/users" className="navigation-texts">
                  Users
                </Link>
              </span>
            </div>

            <div className="icon-text-container">
              <img className="icon" src={Tasks} />
              <span>
                <Link to="/admin/monitor-tasks" className="navigation-texts">
                  Monitor Tasks
                </Link>
              </span>
            </div>

            <div className="icon-text-container">
              <img className="icon" src={Analytics} />
              <span>
                <Link to="/admin/analytics" className="navigation-texts">
                  Analytics
                </Link>
              </span>
            </div>

            <div className="icon-text-container">
              <img className="icon" src={Feedback} />
              <span>
                <Link to="/admin/feedback" className="navigation-texts">
                  Users Feedback
                </Link>
              </span>
            </div>

            <div className="icon-text-container">
              <img className="icon" src={Information} />
              <span>
                <Link to="/admin/support" className="navigation-texts">
                  Help and Information
                </Link>
              </span>
            </div>

            <div className="icon-text-container">
              <img className="icon" src={Settings} />
              <span>
                <Link to="/admin/settings" className="navigation-texts">
                  Settings
                </Link>
              </span>
            </div>

            <div className="icon-text-container">
              <img className="icon" src={Logout} />
              <span>
                <Link to="/admin/logout" className="navigation-texts">
                  Logout
                </Link>
              </span>
            </div>
          </div>
        </div> */}
    </>
  );
};

export default Sidebar;
