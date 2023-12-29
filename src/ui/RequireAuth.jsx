import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ loggedUser, allowedRoles }) => {
  console.log("Logged user: ", loggedUser);
  console.log("Allowed roles: ", allowedRoles);
  const location = useLocation();

  return loggedUser?.roles?.find((role) =>
    allowedRoles?.includes(role?.name)
  ) ? (
    <Outlet />
  ) : loggedUser ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
