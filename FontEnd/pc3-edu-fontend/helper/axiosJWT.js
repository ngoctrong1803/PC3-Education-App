import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginReset } from "../redux/authSlice";

export const createAxios = (user, dispatch, loginSuccess) => {
  console.log("tạo mới ", user);
  const host = process.env.NEXT_PUBLIC_HOST;
  const newInstance = axios.create({ baseURL: host });

  function getLocalAccessToken() {
    //  const accessToken = window.localStorage.accesstoken;
    const accessToken = user.accesstoken;
    console.log("getLocalAccessToken", accessToken);
    return accessToken;
  }
  function getLocalRefreshToken() {
    // const refreshToken = window.localStorage.getItem("refreshtoken");
    // error in here
    const refreshToken = user.refreshtoken;
    console.log("getLocalRefreshToken to refresh:", user.refreshtoken);
    return refreshToken;
  }

  const refreshToken = async () => {
    let temp;
    try {
      let refreshtoken = getLocalRefreshToken();
      axios.interceptors.request.use(
        (config) => {
          config.headers["refreshtoken"] = "Bearer " + refreshtoken;
          // error in here
          console.log("data chuyể lên server:", "Bearer " + refreshtoken);
          return config;
        },
        (err) => {
          return Promise.reject("lỗi newInstance:", err);
        }
      );
      const res = await axios.post(host + "/api/auth/refresh");
      temp = res.data;
    } catch (err) {
      window.localStorage.removeItem("accesstoken");
      window.localStorage.removeItem("refreshtoken");
      dispatch(loginReset());
      console.log("lỗi ở hàm refresh!");
    }
    return temp;
  };

  newInstance.interceptors.request.use(
    // before you send request with newInstance it will check content in below
    async (config) => {
      const accessToken = getLocalAccessToken();
      const decodedToken = jwt_decode(accessToken);
      console.log("decode:", decodedToken);
      let date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        console.log(
          "============================== reffesh token is exped (refresh token)=================================="
        );
        let data;
        try {
          data = await refreshToken();
        } catch (e) {
          window.localStorage.removeItem("accesstoken");
          window.localStorage.removeItem("refreshtoken");
          dispatch(loginReset());
          return config;
        }

        const refreshUser = {
          ...user,
          accesstoken: data.accesstoken,
          refreshtoken: data.refreshtoken,
        };
        dispatch(loginSuccess(refreshUser));
        // set tonken
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
