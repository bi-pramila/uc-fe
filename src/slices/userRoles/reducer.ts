// src/slices/userRolesSlice.ts (or .js)
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserRoles,
  addUserRole,
  updateUserRole,
  deleteUserRole,
  fetchPermissionsGrouped,
  bulkAssignPermissions
} from "../thunk"; // same import style as RoleGroup

const userRolesSlice = createSlice({
  name: "UserRoles", // 👈 matches store key
  initialState: {
    roles: [],   // 👈 same as groups in RoleGroup
    permissions: [],
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
      })

      // 📌 FETCH PERMISSIONS GROUPED
      .addCase(fetchPermissionsGrouped.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermissionsGrouped.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload || [];
        state.error = null;
      })
      .addCase(fetchPermissionsGrouped.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 BULK ASSIGN PERMISSIONS
      .addCase(bulkAssignPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(bulkAssignPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(bulkAssignPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userRolesSlice.reducer;
