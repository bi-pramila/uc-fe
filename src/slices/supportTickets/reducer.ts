import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchSupportTickets, 
  getTicket, 
  fetchSupportStatuses, 
  getClients, 
  getClientsProducts,
  createTicket,
  updateTicket,
  addTicketReply,
  deleteTicketReply,
  updateTicketReply,
  addTicketNote
} from "./thunk";

const supportTicketsSlice = createSlice({
  name: "SupportTickets",
  initialState: {
    tickets: [],
    ticketDetails: null,
    statuses: [],
    clients: [],
    clientProducts: [],
    totalResults: 0,
    numReturned: 0,
    loading: false,
    submitting: false,
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
        state.statuses = action.payload.statuses.status || [];
      })
      .addCase(fetchSupportStatuses.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch support statuses";
      })

      // Get Clients
      .addCase(getClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch clients";
      })

      // Get Clients Products
      .addCase(getClientsProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientsProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProducts = action.payload;
      })
      .addCase(getClientsProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch client products";
      })

      // Create Ticket
      .addCase(createTicket.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createTicket.rejected, (state, action: any) => {
        state.submitting = false;
        state.error = action.payload || "Failed to create ticket";
      })

      // Update Ticket
      .addCase(updateTicket.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateTicket.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateTicket.rejected, (state, action: any) => {
        state.submitting = false;
        state.error = action.payload || "Failed to update ticket";
      })

      // Add Ticket Reply
      .addCase(addTicketReply.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addTicketReply.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addTicketReply.rejected, (state, action: any) => {
        state.submitting = false;
        state.error = action.payload || "Failed to add reply";
      })

      // Delete Ticket Reply
      .addCase(deleteTicketReply.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteTicketReply.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(deleteTicketReply.rejected, (state, action: any) => {
        state.submitting = false;
        state.error = action.payload || "Failed to delete reply";
      })

      // Update Ticket Reply
      .addCase(updateTicketReply.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateTicketReply.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(updateTicketReply.rejected, (state, action: any) => {
        state.submitting = false;
        state.error = action.payload || "Failed to update reply";
      })

      // Add Ticket Note
      .addCase(addTicketNote.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addTicketNote.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addTicketNote.rejected, (state, action: any) => {
        state.submitting = false;
        state.error = action.payload || "Failed to add note";
      });
  },
});

export const { clearTicketDetails } = supportTicketsSlice.actions;
export default supportTicketsSlice.reducer;
