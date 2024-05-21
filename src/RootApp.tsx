import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { useEffect } from "react";
import supabase from "./utils/supabase";
import { useAppDispatch } from "./redux/store/hooks";
import { setAuthStatus, setCurrentSession } from "./redux/slice/authSlice";

function RootApp() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      dispatch(setAuthStatus("pending"))
      if (event === "SIGNED_OUT") {
        dispatch(setCurrentSession(null));
      } else if (session) {
        dispatch(setCurrentSession(session));
        dispatch(setAuthStatus("succeeded"))
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return <RouterProvider router={routes} />;
}

export default RootApp;
