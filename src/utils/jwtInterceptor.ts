import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(localStorage.getItem("accessToken"));
    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
        localStorage.removeItem("accessToken");
        window.location.replace("/signIn");
      }
    }
  );
}

export default jwtInterceptor;
