import { createSlice } from "@reduxjs/toolkit";
import { fetchRoleGroups, addRoleGroup, updateRoleGroup, deleteRoleGroup } from "./thunk";

const roleGroupSlice = createSlice({
  name: "RoleGroup",
  initialState: {
    groups: [],
    meta: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchRoleGroups.pending, (state) => { state.loading = true })
      .addCase(fetchRoleGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload || [];
        state.error = null;
      })
      .addCase(fetchRoleGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addRoleGroup.fulfilled, (state, action) => {
        state.groups.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateRoleGroup.fulfilled, (state, action) => {
        state.groups = state.groups.map((g) =>
          g.id === action.payload?.data?.id ? action.payload.data : g
        );
      })

      // DELETE
      .addCase(deleteRoleGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((g) => g.id !== action.payload.id);
      });
  },
});

export default roleGroupSlice.reducer;
