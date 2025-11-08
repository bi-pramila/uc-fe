// slices/auth/login/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginUserService } from "../../../services/authService";
import { LoginCredentials, LoginResponse } from "./types";


export const loginUser = createAsyncThunk<
    LoginResponse, 
    LoginCredentials, 
    { rejectValue: string } 
  >(
    "/auth/loginUser",    
    async (credentials, thunkAPI) => {
      try {
          console.log("Thunk: Attempting login with: ", credentials);
          const response = await loginUserService(credentials.email, credentials.password);
          console.log("Thunk: Got response: ", response);
          if (!response ||  !response.user) {
            // Backend returned a non-user/token object, likely failed login
            throw new Error(response.message || "Invalid login response");
          }
          // localStorage.setItem("authToken", response.token);
          return response;
      } catch (error: any) {
          // Safely extract error message
          let message = "Login failed";
          if (
              error &&
              typeof error === "object" &&
              "message" in error &&
              typeof error.message === "string"
          ) {
              message = error.message;
          }
          return thunkAPI.rejectWithValue(message);
      }
    }
  );


export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logout();
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);



