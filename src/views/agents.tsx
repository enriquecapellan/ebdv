import { useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import html2PDF from "jspdf-html2canvas";

import { Cardnet } from "../components/cardnet";

export const Agents = () => {
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
  return (
    <>
      <Button onClick={print}>Print</Button>

      <div ref={cards}>
        <Wrapper>
          {new Array(10).fill(null).map(() => (
            <Cardnet />
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
  row-gap: 0.91cm;
  padding: 0.14cm 0.6cm;
  background-color: white;
  width: 21cm;
  /* height: 29.7cm; */
`;
