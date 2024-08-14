import { useEffect, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import { useApp } from "../../hooks/useApp/useApp";

export const LeadersTable = () => {
  const { state, actions } = useApp();
  const { leaders, filters } = state;

  const data = useMemo(() => {
    return leaders.filter(
      (leader) => !filters.agent || leader.agent === filters.agent
    );
  }, [leaders, filters]);

  useEffect(() => {
    actions.loadLeaders();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Agente</TableCell>
            <TableCell>Llamado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/leaders/${row.id}`}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{row.agent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
