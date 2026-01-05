// AuthProtected.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUserSession } from "hooks/useUserSession";

interface AuthProtectedProps {
  children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const { startSession } = useUserSession();
  const [sessionStarted, setSessionStarted] = useState(false);

  const isAuthenticated = useSelector( 
    (state:any) => !!state.Login?.user
  );

  // Start session when user is authenticated
  useEffect(() => {
    console.log("AuthProtected: isAuthenticated =", isAuthenticated, "sessionStarted =", sessionStarted);
    const initializeSession = async () => {
      if (isAuthenticated && !sessionStarted) {
        try {
          console.log("Starting user session...");
          await startSession();
          setSessionStarted(true);
        } catch (error) {
          console.error("Failed to start session:", error);
          // Continue rendering even if session start fails
          setSessionStarted(true);
        }
      }
    };

    initializeSession();
  }, [isAuthenticated, sessionStarted, startSession]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;

