import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: any = {
  roomTypeList: [],
  bookingList: [],
  totalBookingListPage: 1,
  theLordRoomCheckInCheckOutList: [],
};

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: initialState,
  reducers: {
    setRoomTypeList: (state, action: PayloadAction<any>) => {
      return { ...state, roomTypeList: action.payload };
    },

    setBookingList: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        bookingList: action.payload.bookingList,
        totalBookingListPage: action.payload.totalPage,
      };
    },

    setTheLordRoomBookedList: (state, action: PayloadAction<any>) => {
      return { ...state, theLordRoomCheckInCheckOutList: action.payload };
    },
  },
});

export const { setRoomTypeList, setBookingList, setTheLordRoomBookedList } =
  bookingSlice.actions;

export default bookingSlice.reducer;
