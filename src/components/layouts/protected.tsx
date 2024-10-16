import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setAccessToken, useLazyRefreshQuery } from "store";
import { Sidebar } from "components/ui";
import { useSpinner } from "hooks";

export const ProtectedLayout: React.FC = () => {
  const token = useSelector(selectToken);
  const [refresh] = useLazyRefreshQuery();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const {setIsLoading} = useSpinner();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        setIsAuthenticated(true); // Token exists, allow access
        return;
      }
      try {
        setIsLoading(true);
        const { session } = await refresh().unwrap();
        dispatch(setAccessToken(session.access_token)); // Store new token in Redux
        setIsAuthenticated(true); // Allow access to protected routes
      } catch (error) {
        console.error("Refresh token failed:", error);
        navigate(`/login`, { replace: true }); // Redirect to login
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [token, refresh]);

  if (isAuthenticated) {
    return (
      <main className="flex flex-col bg-secondary p-4 text-frost w-full h-screen lg:flex-row lg:pl-0">
        <Sidebar />
        <div className="rounded-lg bg-frost text-secondary overflow-y-scroll w-full grow p-4 max-h-[calc(100dvh-2rem)]">
          <Outlet />
        </div>
      </main>
    );
  }

  return null; // If not authenticated, don’t render anything
};
