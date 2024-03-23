import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: boolean = Boolean(
  localStorage.getItem("accessToken") || false
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getToken: (state, action: PayloadAction<any>) => {
      localStorage.setItem("accessToken", action.payload);
      return Boolean(action.payload || false);
    },

    deleteToken: (state) => {
      localStorage.removeItem("accessToken");
      return false;
    },
  },
});

export const { getToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
