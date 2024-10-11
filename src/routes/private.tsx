import { ProtectedLayout } from "components/layouts";
import { Home, Create, DeathNotes } from "pages";
import { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject = {
  path: "/",
  // ProtectedLayout checks user authentication
  element: <ProtectedLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/death-notes",
      element: <DeathNotes />,
    },
  ],
};