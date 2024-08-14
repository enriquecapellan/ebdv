import { GroupsTable } from "../components/groups/table";
import { GroupFrom } from "../components/groups/form";
import { Box } from "@mui/material";
import { Filters } from "../components/filters";

export const Groups = () => {
  return (
    <>
      <Box display="flex" gap={1}>
        <GroupFrom />
        <Filters />
      </Box>
      <GroupsTable />
    </>
  );
};
