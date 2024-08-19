// slices.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addAdvertisement,
  deleteAdvertisement,
  editAdvertisement,
  advertisementInfo,
  advertisementList,
  updateAdvertisementStatus,
} from "./advertisementApi";

const initialState = {
  advertisement: [],
  error: null,
  loading: false,
  isDeleting: false,
  success: false,
};

const advertisementSlice = createSlice({
  name: "advertisement",
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
      .addCase(advertisementList.pending, (state) => {
        state.loading = true;
      })
      .addCase(advertisementList.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisement = action.payload;
        state.error = null;
      })
      .addCase(advertisementList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addAdvertisement.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAdvertisement.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addAdvertisement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(editAdvertisement.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAdvertisement.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editAdvertisement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(advertisementInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(advertisementInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisement = action.payload;
        state.error = null;
      })
      .addCase(advertisementInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateAdvertisementStatus.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateAdvertisementStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateAdvertisementStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteAdvertisement.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteAdvertisement.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteAdvertisement.rejected, (state, action) => {
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
export const { clearError } = advertisementSlice.actions;
export default advertisementSlice.reducer;
