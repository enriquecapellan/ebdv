import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./views/home";
import { Agents } from "./views/agents";
import { Groups } from "./views/groups";
import App from "./App";
import { Children } from "./views/children";
import { ChildDetails } from "./views/child";
import { Test } from "./views/test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App),
    children: [
      { path: "/", element: createElement(Home) },
      { path: "/groups", element: createElement(Groups) },
      { path: "/children", element: createElement(Children) },
      { path: "/children/:id", element: createElement(ChildDetails) },
      { path: "/agents", element: createElement(Agents) },
      { path: "/test", element: createElement(Test) },
    ],
  },
  {
    path: "/qr/children/:id",
    element: createElement(ChildDetails),
  },
]);
