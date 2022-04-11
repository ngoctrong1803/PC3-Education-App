import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../redux/authSlice";

export const createAxios = (user, dispatch, action) => {
  const newInstance = axios.create();

  function getLocalAccessToken() {
    const accessToken = window.localStorage.accesstoken;
    console.log("getLocalAccessToken", accessToken);
    return accessToken;
  }
  function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("refreshtoken");
    return refreshToken;
  }

  const refreshToken = async () => {
    let temp;
    try {
      let refreshtoken = getLocalRefreshToken();
      axios.interceptors.request.use(
        (config) => {
          config.headers["refreshtoken"] = "Bearer " + refreshtoken;
          return config;
        },
        (err) => {
          return Promise.reject("lỗi newInstance:", err);
        }
      );
      const res = await axios.post("http://localhost:8000/api/auth/refresh");
      temp = res.data;
    } catch (err) {
      console.log("lỗi ở hàm refresh!");
    }
    return temp;
  };
  newInstance.interceptors.request.use(
    // before you send request with newInstance it will check content in below
    async (config) => {
      const accessToken = getLocalAccessToken();
      const decodedToken = jwt_decode(accessToken);
      let date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        console.log(
          "============================== reffesh token is exped (refresh token)=================================="
        );
        const data = await refreshToken();

        const refreshUser = {
          ...user,
          accesstoken: data.accesstoken,
          refreshtoken: data.refreshtoken,
        };
        dispatch(action(refreshUser));
        window.localStorage.setItem("accesstoken", data.accesstoken);
        window.localStorage.setItem("refreshtoken", data.refreshtoken);
        config.headers["accesstoken"] = "Bearer " + data.accesstoken;
        config.headers["refreshtoken"] = "Bearer " + data.accesstoken;
      } else {
        config.headers["accesstoken"] = "Bearer " + getLocalAccessToken();
        config.headers["refreshtoken"] = "Bearer " + getLocalRefreshToken();
      }
      return config;
    },
    (err) => {
      return Promise.reject("lỗi newInstance:", err);
    }
  );
  return newInstance;
};
