// slices/auth/login/types.ts

export interface User { 
    id?: string; 
    name?: string; 
    email?: string; 
    role?: string;
}
export interface AuthResponse { 
    success: boolean;
    message: string; 
    user: User;
}
export interface LoginCredentials { 
    email: string; 
    password: string; 
}

export interface ForgotPasswordResponse {
  success: boolean;
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

export interface LoginResponse extends AuthResponse {}