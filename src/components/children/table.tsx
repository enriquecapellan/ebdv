import { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import TrashIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useApp } from "../../hooks/useApp/useApp";
import { Box, IconButton } from "@mui/material";
import { deleteChild } from "../../services/db/children";
import { Confirm } from "../confirm";

export const ChildrenTable = () => {
  const [deleteChildId, setDeleteChildId] = useState("");
  const { state, actions } = useApp();
  const { children, filters } = state;
  const { groupId } = useParams<{ groupId: string }>();

  const data = useMemo(() => {
    return children.filter(
      (child) =>
        (!filters.agent || child.group.agent === filters.agent) &&
        (!filters.calling || child.group.calling === filters.calling)
    );
  }, [children, filters]);

  function handleDelete(id: string) {
    deleteChild(id);
    setDeleteChildId("");
    actions.loadChildren(groupId);
  }

  useEffect(() => {
    actions.loadChildren(groupId);
  }, []);

  return (
    <>
      <Confirm
        question="¿Estás seguro de eliminar este niño?"
        open={!!deleteChildId}
        onClose={() => setDeleteChildId("")}
        onAccept={() => handleDelete(deleteChildId)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Agente</TableCell>
              <TableCell>Maestra</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
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
                <TableCell>
                  <Box display="flex">
                    <IconButton
                      size="small"
                      onClick={() => actions.setActiveChild(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteChildId(row.id || "")}
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
