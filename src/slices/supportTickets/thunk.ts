import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL;

export const fetchSupportTickets = createAsyncThunk(
  "supportTickets/fetch", // 👈 matches slice
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      console.log(`Fetching Support Tickets from API: page=${page}, limit=${limit}`);
      const res = await axios.get(`${API_BASE}/tickets`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching User List");
    }
  }
);


// supportTickets/fetch
// supportTickets/getDetails