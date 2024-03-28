import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: any = {
  roomTypeList: [],
  bookingList: [],
  totalBookingListPage: 1,
};

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: initialState,
  reducers: {
    setRoomTypeList: (state, action: PayloadAction<any>) => {
      return { ...state, roomTypeList: action.payload };
    },

    setBookingLIst: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        bookingList: action.payload.bookingList,
        totalBookingListPage: action.payload.totalPage,
      };
    },
  },
});

export const { setRoomTypeList, setBookingLIst } = bookingSlice.actions;

export default bookingSlice.reducer;
