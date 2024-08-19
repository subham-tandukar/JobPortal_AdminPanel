// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiHeaderGetRequest,
  apiHeaderRequest,
} from "../../components/hooks/hook";

export const applicationList = createAsyncThunk(
  "applicationList",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderGetRequest(
      `admin/applicationList?${data}`,
      token,
      thunkAPI
    );
  }
);

export const singleApplication = createAsyncThunk(
  "singleApplication",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderGetRequest(
      `admin/singleApplication/${data}`,
      token,
      thunkAPI
    );
  }
);

export const updateApplication = createAsyncThunk(
  "updateApplication",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderRequest("application", data, token, thunkAPI);
  }
);

export const deleteApplication = createAsyncThunk(
  "deleteJob",
  async ({ data, token }, thunkAPI) => {
    return apiHeaderRequest("application", data, token, thunkAPI);
  }
);
