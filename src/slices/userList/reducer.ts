
// src/slices/userListSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchUserList, 
  onAddUser,
  onUpdateUser,
  onDeleteUser 
} from "./thunk";

const userListSlice = createSlice({
  name: "UserList", // 👈 matches reducer key
  initialState: {
    users: [],
    meta: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => { state.loading = true })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.meta = action.payload.meta;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD USER
      .addCase(onAddUser.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.users.unshift(action.payload?.data);
        }
      })

      // UPDATE USER
      .addCase(onUpdateUser.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated) return;
        state.users = state.users.map(user =>
          user.id === updated.id ? updated : user
        );
      })

      // DELETE USER
      .addCase(onDeleteUser.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.users = state.users.filter(user => user.id !== deletedId);
      });
  },
});


export default userListSlice.reducer;
