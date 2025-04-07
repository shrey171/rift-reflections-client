import { Spinner } from "components/ui";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setAccessToken, useLazyRefreshQuery } from "store";
import { useSpinner } from "hooks";

export const RootLayout = () => {
  const token = useSelector(selectToken);
  const [refresh] = useLazyRefreshQuery();
  const { setIsLoading } = useSpinner();
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const refreshLogin = async () => {
      if (token) return setIsReady(true);
      try {
        setIsLoading(true);
        const { session } = await refresh().unwrap();
        dispatch(setAccessToken(session.access_token));
      } catch (error) {
        console.error("Refresh token failed:", error);
      } finally {
        setIsReady(true);
        setIsLoading(false);
      }
    };
    refreshLogin();
  }, []);

  return (
    <>
      {isReady && <Outlet />}
      <Spinner />
    </>
  );
};
