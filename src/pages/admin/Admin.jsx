import React from "react";

import Sidebar from "./global/Sidebar";
import { Box, Typography } from "@mui/material/";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "hours", label: "Hours", minWidth: 100 },
  {
    id: "members",
    label: "Team Members",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "progress",
    label: "Progress",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, hours, members, progress) {
  return { name, hours, members, progress };
}

const rows = [
  createData("India", 34, 10, "63%"),
  createData("China", 47, 14, "94%"),
  createData("Italy", 120, 8, "40%"),
  createData("United States", 34, 3, "20%"),
  createData("Canada", 22, 5, "70%"),
  createData("Australia", 54, 17, "92%"),
  createData("Germany", 19, 8, "34%"),
  createData("Ireland", 70, 23, "27%"),
  createData("Mexico", 63, 19, "50%"),
  createData("Japan", 20, 13, "77%"),
  createData("France", 79, 5, "40%"),
  createData("United King", 17, 7, "24%"),
  createData("Russia", 23, 15, "17%"),
  createData("Nigeria", 24, 3, "11%"),
  createData("Brazil", 11, 4, "85%"),
];

const Admin = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h5">Active Projects</Typography>

          {/* Table  */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
