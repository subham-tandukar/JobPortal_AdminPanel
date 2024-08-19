// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFormRequest, apiRequest } from "../../components/hooks/hook";

export const blogList = createAsyncThunk("blogList", async (data, thunkAPI) => {
  return apiRequest("blog", data, thunkAPI);
});

export const addBlog = createAsyncThunk("addBlog", async (data, thunkAPI) => {
  return apiFormRequest("blog", data, thunkAPI);
});

export const updateBlogStatus = createAsyncThunk(
  "updateBlogStatus",
  async (data, thunkAPI) => {
    return apiRequest("blog", data, thunkAPI);
  }
);

export const editBlog = createAsyncThunk("editBlog", async (data, thunkAPI) => {
  return apiFormRequest("blog", data, thunkAPI);
});
export const blogInfo = createAsyncThunk("blogInfo", async (data, thunkAPI) => {
  return apiRequest("blog", data, thunkAPI);
});

export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async (data, thunkAPI) => {
    return apiRequest("blog", data, thunkAPI);
  }
);
