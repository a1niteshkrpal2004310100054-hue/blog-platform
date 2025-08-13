import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface protectedRoutes {
  children: ReactNode;
}

export const ProtectedRoutes: React.FC<protectedRoutes> = ({ children }) => {
  const user = localStorage.getItem("authToken");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
