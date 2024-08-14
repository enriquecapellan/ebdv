import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Home } from "./views/home.tsx";
import { Agents } from "./views/agents";
import { Groups } from "./views/groups";
import { Children } from "./views/children";
import { ChildDetails, QRChildDetails } from "./views/child";
import { GroupDetails } from "./views/group";
import { Test } from "./views/test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App),
    children: [
      { path: "/", element: createElement(Home) },
      { path: "/groups", element: createElement(Groups) },
      { path: "/groups/:groupId", element: createElement(GroupDetails) },
      { path: "/children", element: createElement(Children) },
      { path: "/children/:id", element: createElement(ChildDetails) },
      { path: "/agents", element: createElement(Agents) },
      { path: "/test", element: createElement(Test) },
    ],
  },
  {
    path: "/qr/children/:id",
    element: createElement(QRChildDetails),
  },
]);
