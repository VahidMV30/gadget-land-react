import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

interface Props {
  allowedRoles: "Admin" | "User";
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user, isAuthenticated } = useAuthStore();

  const location = useLocation();

  if (!isAuthenticated) {
    const callbackUrl = `${location.pathname}${location.search}`;

    if (callbackUrl) {
      setTimeout(() => {
        localStorage.setItem("callbackUrl", callbackUrl);
      }, 1);
    }

    return <Navigate to={`/auth/login${callbackUrl && `?callbackUrl=${location.pathname}`}`} />;
  }

  if (allowedRoles && allowedRoles !== user?.role) {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
};
