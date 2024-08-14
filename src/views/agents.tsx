import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Box, Button } from "@mui/material";
import html2PDF from "jspdf-html2canvas";
import PrintIcon from "@mui/icons-material/Print";

import { Cardnet } from "../components/cardnet";
import { useApp } from "../hooks/useApp/useApp";
import { Filters } from "../components/filters";

export const Agents = () => {
  const { state, actions } = useApp();
  const cards = useRef<HTMLDivElement>(null);

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

      <div ref={cards}>
        <Wrapper>
          {state.children.map((child) => (
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
