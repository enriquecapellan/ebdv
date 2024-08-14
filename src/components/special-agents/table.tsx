import { useEffect, useState } from "react";
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
import { Confirm } from "../confirm";
import { deleteSpecialAgent } from "../../services/db/special-agents";

export const SpecialAgentsTable = () => {
  const [deleteAgentId, setDeleteAgentId] = useState("");

  const { state, actions } = useApp();
  const { specialAgents } = state;

  function handleDelete(id: string) {
    deleteSpecialAgent(id);
    setDeleteAgentId("");
    actions.loadSpecialAgents();
  }

  useEffect(() => {
    actions.loadSpecialAgents();
  }, []);

  return (
    <>
      <Confirm
        question="¿Estás seguro de eliminar este agente especial?"
        open={!!deleteAgentId}
        onClose={() => setDeleteAgentId("")}
        onAccept={() => handleDelete(deleteAgentId)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell></TableCell>
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
                <TableCell>
                  <Box display="flex" justifyContent="space-between">
                    <IconButton
                      size="small"
                      onClick={() => actions.setActiveSpecialAgent(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteAgentId(row.id || "")}
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
