import axios from "axios";
import { PATH_HOME } from "../constants/paths";
import store from "../store";
import { setAccessToken, setIsLoggedIn, setRefreshToken } from "../store/auth";

export const HTTP_EXCEPTION_UNAUTHORIZED = 401;
export const HTTP_EXCEPTION_NOT_FOUND = 404;
export const HTTP_EXCEPTION_CONFLICT = 409;

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// TODO: Refresh token when access token is expired
axiosClient.interceptors.request.use(function (config) {
  const accessToken = store.getState().auth.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      HTTP_EXCEPTION_UNAUTHORIZED === error.response.status &&
      error.response.data.message !== "Invalid password"
    ) {
      store.dispatch(setIsLoggedIn(false));
      store.dispatch(setAccessToken(null));
      store.dispatch(setRefreshToken(null));
      window.location.href = PATH_HOME;
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
