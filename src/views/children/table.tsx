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

export const ChildrenTable = () => {
  const { state, actions } = useApp();

  useEffect(() => {
    actions.loadChildren();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Agente</TableCell>
            <TableCell>Maestra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.children.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/children/${row.id}`}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.group.agent}</TableCell>
              <TableCell>{row.group.leader}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
