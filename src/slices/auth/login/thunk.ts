import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginUserService } from "../../../services/authService";
import { LoginCredentials, LoginResponse } from "./types";


export const loginUser = createAsyncThunk
  <
    LoginResponse, 
    LoginCredentials, 
    { rejectValue: string } 
  >(
    'auth/loginUser', async (credentials, thunkAPI) => {
      try {
          const response = await loginUserService(credentials.email, credentials.password);
          localStorage.setItem("authToken", response.token);
          return response;
      } catch (error: unknown) {
          // Safely extract error message
          let message = "Login failed";
          if (
              error &&
              typeof error === "object" &&
              "message" in error &&
              typeof (error as any).message === "string"
          ) {
              message = (error as any).message;
          }
          return thunkAPI.rejectWithValue(message);
      }
    }
);


export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("authToken"); 
      // Optionally: make a call to your API to invalidate the token/session
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);



