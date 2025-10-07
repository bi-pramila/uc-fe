import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

// --------------------
// Types
// --------------------

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields returned from your API as needed
}

export interface AuthResponse {
  success: boolean;
  token: string; // if using token-based auth
  user: User;
  message?: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// --------------------
// API Functions
// --------------------

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>(
      `${API_BASE}/user/login`,
      { email, password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export const checkAuth = async (): Promise<AuthResponse | null> => {
  try {
    const res = await axios.get<AuthResponse>(`${API_BASE}/user/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

export const getCurrentUser = async (): Promise<{ user: User }> => {
  try {
    const res = await axios.get<{ user: User }>(
      `${API_BASE}/user/me`,
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Not authenticated" };
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  try {
    const res = await axios.post<ResetPasswordResponse>(
      `${API_BASE}/user/reset-password/${token}`,
      { token, newPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Password reset failed" };
  }
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const res = await axios.post<ForgotPasswordResponse>(
      `${API_BASE}/user/forgot-password`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Failed to send reset link" };
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const res = await axios.post<LogoutResponse>(
      `${API_BASE}/user/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Logout failed" };
  }
};
