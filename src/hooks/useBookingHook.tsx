import axios from "axios";
import { createBookingAPI, getRoomTypesAPI } from "@/redux/APIs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Swal from "sweetalert2";
import { setBookingLIst, setRoomTypeList } from "@/redux/slices/bookingSlice";
import { CreateBooking } from "@/app/models";
import useAuthHook from "./useAuthHook";

export default function useBookingHook() {
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert, prepareAlertObj } = useAuthHook();
  const fetchRoomType = async () => {
    try {
      const result = await axios.get(getRoomTypesAPI);
      dispatch(setRoomTypeList(result?.data?.roomTypesList));
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

  return { fetchRoomType, createBooking };
}
