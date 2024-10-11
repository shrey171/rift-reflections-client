import { PublicLayout } from "components/layouts";
import { Register, Login } from "pages";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
  path: "/",
  element: <PublicLayout />,
  children: [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
};