import React from "react";

import Sidebar from "../global/Sidebar";
import { Box, Typography } from "@mui/material/";

const Settings = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h4">Welcome to Settings</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
