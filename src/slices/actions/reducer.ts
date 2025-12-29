// src/slices/userRolesSlice.ts (or .js)
import { createSlice } from "@reduxjs/toolkit";
import { fetchActions } from "./thunk";


const actionSlice = createSlice({
  name: "Actions", // 👈 matches store key
  initialState: {
    actions: [],   // 👈 same as groups in RoleGroup
    meta: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📌 FETCH (same as fetchRoleGroups)
      .addCase(fetchActions.pending, (state) => { state.loading = true })
      .addCase(fetchActions.fulfilled, (state, action) => {
        state.loading = false;
        state.actions = action.payload || [];  // EXACT pattern
        state.meta = action.payload?.meta || {};
        state.error = null;
      })
      .addCase(fetchActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
  },
});

export default actionSlice.reducer;
