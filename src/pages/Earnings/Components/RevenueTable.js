import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Context } from "../../../store/Context";
import { LinearProgress } from "@mui/material";

const RevenueTable = ({ revenue, loading }) => {
  const { state } = useContext(Context);
  const { darkMood } = state;
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: darkMood ? "#0a2647" : "#fff", minHeight: "60vh" }}
    >
      {loading && <LinearProgress />}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: darkMood ? "#1C315E" : "#E8EFEB" }}>
            <TableCell
              sx={{ color: darkMood ? "#FFF" : "#3b3841" }}
              align="left"
            >
              Month
            </TableCell>
            <TableCell
              sx={{ color: darkMood ? "#FFF" : "#3b3841" }}
              align="right"
            >
              Revenue
            </TableCell>
            <TableCell
              sx={{ color: darkMood ? "#FFF" : "#3b3841" }}
              align="right"
            >
              Shipping Cost
            </TableCell>
            <TableCell
              sx={{ color: darkMood ? "#FFF" : "#3b3841" }}
              align="right"
            >
              Employees Salary
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {revenue && revenue.length
            ? revenue.map((row) => (
                <TableRow
                  key={row.month}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      color: darkMood ? "#aeb4be" : "#3b3841",
                      "&.MuiTableCell-root": {
                        borderBottom: darkMood
                          ? "1px solid #205295"
                          : "1px solid #e5e5e5",
                      },
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.month}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMood ? "#aeb4be" : "#3b3841",
                      "&.MuiTableCell-root": {
                        borderBottom: darkMood
                          ? "1px solid #205295"
                          : "1px solid #e5e5e5",
                      },
                    }}
                    align="right"
                  >
                    Rs. {row?.revenue}.00
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMood ? "#aeb4be" : "#3b3841",
                      "&.MuiTableCell-root": {
                        borderBottom: darkMood
                          ? "1px solid #205295"
                          : "1px solid #e5e5e5",
                      },
                    }}
                    align="right"
                  >
                    Rs. 00.00
                  </TableCell>
                  <TableCell
                    sx={{
                      color: darkMood ? "#aeb4be" : "#3b3841",
                      "&.MuiTableCell-root": {
                        borderBottom: darkMood
                          ? "1px solid #205295"
                          : "1px solid #e5e5e5",
                      },
                    }}
                    align="right"
                  >
                    Rs. 00.00
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RevenueTable;
