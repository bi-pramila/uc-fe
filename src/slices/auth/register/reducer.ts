import { createSlice } from "@reduxjs/toolkit";
import { registerUser, resetRegisterFlag, verifyEmail } from "./thunk";

export const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
  verifying: false,
  verificationSuccess: false,
  verificationError: null,
};

const registerSlice = createSlice({
  name: "register",
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
      })
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.verifying = true;
        state.verificationError = null;
        state.verificationSuccess = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifying = false;
        state.verificationSuccess = true;
        state.message = action.payload.message || "Email verified successfully";
      })
      .addCase(verifyEmail.rejected, (state, action: any) => {
        state.verifying = false;
        state.verificationError = action.payload || "Verification failed";
      });
  },
});

export default registerSlice.reducer;
