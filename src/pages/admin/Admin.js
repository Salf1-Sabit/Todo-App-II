import React from "react";
import "./Admin.css";

import Sidebar from "./global/Sidebar";
import { Box, Typography } from "@mui/material/";

const Admin = () => {
  return (
    <>
      <div className="admin-main">
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h4">Welcome to Dashboard</Typography>
        </Box>
      </div>
    </>
  );
};

export default Admin;
