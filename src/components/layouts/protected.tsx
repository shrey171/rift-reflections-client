import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setAccessToken, useLazyRefreshQuery } from "store";
import { Sidebar } from "components/ui";

export const ProtectedLayout: React.FC = () => {
  const token = useSelector(selectToken);
  const [refresh, { isLoading }] = useLazyRefreshQuery();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        setIsAuthenticated(true); // Token exists, allow access
        return;
      }
      try {
        const { session } = await refresh().unwrap();
        dispatch(setAccessToken(session.access_token)); // Store new token in Redux
        setIsAuthenticated(true); // Allow access to protected routes
      } catch (error) {
        console.error("Refresh token failed:", error);
        navigate(`/login`, { replace: true }); // Redirect to login
      }
    };

    verifyAuth();
  }, [token, refresh, dispatch, navigate]);

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state during refresh
  }

  if (isAuthenticated) {
    return (
      <main className="flex bg-secondary text-frost p-4 pl-0 w-full min-h-screen">
        <Sidebar />
        <div className="rounded-lg bg-frost text-secondary overflow-clip w-full p-4">
          <Outlet />
        </div>
      </main>
    );
  }

  return null; // If not authenticated, don’t render anything
};
