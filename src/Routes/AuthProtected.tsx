import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthProtectedProps {
  children: ReactNode;
}
const isAuthenticated = useSelector((state:any) => !!state.auth.user);

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;
