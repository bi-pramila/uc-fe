import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL;

export const fetchSupportTickets = createAsyncThunk(
  "supportTickets/fetch",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      console.log(`Fetching Support Tickets from API: page=${page}, limit=${limit}`);
      const res = await axios.get(`${API_BASE}/tickets`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching tickets");
    }
  }
);

export const getTicket = createAsyncThunk(
  "supportTickets/getDetails",
  async (ticketId: string | number, { rejectWithValue }) => {
    try {
      console.log(`Fetching ticket details for ID: ${ticketId}`);
      const res = await axios.get(`${API_BASE}/tickets/${ticketId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching ticket details");
    }
  }
);

export const fetchSupportStatuses = createAsyncThunk(
  "supportTickets/fetchStatuses",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching support ticket statuses");
      const res = await axios.get(`${API_BASE}/tickets/statuses`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching support statuses");
    }
  }
);

export const getClients = createAsyncThunk(
  "supportTickets/getClients",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching clients");
      const res = await axios.get(`${API_BASE}/tickets/clients`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching clients");
    }
  }
);

export const getClientsProducts = createAsyncThunk(
  "supportTickets/getClientsProducts",
  async (clientId: string | number, { rejectWithValue }) => {
    try {
      console.log(`Fetching products for client ID: ${clientId}`);
      const res = await axios.get(`${API_BASE}/tickets/clients/${clientId}/products`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching client products");
    }
  }
);