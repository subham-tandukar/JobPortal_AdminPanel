// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHeaderGetRequest } from "../../components/hooks/hook";

export const userInfo = createAsyncThunk(
  "userInfo",
  async (token, thunkAPI) => {
    return apiHeaderGetRequest("userInfo", token, thunkAPI);
  }
);
