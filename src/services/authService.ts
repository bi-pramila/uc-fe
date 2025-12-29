// authService
import axios from "axios";

const API_BASE = process.env.PUBLIC_API_BASE_URL;

// Types
import { User, AuthResponse, ResetPasswordResponse, ForgotPasswordResponse, LogoutResponse } from "../slices/auth/login/types";


// --------------------
// API Functions
// --------------------
export const login = async (email: string, password: string): 
Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>(
      `${API_BASE}/user/login`,
      { email, password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Full res object", res);
    console.log("API response:", res.data);
    if (!res.user) {
      throw new Error(res.message || "Invalid login");
    }
    return res;
    
  } catch (err: any) {
    console.error("Login API error:", err);
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
    console.log("Calling logout API...");
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
    console.log("Logout API done:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("Logout error:", err.response?.data);
    throw err.response?.data || { message: "Logout failed" };
  }
};
