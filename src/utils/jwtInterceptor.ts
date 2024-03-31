import Swal from "sweetalert2";
import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(localStorage.getItem("accessToken"));
    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accessToken")).value
        }`,
      };
    }
    return req;
  });

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        Swal.fire({
          title: "Unauthorized",
          text: error,
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("accessToken");
            window.location.replace("/signIn");
          }
        });
      }
    }
  );
}

export default jwtInterceptor;
