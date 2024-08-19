// slices.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addJobType,
  jobTypeList,
  updateJobTypeStatus,
  jobTypeInfo,
  editJobType,
  deleteJobType,
} from "./jobTypeApi";

const initialState = {
  jobType: [],
  error: null,
  loading: false,
  success: false,
  isDeleting: false,
};

const jobTypeSlice = createSlice({
  name: "jobType",
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
      .addCase(jobTypeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(jobTypeList.fulfilled, (state, action) => {
        state.loading = false;
        state.jobType = action.payload;
        state.error = null;
      })
      .addCase(jobTypeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addJobType.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJobType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addJobType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(editJobType.pending, (state) => {
        state.loading = true;
      })
      .addCase(editJobType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editJobType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(deleteJobType.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteJobType.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteJobType.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });

    builder
      .addCase(jobTypeInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(jobTypeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.jobType = action.payload;
        state.error = null;
      })
      .addCase(jobTypeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateJobTypeStatus.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateJobTypeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateJobTypeStatus.rejected, (state, action) => {
        state.loading = false;
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
export const { clearError } = jobTypeSlice.actions;
export default jobTypeSlice.reducer;
