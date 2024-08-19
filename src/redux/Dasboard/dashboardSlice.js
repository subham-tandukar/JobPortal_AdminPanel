import { createSlice } from "@reduxjs/toolkit";
import { dashboardCountApi } from "./dashboardApi";

const initialState = {
  dashboardCount: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(dashboardCountApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dashboardCountApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardCount = action.payload;
        state.error = null;
      })
      .addCase(dashboardCountApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Add a case to handle store initialization/reset
    builder.addMatcher(
      (action) => {
        return action.type === "redux-persist/PERSIST"; // Assuming you are using redux-persist for state persistence
      },
      (state) => {
        state.error = null; // Clear error upon store initialization/reset
      }
    );
  },
});

export default dashboardSlice.reducer;
