import axios from "axios";
import { registerAPI, signInAPI } from "@/redux/APIs";
import { Register } from "@/app/models";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
// useRouter
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import { deleteToken, getToken } from "@/redux/slices/authSlice";

export default function useAuthHook() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const signInAction = async (payload: any) => {
    try {
      const result = await axios.post(signInAPI, payload);
      const success: boolean = result.data.message === "Successfully logged in";
      if (success) {
        dispatch(getToken(result.data.accessToken));
      }
      showAlert(
        prepareAlertObj(
          success ? "Success" : "Error",
          result?.data?.message,
          success ? "success" : "error"
        ),
        success ? "/" : null
      );
    } catch (error) {
      showAlert(prepareAlertObj("Error", String(error), "error"));
      console.log(error);
    }
  };

  const signOut = () => {
    dispatch(deleteToken());
    showAlert(
      prepareAlertObj("Success", "Sign out successfully.", "success"),
      "/signIn"
    );
  };

  const registerAction = async (payload: Register) => {
    const registerForm = { ...payload, role_id: 1 };
    try {
      const result = await axios.post(registerAPI, registerForm);
      const success: boolean = result.data.message === "Register success";
      showAlert(
        prepareAlertObj(
          success ? "Success" : "Error",
          result?.data?.message,
          success ? "success" : "error"
        ),
        success ? "signIn" : null
      );
    } catch (error) {
      showAlert(prepareAlertObj("Error", String(error), "error"));
      console.log(error);
    }
  };

  const showAlert = (alertObj: any, nav: string | null = null): void => {
    Swal.fire(alertObj).then(() => {
      if (nav) {
        router.push(nav);
      }
    });
  };

  const questionAlert = (callback: any, values: any, alertObj: any) => {
    Swal.fire(alertObj).then((result) => {
      if (result.isConfirmed) {
        callback(values || null);
      }
    });
  };

  const prepareAlertObj = (title: string, text: string, icon: string) => {
    return {
      title,
      text,
      icon,
    };
  };

  return {
    registerAction,
    questionAlert,
    showAlert,
    prepareAlertObj,
    signInAction,
    signOut,
  };
}
