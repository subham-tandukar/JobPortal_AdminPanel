import { createSlice } from "@reduxjs/toolkit";
import { userInfo } from "./authApi";

const initialState = {
  userDetail: [],
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isSignOut: (state) => {
      state.userDetail = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userInfo.pending, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.userDetail = action.payload;
        state.error = null;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
      });

    // Add a case to handle store initialization/reset
    builder.addMatcher(
      (action) => {
        return action.type === "redux-persist/PERSIST"; // Assuming you are using redux-persist for state persistence
      },
      (state) => {
        state.error = null; // Clear error upon store initialization/reset
      }
    );
  },
});

export const { isSignOut } = authSlice.actions;

export default authSlice.reducer;
