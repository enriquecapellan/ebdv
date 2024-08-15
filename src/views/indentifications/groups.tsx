import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import html2PDF from "jspdf-html2canvas";
import PrintIcon from "@mui/icons-material/Print";
import { Box, Button } from "@mui/material";

import { useApp } from "../../hooks/useApp/useApp";
import { Filters } from "../../components/filters";
import { GropCards } from "../../components/cardnet";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "leader", headerName: "Maestra", width: 150 },
  {
    field: "assistant",
    headerName: "Ayudante",
    width: 150,
  },
  {
    field: "agent",
    headerName: "Agente",
    width: 130,
  },
  {
    field: "calling",
    headerName: "Llamado",
    width: 150,
  },
];

export const GroupsIdentifications = () => {
  const { state, actions } = useApp();
  const [selectedIds, setSelectedIds] = useState(new Set<GridRowId>());
  const { filters, groups } = state;
  const cards = useRef<HTMLDivElement>(null);

  const data = groups.filter(
    (group) =>
      (!filters.agent || group.agent === filters.agent) &&
      (!filters.calling || group.calling === filters.calling)
  );

  function print() {
    if (cards.current) {
      html2PDF(cards.current, {
        jsPDF: {
          format: "a4",
        },
        imageType: "image/jpeg",
        output: "./cardnets.pdf",
      });
    }
  }

  useEffect(() => {
    actions.loadGroups();
  }, []);

  return (
    <>
      <Box display="flex" gap={1} marginBottom={2}>
        <Filters />
        <Button size="small" variant="contained" onClick={print}>
          <PrintIcon />
        </Button>
      </Box>

      <Box marginBottom={4}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          rowHeight={40}
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            setSelectedIds(selectedIDs);
          }}
        />
      </Box>

      <div ref={cards}>
        <Wrapper>
          {data
            .filter((group) => selectedIds.has(group.id || ""))
            .map((group) => (
              <GropCards key={group.id} group={group} />
            ))}
        </Wrapper>
      </div>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.9cm;
  row-gap: 0.81cm;
  padding: 0.14cm 0.6cm;
  background-color: white;
  width: 21cm;
`;
