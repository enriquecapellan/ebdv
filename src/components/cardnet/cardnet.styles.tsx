import styled from "styled-components";

import Mateo from "../../assets/img/carnets/Mateo.png";
import Marcos from "../../assets/img/carnets/Marcos.png";
import Lucas from "../../assets/img/carnets/Lucas.png";
import Juan from "../../assets/img/carnets/Juan.png";
import special from '../../assets/img/carnets/special.png'

const images = { Mateo, Marcos, Lucas, Juan, special };

const getImage = (key: string) => {
  return images[(key.trim()) as keyof typeof images]
};

export const Card = styled.div<{ agent: string }>`
  width: 6cm;
  height: 9cm;
  background-image: url(${(props) => getImage(props.agent)});
  background-size: cover;
  padding-top: 2.5cm;

  img {
    width: 3cm;
    height: 4cm;
    object-fit: cover;
    object-position: center;
  }

  svg {
    width: 3cm;
    height: 3.18cm;
  }
`;
