// this file is handle all Call Api

import axios from "axios";
import { loginFailed, loginStart, loginSuccess, loginReset } from "./authSlice";

export const loginUser = async (user, dispatch, router) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    router.push("/");
  } catch (err) {
    const errMessage = err.response.data.message;
    dispatch(loginFailed(errMessage));
  }
};
export const loginResetFunc = async (dispatch) => {
  dispatch(loginReset());
};



