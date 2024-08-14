import { useForm } from "react-hook-form";
import { DropdownInput } from "../input";
import { AGENTS, CALLINGS } from "./constants";
import { Box, Button, Drawer } from "@mui/material";
import FilterIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import { useApp } from "../../hooks/useApp/useApp";
import { IGroupsFilters } from "../../types/models";

export const GroupFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { actions, state } = useApp();
  const form = useForm<IGroupsFilters>({ defaultValues: state.groupsFilters });

  function handleClose() {
    form.handleSubmit(actions.setGroupsFilters)();
    setIsOpen(false);
  }

  return (
    <div>
      <Button size="small" variant="contained" onClick={() => setIsOpen(true)}>
        <FilterIcon />
      </Button>
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        <Box padding={2}>
          <DropdownInput
            required={false}
            id="agent"
            label="Agente"
            form={form}
            options={AGENTS}
          />
          <DropdownInput
            required={false}
            id="calling"
            label="Llamado"
            form={form}
            options={CALLINGS}
          />
        </Box>
      </Drawer>
    </div>
  );
};
