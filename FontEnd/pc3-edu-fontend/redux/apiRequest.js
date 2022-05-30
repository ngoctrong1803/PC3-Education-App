// this file is handle all Call Api

import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  loginReset,
  updateCurrentUser,
} from "./authSlice";

// handle login
export const loginUser = async (user, dispatch, router) => {
  const host = process.env.NEXT_PUBLIC_HOST;
  dispatch(loginStart());
  try {
    const res = await axios.post(host + "/api/auth/login", user);
    console.log("data of user login:", res.data);
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
export const updateCurrentUserFunc = async (dataUpdate, dispatch) => {
  dispatch(updateCurrentUser(dataUpdate));
};
