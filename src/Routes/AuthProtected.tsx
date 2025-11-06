// AuthProtected.tsx
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthProtectedProps {
  children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const isAuthenticated = useSelector( 
    (state:any) => !!state.Login?.user
  );
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;

