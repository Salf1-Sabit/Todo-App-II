import React from "react";

import "./Sidebar.css";

import SidebarData from "../../../Data/SidebarData";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3
        className="brand-name"
        onClick={() => {
          window.location.pathname = "/";
        }}
      >
        TODO HIVE
      </h3>
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
