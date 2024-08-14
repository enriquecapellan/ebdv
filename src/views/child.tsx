import { useEffect, useState } from "react";
import { CircularProgress, Grid, List } from "@mui/material";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import BoyIcon from "@mui/icons-material/Boy";
import AgeIcon from "@mui/icons-material/Numbers";
import GroupIcon from "@mui/icons-material/Group";
import PhoneIcon from "@mui/icons-material/Phone";
import SexIcon from "@mui/icons-material/Wc";
import Woman from "@mui/icons-material/Woman";

import { IChild } from "../types/models";
import { fetchChild } from "../services/db/children";
import { DetailsItem } from "../components/detailsItem";

export const ChildDetails = () => {
  const [child, setChild] = useState<IChild | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getChild() {
      if (!id) return;
      const child = await fetchChild(id);
      setChild(child);
      setLoading(false);
    }
    getChild();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!child) return <div>El id del niño no existe.</div>;

  return (
    <Card>
      <CardMedia sx={{ height: 300 }} image={child.photo} title={child.name} />
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
            <DetailsItem title="Sexo" subTitle={child.sex} icon={<SexIcon />} />
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
  );
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 20,
  },
});

export const QRChildDetails = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ChildDetails />
    </ThemeProvider>
  );
};
