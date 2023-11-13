import React, { useEffect, useState } from "react";

import Sidebar from "../global/Sidebar";
import { Box, IconButton, Typography, createTheme } from "@mui/material/";
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
import CircularProgress from "@mui/material/CircularProgress";

// MUI ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// IMPORT FONT
import "@fontsource/inter/"; // Specify weight
import { ThemeProvider } from "@emotion/react";
import axios from "axios";

// PRIORTIY COLORS
const priorityColors = ["#D32F2F", "#ED6C02", "#0288D1", "#6E6E6E"];
const RGBA = [
  "rgba(211, 47, 47, .07)",
  "rgba(237, 108, 2, .07)",
  "rgba(2, 136, 209, .07)",
  "rgba(0, 0, 0, .07)",
];

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
              {allTask.length ? (
                <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#5762e3" }}>
                        <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>Deadline</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Progress</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Priority</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allTask.map((todo) => (
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
                          <TableCell>
                            {new Date(todo.dueDateTime).getHours() +
                              ":" +
                              new Date(todo.dueDateTime).getMinutes() +
                              " " +
                              new Date(todo.dueDateTime).getDate() +
                              " " +
                              month[new Date(todo.dueDateTime).getMonth()] +
                              " " +
                              new Date(todo.dueDateTime).getFullYear()}
                          </TableCell>
                          <TableCell>{todo.progress}</TableCell>
                          <TableCell
                          // sx={{
                          //   color: priorityColors[todo.priority - 1],
                          //   fontWeight: "700",
                          // }}
                          >
                            <div
                              style={{
                                color: priorityColors[todo.priority - 1],
                                fontWeight: "500",
                                width: "fit-content",
                                border: `1px solid ${
                                  priorityColors[todo.priority - 1]
                                }`,
                                padding: ".1rem .8rem",
                                borderRadius: "5px",
                                backgroundColor: RGBA[todo.priority - 1],
                              }}
                            >
                              {todo.priority}
                            </div>
                          </TableCell>
                          <TableCell>
                            {todo.todoStatus === true ? (
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
                                Complete
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
                                In Progress
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <EditIcon sx={{ color: "#3D9F92" }} />
                            </IconButton>

                            <IconButton>
                              <DeleteIcon sx={{ color: "#7E5DE3" }} />
                            </IconButton>
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
