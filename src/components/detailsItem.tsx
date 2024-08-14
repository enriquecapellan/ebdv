import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

type Props = {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
};

export const DetailsItem = ({ title, subTitle, icon }: Props) => (
  <ListItem>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} secondary={subTitle} />
  </ListItem>
);