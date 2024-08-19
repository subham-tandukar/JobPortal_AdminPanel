// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFormRequest, apiRequest } from "../../components/hooks/hook";

export const advertisementList = createAsyncThunk(
  "advertisementList",
  async (data, thunkAPI) => {
    return apiRequest("advertisement", data, thunkAPI);
  }
);

export const addAdvertisement = createAsyncThunk(
  "addAdvertisement",
  async (data, thunkAPI) => {
    return apiFormRequest("advertisement", data, thunkAPI);
  }
);

export const updateAdvertisementStatus = createAsyncThunk(
  "updateAdvertisementStatus",
  async (data, thunkAPI) => {
    return apiRequest("advertisement", data, thunkAPI);
  }
);

export const editAdvertisement = createAsyncThunk(
  "editAdvertisement",
  async (data, thunkAPI) => {
    return apiFormRequest("advertisement", data, thunkAPI);
  }
);
export const advertisementInfo = createAsyncThunk(
  "advertisementInfo",
  async (data, thunkAPI) => {
    return apiRequest("advertisement", data, thunkAPI);
  }
);

export const deleteAdvertisement = createAsyncThunk(
  "deleteAdvertisement",
  async (data, thunkAPI) => {
    return apiRequest("advertisement", data, thunkAPI);
  }
);
