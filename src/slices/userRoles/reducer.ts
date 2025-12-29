// src/slices/userRolesSlice.ts (or .js)
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserRoles,
  addUserRole,
  updateUserRole,
  deleteUserRole
} from "../thunk"; // same import style as RoleGroup

const userRolesSlice = createSlice({
  name: "UserRoles", // 👈 matches store key
  initialState: {
    roles: [],   // 👈 same as groups in RoleGroup
    meta: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📌 FETCH (same as fetchRoleGroups)
      .addCase(fetchUserRoles.pending, (state) => { state.loading = true })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload || [];  // EXACT pattern
        state.meta = action.payload?.meta || {};
        state.error = null;
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 ADD (same as addRoleGroup)
      .addCase(addUserRole.fulfilled, (state, action) => {
        state.roles.unshift(action.payload?.data);
      })

      // 📌 UPDATE (same as updateRoleGroup)
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        state.roles = state.roles.map((r) =>
          r.id === updated.id ? updated : r
        );
      })

      // 📌 DELETE (same as deleteRoleGroup)
      .addCase(deleteUserRole.fulfilled, (state, action) => {
        const removedId = action.meta.arg;
        state.roles = state.roles.filter((r) => r.id !== removedId);
      });
  },
});

export default userRolesSlice.reducer;
