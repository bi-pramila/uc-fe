// slices/auth/login/reducer.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./thunk";
import { User, LoginResponse } from "./types";



interface LoginState {
    user: User | null;
    error: string | null;
    success: boolean;
    isUserLogout: boolean;
    loading: boolean;
}

// --- Initial State ---
const initialState: LoginState = {
    user: null,
    error: null,
    success: false,
    isUserLogout: false,
    loading: false,
};

// --- Slice ---
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        clearAuthState(state) {
            state.user = null;             // Clear user on state clear
            state.error = null;
            state.success = false;
            state.isUserLogout = false;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            
            state.user = action.payload.user;
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Login failed";
            state.success = false;
            state.user = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isUserLogout = true;
            state.user = null;
            state.success = false;
            state.error = null;
            state.loading = false;
        });
    },
    
});

export const { clearAuthState } = loginSlice.actions;
export default loginSlice.reducer;
