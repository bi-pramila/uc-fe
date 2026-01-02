// src/slices/thunk.ts (follow RoleGroup format exactly)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = process.env.PUBLIC_API_BASE_URL;

// GET LIST
export const fetchUserRoles = createAsyncThunk(
  "UserRoles/fetch",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/user-roles/all?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ADD
export const addUserRole = createAsyncThunk(
  "UserRoles/add",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/user-roles`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// UPDATE
export const updateUserRole = createAsyncThunk(
  "UserRoles/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/user-roles/${id}`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// DELETE
export const deleteUserRole = createAsyncThunk(
  "UserRoles/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/user-roles/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const fetchPermissionsGrouped = createAsyncThunk(
    "permissions/fetchGrouped",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE}/permissions/grouped`);
            return response.data || [];
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch permissions");
        }
    }
);

export const bulkAssignPermissions = createAsyncThunk(
  "UserRoles/bulkAssignPermissions",
  async ({ roleId, permissionIds }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/role-permissions/bulk-assign`, {
        roleId,
        permissionIds,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);
