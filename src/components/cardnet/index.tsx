import { Box, Typography } from "@mui/material";
import { IChild } from "../../types/models";
import { Card } from "./cardnet.styles";
import QRCode from "react-qr-code";

type CardProps = {
  child: IChild;
  imageIndex: number;
};

export const Cardnet = ({ child, imageIndex }: CardProps) => {
  return (
    <Card imageIndex={imageIndex}>
      <Box display="flex">
        <img src={child.photo} alt={child.name} />
        <Box>
          <Box
            height="0.82cm"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography fontWeight="bold" fontSize={11}>
              AGENTE DE {child.group.agent.toUpperCase()}
            </Typography>
          </Box>
          <QRCode
            height="3.18cm"
            width="3cm"
            value={`${window.location.protocol}/${window.location.host}/qr/children/${child.id}`}
          />
        </Box>
      </Box>
      <Box marginLeft="2.4cm" marginTop={1}>
        <Typography lineHeight={1} fontSize={12}>
          NOMBRE
        </Typography>
        <Typography marginBottom={1} lineHeight={1} fontWeight="bold" fontSize={12}>
          {child.name.toUpperCase()}
        </Typography>
        <Typography lineHeight={1} fontSize={12}>
          DIVISION
        </Typography>
        <Typography lineHeight={1} fontWeight="bold" fontSize={12}>
          {child.group.calling.toUpperCase()}
        </Typography>
      </Box>
    </Card>
  );
};
