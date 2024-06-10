import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../redux/slice/authSlice";
import { useAppSelector } from "../redux/store/hooks";
import { user_role } from "@/types/api";
import PageLoader from "../components/PageLoader";

type RequireAuthProps = {
  allowedRoles: user_role[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { status, session } = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (status === "pending") return <PageLoader />;

  if (session && allowedRoles.includes(session.user.user_metadata.user_role)) {
    return <Outlet />;
  }

  if (session) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireAuth;
