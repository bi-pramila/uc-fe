import { useState } from "react";
import axios from "axios";
import { forgotPassword as forgotPasswordService } from "../services/authService";

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL || "";
interface ForgotPasswordResponse {
  message?: string;
  // Add more fields if your API returns them
}

export const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const changePassword = async (email: string,oldPassword: string, newPassword: string) => {
    setLoading(true);
    setError(false);
    setMessage("");

    try {
      const response = await axios.post(
        `${API_BASE}/user/change-password`,
        { 
          email,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Password changed successfully");
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(true);
      setMessage(err.response?.data?.message || "Failed to change password");
      setLoading(false);
      throw err;
    }
  };

  const sendResetLink = async (email: string): Promise<ForgotPasswordResponse> => {
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

  return { sendResetLink, changePassword, loading, error, message, setError, setMessage };
};
