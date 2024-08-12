import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useApp } from "../../hooks/useApp/useApp";

export const GroupsTable = () => {
  const { state, actions } = useApp();

  useEffect(() => {
    actions.loadGroups();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Maestra</TableCell>
            <TableCell>Agente</TableCell>
            <TableCell>Llamado</TableCell>
            <TableCell>Ayudante</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.groups.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.leader}
              </TableCell>
              <TableCell>{row.agent}</TableCell>
              <TableCell>{row.calling}</TableCell>
              <TableCell>{row.assistant}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
