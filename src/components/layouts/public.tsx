import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <main className="flex min-h-screen w-full">
      <Outlet />
    </main>
  );
};
