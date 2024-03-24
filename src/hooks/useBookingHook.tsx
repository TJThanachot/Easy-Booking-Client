import axios from "axios";
import { getRoomTypesAPI } from "@/redux/APIs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Swal from "sweetalert2";
import { setBookingLIst, setRoomTypeList } from "@/redux/slices/bookingSlice";

export default function useBookingHook() {
  const dispatch = useDispatch<AppDispatch>();

  const fetchRoomType = async () => {
    try {
      const result = await axios.get(getRoomTypesAPI);
      dispatch(setRoomTypeList(result?.data?.roomTypesList));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchRoomType };
}
