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
import { IGroup } from "../../types/models";
import { useApp } from "../../hooks/useApp/useApp";

import { AGENTS, CALLINGS } from "../../constants";

export function GroupFrom() {
  const [leaderPhoto, setLeaderPhoto] = useState<File | null>(null);
  const [assistantPhoto, setAssistantPhoto] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { state, actions } = useApp();
  
  const handleClose = () => {
    actions.setActiveGroup(null);
    setOpen(false);
  };

  const form = useForm<IGroup>();
  const { handleSubmit } = form;

  async function handleAddGroup(data: IGroup) {
    if (!leaderPhoto) return;
    await actions.addGroup(data, leaderPhoto, assistantPhoto);
    handleClose();
  }

  return (
    <Wrapper>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        Agregar Grupo
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
          <Input id="leader" label="Maestra" form={form} />
          <Input id="assistant" label="Ayudante" form={form} required={false} />
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
          <MuiFileInput
            value={assistantPhoto}
            onChange={setAssistantPhoto}
            style={{ marginTop: "2rem" }}
            label="Foto Ayudante"
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
