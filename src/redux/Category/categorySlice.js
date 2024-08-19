// slices.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  categoryList,
  updateCategoryStatus,
  categoryInfo,
  editCategory,
  deleteCategory,
} from "./categoryApi";

const initialState = {
  category: [],
  error: null,
  loading: false,
  success: false,
  isDeleting: false,
};

const categorySlice = createSlice({
  name: "category",
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
      .addCase(categoryList.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.error = null;
      })
      .addCase(categoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });

    builder
      .addCase(categoryInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.error = null;
      })
      .addCase(categoryInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCategoryStatus.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateCategoryStatus.rejected, (state, action) => {
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
export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
