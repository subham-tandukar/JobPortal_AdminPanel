// slices.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addJob,
  deleteJob,
  editJob,
  jobInfo,
  jobList,
  updateJobStatus,
} from "./jobApi";

const initialState = {
  job: [],
  error: null,
  loading: false,
  isDeleting: false,
  success: false,
};

const jobSlice = createSlice({
  name: "job",
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
      .addCase(jobList.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(jobList.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
        state.error = null;
      })
      .addCase(jobList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(editJob.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(jobInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(jobInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
        state.error = null;
      })
      .addCase(jobInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateJobStatus.pending, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateJobStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteJob.pending, (state) => {
        state.isDeleting = true;
        state.success = false;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteJob.rejected, (state, action) => {
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
export const { clearError } = jobSlice.actions;
export default jobSlice.reducer;
