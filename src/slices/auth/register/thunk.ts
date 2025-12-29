import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (user: {
    email: string;
    name: string;
    password: string;
    role_id: string;
  }) => {
    const response = await axios.post(
      "http://localhost:4000/api/user/register",
      user
    );
    return response.data;
  }
);

export const resetRegisterFlag = createAsyncThunk(
  "register/resetRegisterFlag",
  async () => true
);
