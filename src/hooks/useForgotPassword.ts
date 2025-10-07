import { useState } from "react";
import { forgotPassword as forgotPasswordService } from "../services/authService";

interface ForgotPasswordResponse {
  message?: string;
  // Add more fields if your API returns them
}

export const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendResetLink = async (email: string): Promise<ForgotPasswordResponse> => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data: ForgotPasswordResponse = await forgotPasswordService(email);
      setMessage(data.message || "Password reset link sent! Check your email.");
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to send reset link");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendResetLink, loading, error, message, setError, setMessage };
};
