import Home from "../pages/Home";
import User from "../pages/User";
import { FC } from "react";

interface Route {
  path: string;
  component: FC<any>;
}

export const ROUTES: Route[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/user/:id",
    component: User,
  },
];
