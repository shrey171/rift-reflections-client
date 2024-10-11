import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "components/layouts";
import { privateRoutes, publicRoutes } from "routes";
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    // Root Layout contains global level components (spinners, toast, etc)
    element: <RootLayout />,
    children: [privateRoutes, publicRoutes],
  },
]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
