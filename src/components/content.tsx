import styled from "styled-components";

export const Content = styled.div`
  padding: 1rem;
  height: calc(100vh - 58px);
  width: 100vw;

  @media (min-width: 600px) {
    height: calc(100vh - 64px);
  }
`;
