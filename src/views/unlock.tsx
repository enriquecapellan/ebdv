import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  Typography,
} from "@mui/material";
import BoyIcon from "@mui/icons-material/Boy";
import AgeIcon from "@mui/icons-material/Numbers";
import GroupIcon from "@mui/icons-material/Group";
import PhoneIcon from "@mui/icons-material/Phone";
import SexIcon from "@mui/icons-material/Wc";
import Woman from "@mui/icons-material/Woman";

import { fetchChild } from "../services/db/children";
import { useSpeak } from "../hooks/useSpeak";
import { IChild } from "../types/models";
import { DetailsItem } from "../components/detailsItem";
import { useApp } from "../hooks/useApp/useApp";

export const Unlock = () => {
  const { id } = useParams<{ id: string }>();
  const [child, setChild] = useState<IChild | null>(null);
  const { actions } = useApp();

  const navigate = useNavigate();

  const { speak } = useSpeak();

  function greetAgent() {
    if (child) {
      const greet = child.sex === "Niño" ? "Bienvenido" : "Bienvenida";
      const greeting = `Hola ${child.name}! ${greet}... has desbloqueado el acceso para el grupo de ${child.group.calling} del agente ${child.group.agent}!`;
      speak(greeting);
    }
  }

  function goBack() {
    actions.setActiveChild(null);
    navigate("/scan");
  }

  useEffect(() => {
    if (child) greetAgent();
  }, [child]);

  useEffect(() => {
    async function loadChild() {
      if (!id) return;
      const child = await fetchChild(id);
      setChild(child);
      actions.setActiveChild(child);
    }
    loadChild();
  }, []);

  return (
    <div>
      {!child ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          paddingBottom={4}
        >
          <Typography variant="h6">Agente Identificado</Typography>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {child.name}
              </Typography>
              <Grid item xs={12} md={6}>
                <List>
                  <DetailsItem
                    title="Edad"
                    subTitle={String(child.age)}
                    icon={<AgeIcon />}
                  />
                  <DetailsItem
                    title="Sexo"
                    subTitle={child.sex}
                    icon={<SexIcon />}
                  />
                  <DetailsItem
                    title="Agente"
                    subTitle={child.group.agent}
                    icon={<GroupIcon />}
                  />
                  <DetailsItem
                    title="Llamado"
                    subTitle={child.group.calling}
                    icon={<PhoneIcon />}
                  />
                  <DetailsItem
                    title="Maestra"
                    subTitle={child.group.leader}
                    icon={<Woman />}
                  />
                  {child.group.assistant && (
                    <DetailsItem
                      title="Ayudante"
                      subTitle={child.group.assistant || "No tiene"}
                      icon={<BoyIcon />}
                    />
                  )}
                </List>
              </Grid>
            </CardContent>
          </Card>
          <Button fullWidth variant="contained" onClick={greetAgent}>
            Desbloquear
          </Button>
          <Button fullWidth variant="contained" onClick={goBack}>
            Volver
          </Button>
        </Box>
      )}
    </div>
  );
};
