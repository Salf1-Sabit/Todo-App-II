import React, { useEffect, useState } from "react";

import Sidebar from "../global/Sidebar";
import { Box, CircularProgress, Typography, createTheme } from "@mui/material/";
import { useNavigate } from "react-router-dom";

// IMPORT BASE URL
import { BASE_URL } from "../../../services/helper";

// MUI IMPORT
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// IMPORT FONT
import "@fontsource/inter/"; // Specify weight
import { ThemeProvider } from "@emotion/react";
import axios from "axios";

const Admin = () => {
  // PAGE PROTECTION (ONLY ADMIN ACCESS)
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("email") !== "admin@gmail.com") {
      navigate("/");
    }
  });

  // FETCH ALL USERS
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    const loadAllUsers = async () => {
      axios
        .get(BASE_URL + "/api/getallusers")
        .then((res) => {
          setAllUser(res.data.allUser);
        })
        .catch((err) => {
          navigate("/login");
        });
    };
    loadAllUsers();
  });

  // MUI THEME
  const theme = createTheme({
    typography: {
      fontFamily: "Inter",
    },
    palette: {
      primary: {
        light: "#7780e8",
        main: "#5763e3",
        dark: "#3545dc",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
            <div
              className="registered-users-container"
              style={{
                padding: "2rem",
                border: "1px solid rgba(0, 0, 0, .1)",
                borderRadius: "5px",
              }}
            >
              {/* TITLE  */}
              <Typography variant="h6" fontWeight={700}>
                Registered Users
              </Typography>

              {/* TABLE  */}
              <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#5762e3" }}>
                      <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        Registration date
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>Last login</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Is admin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allUser.length ? (
                      allUser.map((user) => (
                        <TableRow
                          key={user._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {user.fullName}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.createdOn}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            {user.email === "admin@gmail.com" ? (
                              <div
                                style={{
                                  color: "#2E7D32",
                                  fontWeight: "500",
                                  width: "fit-content",
                                  border: "1px solid #2E7D32",
                                  padding: ".1rem .8rem",
                                  borderRadius: "5px",
                                  backgroundColor: "rgba(46, 125, 50, .07)",
                                }}
                              >
                                Yes
                              </div>
                            ) : (
                              <div
                                style={{
                                  color: "#D32F2F",
                                  fontWeight: "500",
                                  width: "fit-content",
                                  border: "1px solid #D32F2F",
                                  padding: ".1rem .8rem",
                                  borderRadius: "5px",
                                  backgroundColor: "rgba(211, 47, 47, .08)",
                                }}
                              >
                                No
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "1rem",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Admin;
