// AuthProtected.tsx
import React, { ReactNode, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUserSession } from "hooks/useUserSession";

interface AuthProtectedProps {
  children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const { startSession } = useUserSession();
  const hasInitialized = useRef(false);

  const isAuthenticated = useSelector( 
    (state:any) => !!state.Login?.user
  );

  // Start session when user is authenticated
  useEffect(() => {
    const initializeSession = async () => {
      if (isAuthenticated && !hasInitialized.current) {
        hasInitialized.current = true;
        try {
          await startSession();
        } catch (error) {
          console.error("Failed to start session:", error);
        }
      }
    };

    initializeSession();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;

