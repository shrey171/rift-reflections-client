import { Spinner } from "components/ui";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Spinner />
    </>
  );
};
