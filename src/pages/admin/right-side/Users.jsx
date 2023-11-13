import React, { useEffect, useState } from "react";

import Sidebar from "../global/Sidebar";
import { Box, CircularProgress, Typography, createTheme } from "@mui/material/";
import { useNavigate } from "react-router-dom";

// IMPORT BASE URL
import { BASE_URL } from "../../../services/helper";

// IMPORT DATA UTILITES
import { month } from "../../../data/currentDateData";

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

              {allUser.length ? (
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
                      {allUser.map((user) => (
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
                          <TableCell>
                            {new Date(user.createdOn).getHours() +
                              ":" +
                              new Date(user.createdOn).getMinutes() +
                              " " +
                              new Date(user.createdOn).getDate() +
                              " " +
                              month[new Date(user.createdOn).getMonth()] +
                              " " +
                              new Date(user.createdOn).getFullYear()}
                          </TableCell>
                          <TableCell>
                            {new Date(user.lastLogin).getHours() +
                              ":" +
                              new Date(user.lastLogin).getMinutes() +
                              " " +
                              new Date(user.lastLogin).getDate() +
                              " " +
                              month[new Date(user.lastLogin).getMonth()] +
                              " " +
                              new Date(user.lastLogin).getFullYear()}
                          </TableCell>
                          <TableCell>
                            {user.email === "admin@gmail.com" ? (
                              <div
                                style={{
                                  color: "#3D9F92",
                                  fontWeight: "500",
                                  width: "fit-content",
                                  border: "1px solid #3D9F92",
                                  padding: ".1rem .8rem",
                                  borderRadius: "5px",
                                  backgroundColor: "rgba(61, 159, 146, .07)",
                                }}
                              >
                                Yes
                              </div>
                            ) : (
                              <div
                                style={{
                                  color: "#7E5DE3",
                                  fontWeight: "500",
                                  width: "fit-content",
                                  border: "1px solid #7E5DE3",
                                  padding: ".1rem .8rem",
                                  borderRadius: "5px",
                                  backgroundColor: "rgba(126, 93, 227, .07)",
                                }}
                              >
                                No
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Admin;
