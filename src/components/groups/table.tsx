import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TrashIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useApp } from "../../hooks/useApp/useApp";
import { deleteGroup } from "../../services/db/groups";
import { Box, IconButton } from "@mui/material";
import { Confirm } from "../confirm";

export const GroupsTable = () => {
  const [deleteGroupId, setDeleteGroupId] = useState("");

  const { state, actions } = useApp();
  const { groups, filters } = state;

  function handleDelete(id: string) {
    deleteGroup(id);
    setDeleteGroupId("");
    actions.loadGroups();
  }

  const data = useMemo(() => {
    return groups.filter(
      (group) =>
        (!filters.agent || group.agent === filters.agent) &&
        (!filters.calling || group.calling === filters.calling)
    );
  }, [groups, filters]);

  useEffect(() => {
    actions.loadGroups();
  }, []);

  return (
    <>
      <Confirm
        question="¿Estás seguro de eliminar este grupo?"
        open={!!deleteGroupId}
        onClose={() => setDeleteGroupId("")}
        onAccept={() => handleDelete(deleteGroupId)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Maestra</TableCell>
              <TableCell>Agente</TableCell>
              <TableCell>Llamado</TableCell>
              <TableCell>Ayudante</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/groups/${row.id}`}
                  >
                    {row.leader}
                  </Link>
                </TableCell>
                <TableCell>{row.agent}</TableCell>
                <TableCell>{row.calling}</TableCell>
                <TableCell>{row.assistant || "---"}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="space-between">
                    <IconButton
                      size="small"
                      onClick={() => actions.setActiveGroup(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteGroupId(row.id || "")}
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
