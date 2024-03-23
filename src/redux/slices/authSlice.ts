import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Register } from "@/app/models";

export const initialState = {
  value: {
    email: "",
    password: "",
    name: "",
    phone: "",
    nationality: "",
    role_id: 1,
  } as Register,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState.value,
  reducers: {
    user: (state, action: PayloadAction<any>) => {
      return state;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      return state;
    },
    deleteUser: (state, action: PayloadAction<any>) => {
      return state;
    },
  },
});

export const { user, updateUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;
