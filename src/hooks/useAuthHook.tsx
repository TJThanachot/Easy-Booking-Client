import axios from "axios";
import { registerAPI } from "@/redux/APIs";
import { Register } from "@/app/models";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
// useRouter
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

type Props = {};

export default function useAuthHook() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const registerAction = async (payload: Register) => {
    const registerForm = { ...payload, role_id: 1 };
    const alertObj = {
      title: "",
      text: "",
      icon: "",
    };
    try {
      const result = await axios.post(registerAPI, registerForm);
      const success: boolean = result.data.message === "Register success";

      (alertObj.title = success ? "Success" : "Error"),
        (alertObj.text = result?.data?.message),
        (alertObj.icon = success ? "success" : "error"),
        showAlert(alertObj, success ? true : false);
    } catch (error) {
      (alertObj.title = "Error"),
        (alertObj.text = error),
        (alertObj.icon = "error"),
        showAlert(alertObj);
      console.log(error);
    }
  };

  const showAlert = (alertObj: any, nav: boolean = false): void => {
    Swal.fire(alertObj).then(() => {
      if (nav) {
        router.push("/");
      }
    });
  };

  const questionAlert = (callback: any, values: any, alertObj: any) => {
    Swal.fire(alertObj).then((result) => {
      if (result.isConfirmed) {
        callback(values);
      }
    });
  };

  return { registerAction, questionAlert };
}
