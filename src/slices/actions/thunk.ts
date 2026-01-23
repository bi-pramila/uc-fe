// src/slices/thunks/roleGroupThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL;

// FETCH ==========
export const fetchActions = createAsyncThunk(
  "Actions/fetch",
  async (rejectWithValue) => {
    try {
      const res = await axios.get(`${API_BASE}/actions/active`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch actions");
    }
  }
);