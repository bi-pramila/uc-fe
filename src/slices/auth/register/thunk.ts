import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL;

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (user: {
    email: string;
    name: string;
    password: string;
    role_id: string;
  }) => {
    const response = await axios.post(
      `${API_BASE}/user/register`,
      user
    );
    return response.data;
  }
);

export const resetRegisterFlag = createAsyncThunk(
  "register/resetRegisterFlag",
  async () => true
);

export const verifyEmail = createAsyncThunk(
  "register/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/user/verify/${token}`);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Verification failed");
    }
  }
);
