import { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import TrashIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useApp } from "../../hooks/useApp/useApp";
import { Box, IconButton } from "@mui/material";
import { deleteLeader } from "../../services/db/leaders";
import { Confirm } from "../confirm";

export const LeadersTable = () => {
  const [deleteLeaderId, setDeleteLeaderId] = useState("");

  const { state, actions } = useApp();
  const { leaders, filters } = state;

  function handleDelete(id: string) {
    deleteLeader(id);
    setDeleteLeaderId("");
    actions.loadLeaders();
  }

  const data = useMemo(() => {
    return leaders.filter(
      (leader) => !filters.agent || leader.agent === filters.agent
    );
  }, [leaders, filters]);

  useEffect(() => {
    actions.loadLeaders();
  }, []);

  return (
    <>
      <Confirm
        question="¿Estás seguro de eliminar este líder?"
        open={!!deleteLeaderId}
        onClose={() => setDeleteLeaderId("")}
        onAccept={() => handleDelete(deleteLeaderId)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Agente</TableCell>
              <TableCell></TableCell>
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
                <TableCell>
                  <Box display="flex" justifyContent="space-between">
                    <IconButton
                      size="small"
                      onClick={() => actions.setActiveLeader(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteLeaderId(row.id || "")}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
