import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = axios.post("http://localhost:8000/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("http://localhost:8000/");
  } catch (err) {
    dispatch(loginFailed());
  }
};
