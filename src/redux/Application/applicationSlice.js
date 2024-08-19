// slices.js
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteApplication,
  applicationList,
  singleApplication,
  updateApplication,
} from "./applicationApi";

const initialState = {
  application: [],
  error: null,
  loading: false,
  isDeleting: false,
  success: false,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.loading = false;
      state.success = false;
      state.isDeleting = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applicationList.pending, (state) => {
        state.loading = true;
      })
      .addCase(applicationList.fulfilled, (state, action) => {
        state.loading = false;
        state.application = action.payload;
        state.error = null;
      })
      .addCase(applicationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(singleApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.application = action.payload;
        state.error = null;
      })
      .addCase(singleApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateApplication.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateApplication.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteApplication.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.isDeleting = false;
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
export const { clearError } = applicationSlice.actions;
export default applicationSlice.reducer;
