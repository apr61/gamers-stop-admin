import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { useEffect, useState } from "react";
import supabase from "./utils/supabase";
import { useAppDispatch } from "./redux/store/hooks";
import { setAuthStatus, setCurrentSession } from "./redux/slice/authSlice";
import PageLoader from "./components/PageLoader";

function RootApp() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initializeAuth = async () => {
      const session = await supabase.supabase.auth.getSession();
      if (session) {
        dispatch(setCurrentSession(session.data.session));
        dispatch(setAuthStatus("succeeded"));
      } else {
        dispatch(setAuthStatus("idle"));
      }
      setLoading(false);
    };

    initializeAuth();
  }, [dispatch]);
  if (loading) return <PageLoader />;
  return <RouterProvider router={routes} />;
}

export default RootApp;
