import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: boolean = Boolean(
  localStorage.getItem("accessToken") || false
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getToken: (state, action: PayloadAction<any>) => {
      const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000; // 1 hour in milliseconds
      const item = {
        value: action.payload,
        expiry: expirationTime,
      };
      localStorage.setItem("accessToken", JSON.stringify(item));
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
