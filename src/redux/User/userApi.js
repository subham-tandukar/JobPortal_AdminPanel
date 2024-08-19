// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetRequest, apiRequest } from "../../components/hooks/hook";

export const userList = createAsyncThunk("userList", async (data, thunkAPI) => {
  return apiRequest("user", data, thunkAPI);
});

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (data, thunkAPI) => {
    return apiRequest("user", data, thunkAPI);
  }
);
