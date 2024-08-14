import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Identifications = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={5}
      width="100%"
      height="100%"
    >
      <Typography variant="h2">Carnets</Typography>
      <Button
        fullWidth
        onClick={() => navigate("/identifications/special-agents")}
        variant="contained"
        color="primary"
      >
        Agentes Especiales
      </Button>
      <Button
        fullWidth
        onClick={() => navigate("/identifications/leaders")}
        variant="contained"
        color="primary"
      >
        Líderes
      </Button>
      <Button
        fullWidth
        onClick={() => navigate("/identifications/groups")}
        variant="contained"
        color="primary"
      >
        Grupos
      </Button>
      <Button
        fullWidth
        onClick={() => navigate("/identifications/childrens")}
        variant="contained"
        color="primary"
      >
        Niños
      </Button>
    </Box>
  );
};
