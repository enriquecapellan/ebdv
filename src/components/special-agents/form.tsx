import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { MuiFileInput } from "mui-file-input";

import { Input } from "../input";
import { ISpecialAgent } from "../../types/models";
import { useApp } from "../../hooks/useApp/useApp";

export function SpecialAgentFrom() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { state, actions } = useApp();

  const handleClose = () => {
    actions.setActiveSpecialAgent(null);
    setOpen(false);
  };

  const form = useForm<ISpecialAgent>();
  const { handleSubmit } = form;

  async function addOrEditSpecialAgent(data: ISpecialAgent) {
    if (state.activeSpecialAgent) {
      await actions.editSpecialAgent(data, photo);
    } else {
      if (!photo) return;
      await actions.addSpecialAgent(data, photo);
    }

    handleClose();
  }

  useEffect(() => {
    setOpen(!!state.activeSpecialAgent?.id);
    if (state.activeSpecialAgent) {
      form.reset(state.activeSpecialAgent);
      setPhoto(null);
    }
  }, [state.activeSpecialAgent?.id]);

  return (
    <Wrapper>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        Agregar Agente Especial
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(addOrEditSpecialAgent),
        }}
      >
        <DialogTitle>Agregar Agente Especial</DialogTitle>
        <DialogContent>
          <Input id="name" label="Nombre" form={form} />
          <Input id="position" label="Rango" form={form} />
          <MuiFileInput
            required
            value={photo}
            onChange={setPhoto}
            style={{ marginTop: "2rem" }}
            label="Foto"
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
          <Button disabled={state.isSpecialAgentsLoading} type="submit">
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
