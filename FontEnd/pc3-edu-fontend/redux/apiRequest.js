// this file is handle all Call Api

import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  loginReset,
  updateUser,
} from "./authSlice";

// handle login
export const loginUser = async (user, dispatch, router) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/auth/login", user);
    console.log("tài khoản đăng nhập:", res.data);
    dispatch(loginSuccess(res.data));
    router.push("/");
  } catch (err) {
    const errMessage = err.response.data.message;
    dispatch(loginFailed(errMessage));
  }
};
// handle logout
export const loginResetFunc = async (dispatch) => {
  dispatch(loginReset());
};
// handle update user
export const updateCurrentUser = async (dataUpdate, dispatch) => {
  dispatch(updateUser(dataUpdate));
};
