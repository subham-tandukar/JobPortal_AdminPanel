// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../components/hooks/hook";
// Define async thunks for CRUD operations
export const jobTypeList = createAsyncThunk(
  "jobTypeList",
  async (data, thunkAPI) => {
    return apiRequest("jobType", data, thunkAPI);
  }
);

export const addJobType = createAsyncThunk(
  "addJobType",
  async (data, thunkAPI) => {
    return apiRequest("jobType", data, thunkAPI);
  }
);

export const editJobType = createAsyncThunk(
  "editJobType",
  async (data, thunkAPI) => {
    return apiRequest("jobType", data, thunkAPI);
  }
);

export const deleteJobType = createAsyncThunk(
  "deleteJobType",
  async (data, thunkAPI) => {
    return apiRequest("jobType", data, thunkAPI);
  }
);

export const updateJobTypeStatus = createAsyncThunk(
  "updateJobTypeStatus",
  async (data, thunkAPI) => {
    return apiRequest("jobType", data, thunkAPI);
  }
);

export const jobTypeInfo = createAsyncThunk(
  "jobTypeInfo",
  async (data, thunkAPI) => {
    return apiRequest("jobType", data, thunkAPI);
  }
);
