import React, { useEffect, useState } from "react";

import Sidebar from "../global/Sidebar";
import { Box, IconButton, Typography, createTheme } from "@mui/material/";
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
import CircularProgress from "@mui/material/CircularProgress";

// MUI ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
  const [allTask, setAllTask] = useState([]);
  useEffect(() => {
    const loadAllTasks = async () => {
      axios
        .get(BASE_URL + "/api/gettodo")
        .then((res) => {
          setAllTask(res.data.fullTodos);
        })
        .catch((err) => {});
    };
    loadAllTasks();
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
              className="tasks-table-container"
              style={{
                padding: "2rem",
                border: "1px solid rgba(0, 0, 0, .1)",
                borderRadius: "5px",
              }}
            >
              {/* TITLE  */}
              <Typography variant="h6" fontWeight={700}>
                Tasks List
              </Typography>

              {/* TABLE  */}
              <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#5762e3" }}>
                      <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Deadline</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Priority</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Progress</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allTask.length ? (
                      allTask.map((todo) => (
                        <TableRow
                          key={todo._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {todo.title}
                          </TableCell>
                          <TableCell>{todo.description}</TableCell>
                          <TableCell>{todo.dueDateTime}</TableCell>
                          <TableCell>{todo.priority}</TableCell>
                          <TableCell>{todo.progress}</TableCell>
                          <TableCell>
                            {todo.todoStatus === true ? (
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
                                Complete
                              </div>
                            ) : (
                              <div
                                style={{
                                  color: "#ED6C02",
                                  fontWeight: "500",
                                  width: "fit-content",
                                  border: "1px solid #ED6C02",
                                  padding: ".1rem .8rem",
                                  borderRadius: "5px",
                                  backgroundColor: "rgba(211, 47, 47, .08)",
                                }}
                              >
                                In Progress
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <EditIcon sx={{ color: "#2E7D32" }} />
                            </IconButton>

                            <IconButton>
                              <DeleteIcon sx={{ color: "#D32F2F" }} />
                            </IconButton>
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
