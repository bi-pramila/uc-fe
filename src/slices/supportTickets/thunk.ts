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

export const fetchSupportDepartments = createAsyncThunk(
  "supportTickets/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching support ticket departments");
      const res = await axios.get(`${API_BASE}/tickets/departments`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching support departments");
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

export const createTicket = createAsyncThunk(
  "supportTickets/create",
  async (ticketData: any, { rejectWithValue }) => {
    try {
      console.log("Creating new ticket", ticketData);
      const res = await axios.post(`${API_BASE}/tickets`, ticketData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error creating ticket");
    }
  }
);

export const updateTicket = createAsyncThunk(
  "supportTickets/update",
  async ({ ticketId, data }: { ticketId: string | number; data: any }, { rejectWithValue }) => {
    try {
      console.log(`Updating ticket ID: ${ticketId}`, data);
      const res = await axios.put(`${API_BASE}/tickets/${ticketId}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error updating ticket");
    }
  }
);

export const addTicketReply = createAsyncThunk(
  "supportTickets/addReply",
  async (replyData: any, { rejectWithValue }) => {
    try {
      console.log(`Adding reply to ticket ID: ${replyData.ticketid}`, replyData);
      const res = await axios.post(`${API_BASE}/tickets/${replyData.ticketid}/replies`, replyData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error adding reply");
    }
  }
);

export const deleteTicketReply = createAsyncThunk(
  "supportTickets/deleteReply",
  async ({ replyid }: { replyid: string | number }, { rejectWithValue }) => {
    try {
      console.log(`Deleting reply ID: ${replyid}`);
      const res = await axios.post(`${API_BASE}/tickets/replies/delete`, {
        action: 'DeleteTicketReply',
        replyid: parseInt(replyid.toString())
      });
      return { replyid, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error deleting reply");
    }
  }
);

export const updateTicketReply = createAsyncThunk(
  "supportTickets/updateReply",
  async (updateData: any, { rejectWithValue }) => {
    try {
      console.log(`Updating reply ID: ${updateData.replyid}`, updateData);
      const res = await axios.post(`${API_BASE}/tickets/replies/update`, {
        action: 'UpdateTicketReply',
        ...updateData
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error updating reply");
    }
  }
);

export const addTicketNote = createAsyncThunk(
  "supportTickets/addNote",
  async (noteData: any, { rejectWithValue }) => {
    try {
      console.log(`Adding note to ticket ID: ${noteData.ticketid}`, noteData);
      const res = await axios.post(`${API_BASE}/tickets/${noteData.ticketid}/notes`, noteData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error adding note");
    }
  }
);

export const deleteTicketNote = createAsyncThunk(
  "supportTickets/deleteNote",
  async ({ noteid }: { noteid: string | number }, { rejectWithValue }) => {
    try {
      console.log(`Deleting note ID: ${noteid}`);
      const res = await axios.post(`${API_BASE}/tickets/notes/delete`, {
        action: 'DeleteTicketNote',
        noteid: parseInt(noteid.toString())
      });
      return { noteid, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error deleting note");
    }
  }
);