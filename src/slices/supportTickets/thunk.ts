import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const WHMCS_API_URL = "https://www.hoarc.com/billing/includes/api.php";
const API_IDENTIFIER = "MSt12yS6lfzX4eUnaaM7kPwuI83D6dXP";
const API_SECRET = "aahNBQIwUHdArK4hrdYhBg0T7jU3Ahhv";

export const fetchSupportTickets = createAsyncThunk(
  "supportTickets/fetch",
  async ({ limitstart = 0, limitnum = 25 }: { limitstart?: number; limitnum?: number }, { rejectWithValue }) => {
    try {
      console.log(`Fetching Support Tickets from WHMCS API: limitstart=${limitstart}, limitnum=${limitnum}`);
      
      const data = new URLSearchParams({
        action: "GetTickets",
        identifier: API_IDENTIFIER,
        secret: API_SECRET,
        limitstart: limitstart.toString(),
        limitnum: limitnum.toString(),
        responsetype: "json",
      });

      const response = await axios.post(WHMCS_API_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("✅ Support Tickets Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Support Tickets API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Error fetching support tickets");
    }
  }
);

export const getTicketDetails = createAsyncThunk(
  "supportTickets/getDetails",
  async (ticketId: string | number, { rejectWithValue }) => {
    try {
      const data = new URLSearchParams({
        action: "GetTicket",
        identifier: API_IDENTIFIER,
        secret: API_SECRET,
        ticketid: ticketId.toString(),
        responsetype: "json",
      });

      const response = await axios.post(WHMCS_API_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching ticket details");
    }
  }
);

export const fetchSupportStatuses = createAsyncThunk(
  "supportTickets/fetchStatuses",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching Support Statuses from WHMCS API");
      
      const data = new URLSearchParams({
        action: "GetSupportStatuses",
        identifier: API_IDENTIFIER,
        secret: API_SECRET,
        responsetype: "json",
      });

      const response = await axios.post(WHMCS_API_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("✅ Support Statuses Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Support Statuses API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Error fetching support statuses");
    }
  }
);
