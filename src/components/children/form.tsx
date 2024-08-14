import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { MuiFileInput } from "mui-file-input";
import { CircularProgress } from "@mui/material";

import { DropdownInput, Input } from "../input";
import { IChild } from "../../types/models";
import { useApp } from "../../hooks/useApp/useApp";

export function ChildrenFrom() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const handleClose = () => setOpen(false);
  const { state, actions } = useApp();

  const form = useForm<IChild>();
  const { handleSubmit } = form;

  async function handleAddChild(child: IChild) {
    const group = state.groups.find(
      (g) => `${g.leader} - ${g.agent}` === ((child.group as unknown) as string)
    );
    if (!image || !group) return;

    const data = { ...child, group };
    await actions.addChild(data, image);
    handleClose();
  }

  useEffect(() => {
    actions.loadGroups();
  }, []);

  const groupsOptions = state.groups.map((group) => ({
    ...group,
    label: `${group.leader} - ${group.agent}`,
  }));

  return (
    <Wrapper>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        Agregar Niño
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(handleAddChild),
        }}
      >
        <DialogTitle>Agregar Niño</DialogTitle>
        <DialogContent>
          <DropdownInput
            id="group"
            label="Grupo"
            options={groupsOptions}
            form={form}
          />
          <Input id="name" label="Nombre" form={form} />
          <Input id="age" label="Edad" type="number" form={form} />
          <DropdownInput
            id="sex"
            label="Sexo"
            options={["Niño", "Niña"]}
            form={form}
          />
          <MuiFileInput
            required
            value={image}
            onChange={setImage}
            style={{ marginTop: "2rem" }}
            label="Seleccionar imagen"
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
          <Button disabled={state.isChildrenLoading} type="submit">
            {state.isChildrenLoading ? <CircularProgress /> : "Enviar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;
