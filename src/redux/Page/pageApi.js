// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../components/hooks/hook";

export const pageList = createAsyncThunk("pageList", async (data, thunkAPI) => {
  return apiRequest("page", data, thunkAPI);
});

export const addPage = createAsyncThunk("addPage", async (data, thunkAPI) => {
  return apiRequest("page", data, thunkAPI);
});
export const editPage = createAsyncThunk("editPage", async (data, thunkAPI) => {
  return apiRequest("page", data, thunkAPI);
});
export const deletePage = createAsyncThunk(
  "deletePage",
  async (data, thunkAPI) => {
    return apiRequest("page", data, thunkAPI);
  }
);

export const pageInfo = createAsyncThunk("pageInfo", async (data, thunkAPI) => {
  return apiRequest("page", data, thunkAPI);
});
