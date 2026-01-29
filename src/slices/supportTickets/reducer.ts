import { createSlice } from "@reduxjs/toolkit";
import { fetchSupportTickets, getTicket, fetchSupportStatuses } from "./thunk";

const supportTicketsSlice = createSlice({
  name: "SupportTickets",
  initialState: {
    tickets: [],
    ticketDetails: null,
    statuses: [],
    totalResults: 0,
    numReturned: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearTicketDetails: (state) => {
      state.ticketDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tickets List
      .addCase(fetchSupportTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        
        // WHMCS API response structure
        if (payload.result === "success") {
          state.tickets = payload.tickets?.ticket || [];
          state.totalResults = parseInt(payload.totalresults || "0");
          state.numReturned = parseInt(payload.numreturned || "0");
        } else {
          state.error = payload.message || "Failed to fetch tickets";
        }
      })
      .addCase(fetchSupportTickets.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch support tickets";
      })

      // Get Ticket Details
      .addCase(getTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketDetails = action.payload;
      })
      .addCase(getTicket.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch ticket details";
      })

      // Fetch Support Statuses
      .addCase(fetchSupportStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchSupportStatuses.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch support statuses";
      });
  },
});

export const { clearTicketDetails } = supportTicketsSlice.actions;
export default supportTicketsSlice.reducer;
