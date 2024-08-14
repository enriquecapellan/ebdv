import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import { useApp } from "../../hooks/useApp/useApp";

export const SpecialAgentsTable = () => {
  const { state, actions } = useApp();
  const { specialAgents } = state;

  useEffect(() => {
    actions.loadSpecialAgents();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cargo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specialAgents.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/special-agents/${row.id}`}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
