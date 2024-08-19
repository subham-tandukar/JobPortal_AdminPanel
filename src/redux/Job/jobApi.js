// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiHeaderRequest,
  apiFormHeaderRequest,
} from "../../components/hooks/hook";

export const jobList = createAsyncThunk(
  "jobList",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderRequest("job", data, token, thunkAPI);
  }
);

export const addJob = createAsyncThunk(
  "addJob",
  async ({ data, token }, thunkAPI) => {
    return apiFormHeaderRequest("job", data, token, thunkAPI);
  }
);

export const updateJobStatus = createAsyncThunk(
  "updateJobStatus",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderRequest("job", data, token, thunkAPI);
  }
);

export const editJob = createAsyncThunk(
  "editJob",
  async ({ data, token }, thunkAPI) => {
    return apiFormHeaderRequest("job", data, token, thunkAPI);
  }
);
export const jobInfo = createAsyncThunk(
  "jobInfo",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderRequest("job", data, token, thunkAPI);
  }
);

export const deleteJob = createAsyncThunk(
  "deleteJob",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderRequest("job", data, token, thunkAPI);
  }
);
