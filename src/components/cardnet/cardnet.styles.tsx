import styled from "styled-components";

import image1 from "../../assets/img/carnets/1.png";
import image2 from "../../assets/img/carnets/2.png";
import image3 from "../../assets/img/carnets/3.png";
import image4 from "../../assets/img/carnets/4.png";

const images = [image1, image2, image3, image4];

export const Card = styled.div<{ imageIndex: number }>`
  width: 6cm;
  height: 9cm;
  background-image: url(${(props) => images[props.imageIndex]});
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
