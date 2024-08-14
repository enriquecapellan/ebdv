import { createElement } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import App from "./App";
import { Home } from "./views/home";
import { ChildrenIdentifications } from "./views/indentifications/children";
import { Groups } from "./views/groups";
import { Children } from "./views/children";
import { ChildDetails, QRChildDetails } from "./views/child";
import { GroupDetails } from "./views/group";
import { ScanQR } from "./views/scan";
import { Unlock } from "./views/unlock";
import { Leaders } from "./views/leadres";
import { GroupsIdentifications } from "./views/indentifications/groups";
import { SpecialAgents } from "./views/special-agents";
import { LeadersIdentifications } from "./views/indentifications/leaders";
import { SpecialAgentsIdentifications } from "./views/indentifications/special-agents";
import { Identifications } from "./views/indentifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App),
    children: [
      { path: "/", element: createElement(Home) },
      { path: "/special-agents", element: createElement(SpecialAgents) },
      { path: "/groups", element: createElement(Groups) },
      { path: "/groups/:groupId", element: createElement(GroupDetails) },
      { path: "/children", element: createElement(Children) },
      { path: "/children/:id", element: createElement(ChildDetails) },
      { path: "/scan", element: createElement(ScanQR) },
      { path: "/unlock/:id", element: createElement(Unlock) },
      { path: "/leaders", element: createElement(Leaders) },

      {
        path: "/identifications",
        element: createElement(Outlet),
        children: [
          {
            path: "/identifications/",
            element: createElement(Identifications),
          },
          {
            path: "/identifications/children",
            element: createElement(ChildrenIdentifications),
          },
          {
            path: "/identifications/groups",
            element: createElement(GroupsIdentifications),
          },
          {
            path: "/identifications/special-agents",
            element: createElement(SpecialAgentsIdentifications),
          },
          {
            path: "/identifications/leaders",
            element: createElement(LeadersIdentifications),
          },
        ],
      },
    ],
  },
  {
    path: "/qr/children/:id",
    element: createElement(QRChildDetails),
  },
]);
