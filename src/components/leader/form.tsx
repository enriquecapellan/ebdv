import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { MuiFileInput } from "mui-file-input";

import { DropdownInput, Input } from "../input";
import { ILeader } from "../../types/models";
import { useApp } from "../../hooks/useApp/useApp";

import { AGENTS, CALLINGS } from "../../constants";

export function LeaderFrom() {
  const [leaderPhoto, setLeaderPhoto] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { state, actions } = useApp();

  const form = useForm<ILeader>();
  const { handleSubmit } = form;

  async function handleAddGroup(data: ILeader) {
    if (!leaderPhoto) return;
    await actions.addLeader(data, leaderPhoto);
    handleClose();
  }

  return (
    <Wrapper>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        Agregar Líder
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(handleAddGroup),
        }}
      >
        <DialogTitle>Agregar Grupo</DialogTitle>
        <DialogContent>
          <Input id="name" label="Nombre del líder" form={form} />
          <DropdownInput
            id="agent"
            label="Agente"
            form={form}
            options={AGENTS}
          />
          <DropdownInput
            id="calling"
            label="Llamado"
            form={form}
            options={CALLINGS}
          />
          <MuiFileInput
            required
            value={leaderPhoto}
            onChange={setLeaderPhoto}
            style={{ marginTop: "2rem" }}
            label="Foto Maestra"
            inputProps={{ accept: ".png, .jpeg, .jpg" }}
            clearIconButtonProps={{
              title: "Remove",
              children: <CloseIcon fontSize="small" />,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button disabled={state.isGroupsLoading} type="submit">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;
