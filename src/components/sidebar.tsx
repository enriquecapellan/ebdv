import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import BoyIcon from "@mui/icons-material/Boy";

import GroupIcon from "@mui/icons-material/Group";
import { useApp } from "../hooks/useApp/useApp";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Sidebar = () => {
  const { state, actions } = useApp();
  const { isSidebarOpen } = state;
  const { toggleSidebar } = actions;

  return (
    <div>
      <Drawer open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleSidebar}>
          <List>
            <Item path="/" icon={<HomeIcon />} text="Home" selected />
            <Item path="/groups" icon={<GroupIcon />} text="Grupos" />
            <Item path="/children" icon={<BoyIcon />} text="Niños" />
            {/* <Item path="/agents" icon={<BoyIcon />} text="Cardnets" /> */}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

type ItemProps = {
  icon: React.ReactNode;
  text: string;
  path: string;
  selected?: boolean;
};

const Item = ({ icon, text, selected, path }: ItemProps) => {
  return (
    <ItemWrapper>
      <Link to={path}>
        <ListItem disablePadding>
          <ListItemButton selected={selected}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </Link>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  a {
    text-decoration: none;
    color: white;
  }
`;
