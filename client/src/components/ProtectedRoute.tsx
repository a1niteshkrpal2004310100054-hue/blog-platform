import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface protectedRoutes {
  user: string | null;
  children: ReactNode;
}

export const ProtectedRoutes: React.FC<protectedRoutes> = ({
  user,
  children,
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
