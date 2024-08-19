// slices.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addBlog,
  deleteBlog,
  editBlog,
  blogInfo,
  blogList,
  updateBlogStatus,
} from "./blogApi";

const initialState = {
  blog: [],
  error: null,
  loading: false,
  isDeleting: false,
  success: false,
};

const blogSlice = createSlice({
  name: "blog",
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
      .addCase(blogList.pending, (state) => {
        state.loading = true;
      })
      .addCase(blogList.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        state.error = null;
      })
      .addCase(blogList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(editBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    builder
      .addCase(blogInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(blogInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        state.error = null;
      })
      .addCase(blogInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateBlogStatus.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateBlogStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateBlogStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteBlog.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
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
export const { clearError } = blogSlice.actions;
export default blogSlice.reducer;
