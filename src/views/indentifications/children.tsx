import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Box, Button } from "@mui/material";
import html2PDF from "jspdf-html2canvas";
import PrintIcon from "@mui/icons-material/Print";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

import { Cardnet } from "../../components/cardnet";
import { useApp } from "../../hooks/useApp/useApp";
import { Filters } from "../../components/filters";
import { IChild } from "../../types/models";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 150 },
  {
    field: "age",
    headerName: "Edata",
    type: "number",
    width: 90,
  },
  {
    field: "leader",
    headerName: "Maestra",
    width: 150,
    valueGetter: (_, row) => row.group.leader,
  },
  {
    field: "agent",
    headerName: "Agente",
    width: 130,
    valueGetter: (_, row) => row.group.agent,
  },
  {
    field: "calling",
    headerName: "Llamado",
    width: 150,
    valueGetter: (_, row) => row.group.calling,
  },
];

export const ChildrenIdentifications = () => {
  const { state, actions } = useApp();
  const [selectedIds, setSelectedIds] = useState(new Set<GridRowId>());
  const { children, filters } = state;
  const cards = useRef<HTMLDivElement>(null);

  const data = useMemo(
    () =>
      children.filter(
        (child) =>
          (!filters.agent || child.group.agent === filters.agent) &&
          (!filters.calling || child.group.calling === filters.calling)
      ),
    [children, filters.agent, filters.calling]
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
    actions.loadChildren();
  }, []);

  return (
    <>
      <Box display="flex" gap={1} marginBottom={2}>
        <Filters />
        <Button size="small" variant="contained" onClick={print}>
          <PrintIcon />
        </Button>
      </Box>

      <Box height={730} marginBottom={4}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
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
            .filter((child) => selectedIds.has(child.id || ""))
            .map((child) => (
              <Cardnet key={child.id} child={child} />
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
  row-gap: 0.79cm;
  padding: 0.14cm 0.6cm;
  background-color: white;
  width: 21cm;
`;
