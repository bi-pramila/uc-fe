import { useState } from "react";
import { resetPassword as resetPasswordService } from "../services/authService";

interface ResetPasswordResponse {
  message?: string;
  // extend with other fields returned by the API if any
}

export const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const resetPassword = async (
    token: string | null | undefined,
    newPassword: string
  ): Promise<ResetPasswordResponse> => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // If token can be null/undefined, pass empty string or handle accordingly
      const data: ResetPasswordResponse = await resetPasswordService(
        token ?? "",
        newPassword
      );
      setMessage(data.message ?? "Password reset successfully");
      return data;
    } catch (err: unknown) {
      // best practice: narrow unknown to Error when possible
      const errMsg =
        err && typeof err === "object" && "message" in err && typeof (err as any).message === "string"
          ? (err as any).message
          : "Password reset failed";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, message, setError, setMessage } as const;
};
