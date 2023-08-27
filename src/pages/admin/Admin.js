import React from "react";
import "./Admin.css";

import Sidebar from "./global/Sidebar";
import { Router, Route, Routes } from "react-router-dom";

import Dashboard from "../admin/right-side/Dashboard";

const Admin = () => {
  return (
    <>
      <div className="admin-main">
        <Sidebar />
        <div className="content"></div>
      </div>
    </>
  );
};

export default Admin;
