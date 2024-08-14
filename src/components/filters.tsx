import { useForm } from "react-hook-form";
import { DropdownInput } from "./input";
import { AGENTS, CALLINGS } from "../constants";
import { Box, Button, Drawer } from "@mui/material";
import FilterIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import { useApp } from "../hooks/useApp/useApp";
import { IFilters } from "../types/models";

export const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { actions, state } = useApp();
  const form = useForm<IFilters>();

  useEffect(() => {
    form.reset(state.filters);
  }, [state.filters]);

  function handleClose() {
    form.handleSubmit(actions.setFilters)();
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
