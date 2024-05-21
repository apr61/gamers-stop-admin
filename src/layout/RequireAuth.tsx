import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../redux/slice/authSlice";
import { useAppSelector } from "../redux/store/hooks";
import { Roles } from "../utils/types";

type RequireAuthProps = {
  allowedRoles: Roles[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { status, session } = useAppSelector(selectCurrentUser);
  const location = useLocation();
  console.log(status)
  if (status === "pending") return <h1>Loading....</h1>;
  const content =
    session && allowedRoles.includes(session.user.user_metadata.user_role) ? (
      <Outlet />
    ) : session ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  return content;
};

export default RequireAuth;
