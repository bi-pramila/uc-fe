import { createSlice } from "@reduxjs/toolkit";
import { registerUser, resetRegisterFlag } from "./thunk";

interface RegisterState {
  success: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  success: false,
  error: null,
};

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(resetRegisterFlag.fulfilled, (state) => {
        state.success = false;
        state.error = null;
      });
  },
});

export default registerSlice.reducer;
