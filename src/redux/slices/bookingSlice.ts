import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: any = {
  roomTypeList: [],
  bookingList: [],
};

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: initialState,
  reducers: {
    setRoomTypeList: (state, action: PayloadAction<any>) => {
      return { ...state, roomTypeList: action.payload };
    },

    setBookingLIst: (state, action: PayloadAction<any>) => {
      return { ...state, bookingList: action.payload };
    },
  },
});

export const { setRoomTypeList, setBookingLIst } = bookingSlice.actions;

export default bookingSlice.reducer;
