import { createSlice } from "@reduxjs/toolkit";
import { fetchSupportTickets } from "./thunk";

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
      // .addCase(getTicketDetails.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getTicketDetails.fulfilled, (state, action) => {
      //   state.loading = false;
      //   if (action.payload.result === "success") {
      //     state.ticketDetails = action.payload;
      //   } else {
      //     state.error = action.payload.message || "Failed to fetch ticket details";
      //   }
      // })
      // .addCase(getTicketDetails.rejected, (state, action: any) => {
      //   state.loading = false;
      //   state.error = action.payload || "Failed to fetch ticket details";
      // })

      // // Fetch Support Statuses
      // .addCase(fetchSupportStatuses.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchSupportStatuses.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const payload = action.payload;
        
      //   if (payload.result === "success") {
      //     // WHMCS returns statuses in payload.statuses.status array
      //     state.statuses = payload.statuses?.status || [];
      //   } else {
      //     state.error = payload.message || "Failed to fetch statuses";
      //   }
      // })
      // .addCase(fetchSupportStatuses.rejected, (state, action: any) => {
      //   state.loading = false;
      //   state.error = action.payload || "Failed to fetch support statuses";
      // });
  },
});

export const { clearTicketDetails } = supportTicketsSlice.actions;
export default supportTicketsSlice.reducer;
