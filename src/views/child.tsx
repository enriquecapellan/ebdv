import { useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

import BoyIcon from "@mui/icons-material/Boy";
import AgeIcon from "@mui/icons-material/Numbers";
import GroupIcon from "@mui/icons-material/Group";
import PhoneIcon from "@mui/icons-material/Phone";
import SexIcon from "@mui/icons-material/Wc";
import Woman from "@mui/icons-material/Woman";

import { IChild } from "../types/models";
import { fetchChild } from "../services/db/children";

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
            <Item
              title="Edad"
              subTitle={String(child.age)}
              icon={<AgeIcon />}
            />
            <Item title="Sexo" subTitle={child.sex} icon={<SexIcon />} />
            <Item
              title="Agente"
              subTitle={child.group.agent}
              icon={<GroupIcon />}
            />
            <Item
              title="Llamado"
              subTitle={child.group.calling}
              icon={<PhoneIcon />}
            />
            <Item
              title="Maestra"
              subTitle={child.group.leader}
              icon={<Woman />}
            />
            <Item
              title="Ayudante"
              subTitle={child.group.assistant}
              icon={<BoyIcon />}
            />
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
};

type ItemProps = {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
};

const Item = ({ title, subTitle, icon }: ItemProps) => (
  <ListItem>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} secondary={subTitle} />
  </ListItem>
);

export const QRChildDetails = () => {
  return (
    <>
      <CssBaseline />
      <ChildDetails />
    </>
  );
};
