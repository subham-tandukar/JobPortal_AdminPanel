// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetRequest } from "../../components/hooks/hook";

export const dashboardCountApi = createAsyncThunk(
  "dashboardCountApi",
  async (thunkAPI) => {
    return apiGetRequest("dashboardCount", thunkAPI);
  }
);
