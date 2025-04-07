import { Outlet, useNavigate } from "react-router-dom";
import { selectToken, useAppSelector } from "../../store";
import { useEffect } from "react";

export const PublicLayout = () => {
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, []);

  return (
    <main className="flex min-h-screen w-full">
      <Outlet />
    </main>
  );
};
