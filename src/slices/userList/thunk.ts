// src/slices/thunks/roleGroupThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = process.env.PUBLIC_API_BASE_URL;

export const fetchUserList = createAsyncThunk(
  "UserList/fetch", // 👈 matches slice
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/user/all?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching User List");
    }
  }
);

export const onAddUser = createAsyncThunk(
  "UserList/add",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/user/create`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const onUpdateUser = createAsyncThunk(
  "UserList/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/user/${id}`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const onDeleteUser = createAsyncThunk(
  "UserList/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/user/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

