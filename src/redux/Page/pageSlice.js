// slices.js
import { createSlice } from "@reduxjs/toolkit";
import { addPage, pageList, pageInfo, editPage, deletePage } from "./pageApi";

const initialState = {
  pageData: [],
  error: null,
  loading: false,
  success: false,
  isDeleting: false,
};

const pageSlice = createSlice({
  name: "page",
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
      .addCase(pageList.pending, (state) => {
        state.loading = true;
      })
      .addCase(pageList.fulfilled, (state, action) => {
        state.loading = false;
        state.pageData = action.payload;
        state.error = null;
      })
      .addCase(pageList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(editPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(deletePage.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deletePage.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });

    builder
      .addCase(pageInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(pageInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.pageData = action.payload;
        state.error = null;
      })
      .addCase(pageInfo.rejected, (state, action) => {
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
export const { clearError } = pageSlice.actions;
export default pageSlice.reducer;
