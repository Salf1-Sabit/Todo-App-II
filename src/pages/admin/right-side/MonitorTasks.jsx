import React, { useEffect } from "react";

import Sidebar from "../global/Sidebar";
import { Box, Typography } from "@mui/material/";
import { useNavigate } from "react-router-dom";

const MonitorTasks = () => {
  // PAGE PROTECTION (ONLY ADMIN ACCESS)
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("email") !== "admin@gmail.com") {
      navigate("/");
    }
  });

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h4">Welcome to Tasks Monitoring</Typography>
        </Box>
      </Box>
    </>
  );
};

export default MonitorTasks;
