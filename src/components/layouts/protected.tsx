import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "store";
import { Sidebar } from "components/ui";

export const ProtectedLayout: React.FC = () => {
  const token = useSelector(selectToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) return setIsAuthenticated(true);
    navigate(`/login`, { replace: true });
  }, [token]);

  return (
    isAuthenticated && (
      <main className="flex flex-col bg-secondary p-4 text-frost w-full h-screen lg:flex-row lg:pl-0">
        <Sidebar />
        <div className="rounded-lg bg-frost text-secondary overflow-y-scroll w-full grow p-4 max-h-[calc(100dvh-2rem)]">
          <Outlet />
        </div>
      </main>
    )
  );
};
