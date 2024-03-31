import axios from "axios";
import {
  createBookingAPI,
  getBookingList,
  getRoomTypesAPI,
  insertTransection,
  createBookingTheLordRoomAPI,
  getBookedTheLordRoomAPI,
} from "@/redux/APIs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  setBookingList,
  setRoomTypeList,
  setTheLordRoomBookedList,
} from "@/redux/slices/bookingSlice";
import { CreateBooking, CreateTransection } from "@/app/models";
import useAuthHook from "./useAuthHook";

export default function useBookingHook() {
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert, prepareAlertObj } = useAuthHook();

  const fetchTheLordRoomBooked = async () => {
    try {
      const result = await axios.get(getBookedTheLordRoomAPI);
      dispatch(setTheLordRoomBookedList(result?.data?.checkInCheckOutList));
    } catch (error) {
      console.log(error);
      showAlert(prepareAlertObj("Error", String(error), "error"));
    }
  };

  const fetchRoomType = async () => {
    try {
      const result = await axios.get(getRoomTypesAPI);
      dispatch(setRoomTypeList(result?.data?.roomTypesList));
    } catch (error) {
      console.log(error);
      showAlert(prepareAlertObj("Error", String(error), "error"));
    }
  };

  const fetchBookingList = async (pageNumber: number) => {
    try {
      const result = await axios.get(getBookingList + "/" + pageNumber);
      const payload = {
        bookingList: result?.data?.bookingList,
        totalPage: result?.data?.count,
      };
      dispatch(setBookingList(payload));
    } catch (error) {
      console.log(error);
      showAlert(prepareAlertObj("Error", String(error), "error"));
    }
  };

  const createBooking = async (payload: CreateBooking) => {
    try {
      const result = await axios.post(createBookingAPI, payload);
      const success: boolean = result.request.status === 201;
      showAlert(
        prepareAlertObj(
          success ? "Success" : "Error",
          result?.data?.message,
          success ? "success" : "error"
        ),
        success ? "booking-list" : null
      );
    } catch (error) {
      console.log(error);
      showAlert(prepareAlertObj("Error", String(error), "error"));
    }
  };

  const createTheLordRoomBooking = async (payload: CreateBooking) => {
    try {
      const result = await axios.post(createBookingTheLordRoomAPI, payload);
      const success: boolean = result.request.status === 201;
      showAlert(
        prepareAlertObj(
          success ? "Success" : "Error",
          result?.data?.message,
          success ? "success" : "error"
        ),
        success ? "booking-list" : null
      );
    } catch (error) {
      console.log(error);
      showAlert(prepareAlertObj("Error", String(error), "error"));
    }
  };

  const createTransection = async (payload: CreateTransection) => {
    try {
      const result = await axios.post(insertTransection, payload);
      const success: boolean = result.request.status === 201;

      showAlert(
        prepareAlertObj(
          success ? "Success" : "Error",
          result?.data?.message,
          success ? "success" : "error"
        ),
        null,
        true //refresh
      );
    } catch (error) {
      console.log(error);
      showAlert(prepareAlertObj("Error", String(error), "error"));
    }
  };

  return {
    fetchRoomType,
    createBooking,
    fetchBookingList,
    createTransection,
    fetchTheLordRoomBooked,
    createTheLordRoomBooking,
  };
}
