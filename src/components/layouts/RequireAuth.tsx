import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../PageLoader";
import { useAuth } from "@/hooks/useAuth";
import { USER_ROLE } from "@/types/api";
import { PropsWithChildren } from "react";

type RequireAuthProps = PropsWithChildren & {
  allowedRoles: USER_ROLE[];
};

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { session, user_role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader />;

  if (session && allowedRoles.includes(user_role as USER_ROLE)) {
    return children;
  }

  if (session) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireAuth;
