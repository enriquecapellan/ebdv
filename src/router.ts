import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Home } from "./views/home";
import { Agents } from "./views/agents";
import { Groups } from "./views/groups";
import { Children } from "./views/children";
import { ChildDetails, QRChildDetails } from "./views/child";
import { GroupDetails } from "./views/group";
import { ScanQR } from "./views/scan";
import { Unlock } from "./views/unlock";
import { Leaders } from "./views/leadres";
import { GroupsIdentifications } from "./views/groupsIdentifications";
import { SpecialAgents } from "./views/special-agents";

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App),
    children: [
      { path: "/", element: createElement(Home) },
      { path: "/special-agents", element: createElement(SpecialAgents) },
      { path: "/groups", element: createElement(Groups) },
      {
        path: "/groups/cardnets",
        element: createElement(GroupsIdentifications),
      },
      { path: "/groups/:groupId", element: createElement(GroupDetails) },
      { path: "/children", element: createElement(Children) },
      { path: "/children/:id", element: createElement(ChildDetails) },
      { path: "/agents", element: createElement(Agents) },
      { path: "/scan", element: createElement(ScanQR) },
      { path: "/unlock/:id", element: createElement(Unlock) },
      { path: "/leaders", element: createElement(Leaders) },
    ],
  },
  {
    path: "/qr/children/:id",
    element: createElement(QRChildDetails),
  },
]);
