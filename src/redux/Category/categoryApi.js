// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../components/hooks/hook";

export const categoryList = createAsyncThunk(
  "categoryList",
  async (data, thunkAPI) => {
    return apiRequest("category", data, thunkAPI);
  }
);

export const addCategory = createAsyncThunk(
  "addCategory",
  async (data, thunkAPI) => {
    return apiRequest("category", data, thunkAPI);
  }
);
export const editCategory = createAsyncThunk(
  "editCategory",
  async (data, thunkAPI) => {
    return apiRequest("category", data, thunkAPI);
  }
);
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (data, thunkAPI) => {
    return apiRequest("category", data, thunkAPI);
  }
);

export const updateCategoryStatus = createAsyncThunk(
  "updateCategoryStatus",
  async (data, thunkAPI) => {
    return apiRequest("category", data, thunkAPI);
  }
);

export const categoryInfo = createAsyncThunk(
  "categoryInfo",
  async (data, thunkAPI) => {
    return apiRequest("category", data, thunkAPI);
  }
);
