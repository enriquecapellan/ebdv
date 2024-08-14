import { Box } from "@mui/material";
import { ChildrenFrom } from "../components/children/form";
import { ChildrenTable } from "../components/children/table";
import { Filters } from "../components/filters";

export const Children = () => {
  return (
    <>
      <Box display="flex" gap={1}>
        <ChildrenFrom />
        <Filters />
      </Box>
      <ChildrenTable />
    </>
  );
};
