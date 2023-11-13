import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORT LOCAL COMPONENTS
import Sidebar from "./global/Sidebar";

// MUI IMPORTS
import { Box, Typography, createTheme } from "@mui/material/";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

// IMPORT FONT
import "@fontsource/inter/"; // Specify weight

// IMPORT CSS
import "./Admin.css";
import { ThemeProvider } from "@emotion/react";

// IMPORT LOCAL DATA
import { month } from "../../data/currentDateData";
import { BASE_URL } from "../../services/helper";
import axios from "axios";

// DATE UTILITES
let date = new Date();
let curDate = date.getDate();
let mon = date.getMonth();
let curDate2 = curDate - 1;
let curDate3 = curDate - 2;
let curDate4 = curDate - 3;
let curDate5 = curDate - 4;
let curDate6 = curDate - 5;
let curDate7 = curDate - 6;

// LINE CHAR DATA
const uData = [2, 5, 3, 7, 9, 3, 7];
const pData = [4, 8, 10, 6, 3, 2, 9];

const Admin = () => {
  // ADMIN PAGE PROTECTION
  // If not logged in navigate to the home page
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("email") !== "admin@gmail.com") {
      navigate("/");
    }
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

  // USERS & TASKS COUNT STATES
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);
  const [totalTotalIncompletedTasks, setTotalTotalIncompletedTasks] =
    useState(0);

  const email = localStorage.getItem("email");
  // SETTING UNCOMPLETED TODOS
  useEffect(() => {
    const loadAllTodos = async () => {
      await axios
        .get(BASE_URL + "/api/gettodo", {
          params: {
            email: email,
          },
        })
        .then((res) => {
          setTotalUsers(res.data.allUsers.length);
          setTotalTasks(res.data.fullTodos.length);
          setTotalCompletedTasks(
            res.data.fullTodos.filter((todo) => todo.todoStatus === true).length
          );
          setTotalTotalIncompletedTasks(
            res.data.fullTodos.filter((todo) => todo.todoStatus === false)
              .length
          );
        })
        .catch((err) => {});
    };
    loadAllTodos();
  }, [email]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginTop: "55px",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Welcome, Admin
            </Typography>

            {/* TOP -> SMALL CARDS  */}
            <div className="small-cards-container">
              <div className="small-card">
                <div className="small-text">Total Users</div>
                <div className="big-text">{totalUsers}</div>
              </div>
              <div className="small-card">
                <div className="small-text">Total Tasks</div>
                <div className="big-text">{totalTasks}</div>
              </div>
              <div className="small-card">
                <div className="small-text">Completed Tasks</div>
                <div className="big-text">{totalCompletedTasks}</div>
              </div>
              <div className="small-card">
                <div className="small-text">Incompleted Tasks</div>
                <div className="big-text">{totalTotalIncompletedTasks}</div>
              </div>
            </div>

            {/* BOTTOM -> USERS TABLE & PIE CHART  */}
            <div className="bottom-table-charts">
              {/* BAR CONTAINER  */}
              <div className="bar-container">
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: [
                        curDate7 + " " + month[mon].substring(0, 3),
                        curDate6 + " " + month[mon].substring(0, 3),
                        curDate5 + " " + month[mon].substring(0, 3),
                        curDate4 + " " + month[mon].substring(0, 3),
                        curDate3 + " " + month[mon].substring(0, 3),
                        curDate2 + " " + month[mon].substring(0, 3),
                        curDate + " " + month[mon].substring(0, 3),
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: [4, 8, 10, 6, 3, 2, 9],
                      color: "#3d5d9f",
                      label: "Registration",
                    },
                    {
                      data: [2, 5, 3, 7, 9, 3, 7],
                      color: "#7E5DE3",
                      label: "Login",
                    },
                    {
                      data: [7, 11, 4, 5, 7, 6, 10],
                      color: "#57e3d1",
                      label: "Task created",
                    },
                    {
                      data: [6, 9, 3, 7, 12, 4, 6],
                      color: "#3d9f92",
                      label: "Task completed",
                    },
                  ]}
                  width={1220}
                  height={600}
                />
              </div>

              {/* PIE & LINE CONTAINER  */}
              <div className="pie-line-container">
                {/* PIE CHART  */}
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: totalTasks,
                          label: "Total Task",
                          color: "#3d5d9f",
                        },
                        {
                          id: 1,
                          value: totalCompletedTasks,
                          label: "Completed",
                          color: "#7e5de3",
                        },
                        {
                          id: 2,
                          value: totalTotalIncompletedTasks,
                          label: "Incompleted",
                          color: "#57e3d1",
                        },
                      ],
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  width={402}
                  height={220}
                  sx={{ padding: ".5rem", marginTop: "1rem" }}
                />

                {/* LINE CHART  */}
                <div className="line-chart-container">
                  <LineChart
                    width={400}
                    height={300}
                    series={[
                      { data: pData, label: "Registration", color: "#7e5de3" },
                      { data: uData, label: "Login", color: "#3d5d9f" },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: [
                          curDate7 + " " + month[mon].substring(0, 3),
                          curDate6 + " " + month[mon].substring(0, 3),
                          curDate5 + " " + month[mon].substring(0, 3),
                          curDate4 + " " + month[mon].substring(0, 3),
                          curDate3 + " " + month[mon].substring(0, 3),
                          curDate2 + " " + month[mon].substring(0, 3),
                          curDate + " " + month[mon].substring(0, 3),
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Admin;
