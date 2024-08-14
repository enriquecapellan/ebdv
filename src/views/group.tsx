import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  Typography,
} from "@mui/material";
import WomanIcon from "@mui/icons-material/Woman";

import { fetchGroup } from "../services/db/groups";
import { IGroup } from "../types/models";
import { DetailsItem } from "../components/detailsItem";
import { ChildrenTable } from "../components/children/table";

export const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<IGroup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGroup() {
      if (!groupId) return;
      const group = await fetchGroup(groupId);
      setGroup(group);
      setLoading(false);
    }
    getGroup();
  }, [groupId]);

  if (loading) return <div>Cargando...</div>;
  if (!group) return <div>El grupo {groupId} no existe.</div>;

  return (
    <div>
      <Card>
        <CardMedia
          sx={{ height: 300 }}
          image={group.leaderPhoto}
          title={group.leader}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {group.agent} - {group.calling}
          </Typography>
          <Grid item xs={12} md={6}>
            <List>
              <DetailsItem
                title="Maestra"
                subTitle={group.leader}
                icon={<WomanIcon />}
              />
              {group.assistant && (
                <DetailsItem
                  title="Asistente"
                  subTitle={group.assistant}
                  icon={<WomanIcon />}
                />
              )}
            </List>
          </Grid>
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom marginTop={2}>
        Niños
      </Typography>
      <ChildrenTable />
    </div>
  );
};
