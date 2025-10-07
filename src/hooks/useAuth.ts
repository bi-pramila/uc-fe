import { useState } from "react";
import { login as loginService, logout as logoutService, checkAuth } from "../services/authService";

// Define the expected User type based on your app's structure
interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as per your API response
}

// Define the return type from loginService if it returns tokens, messages, etc.
interface LoginResponse {
  token: string;
  // Add any other fields returned by loginService
}

// Hook return type (optional but good for clarity)
interface UseAuthReturn {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string;
  success: string;
  setError: (msg: string) => void;
  setSuccess: (msg: string) => void;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data: LoginResponse = await loginService(email, password);
      const me = await checkAuth();
      setUser(me?.user || null);
      setSuccess("Login successful");
      return data;
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await logoutService();
      setUser(null);
      setSuccess("Logout successful");
    } catch (err: any) {
      setError(err.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, login, logout, loading, error, success, setError, setSuccess };
};
