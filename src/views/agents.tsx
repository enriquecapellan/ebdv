import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import html2PDF from "jspdf-html2canvas";

import { Cardnet } from "../components/cardnet";
import { useApp } from "../hooks/useApp/useApp";

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
      <Button onClick={print}>Print</Button>

      <div ref={cards}>
        <Wrapper>
          {state.children.map((child) => (
            <Cardnet key={child.id} imageIndex={1} child={child} />
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
