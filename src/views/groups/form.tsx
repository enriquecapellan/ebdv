import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { DropdownInput, Input } from "../../components/input";
import { IGroup } from "../../types/models";
import { useApp } from "../../hooks/useApp/useApp";

import { AGENTS, CALLINGS } from "./constants";

export function GroupFrom() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { state, actions } = useApp();

  const form = useForm<IGroup>();
  const { handleSubmit } = form;

  async function handleAddGroup(data: IGroup) {
    await actions.addGroup(data);
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
