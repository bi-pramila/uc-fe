// src/slices/thunks/roleGroupThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = process.env.PUBLIC_API_BASE_URL;

// FETCH ==========
export const fetchRoleGroups = createAsyncThunk(
  "RoleGroup/fetch",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/role-groups/all?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch role groups");
    }
  }
);

// ADD ============
export const addRoleGroup = createAsyncThunk(
  "RoleGroup/add",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/role-groups`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add role group");
    }
  }
);

// UPDATE =========
export const updateRoleGroup = createAsyncThunk(
  "RoleGroup/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/role-groups/${id}`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update role group");
    }
  }
);

// DELETE =========
export const deleteRoleGroup = createAsyncThunk(
  "RoleGroup/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE}/role-groups/${id}`);
      return { id, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete role group");
    }
  }
);
