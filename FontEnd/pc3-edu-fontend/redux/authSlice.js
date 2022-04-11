import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", // name of reducer
  initialState: {
    // init state of reducer
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      errMessage: null,
    },
  },
  reducers: {
    // action creator
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      state.login.errMessage = null;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.errMessage = action.payload;
    },
    loginReset: (state) => {
      state.login.currentUser = null;
      state.login.isFetching = false;
      state.login.error = false;
      state.login.errMessage = null;
    },
  },
});
// action creator
export const { loginStart, loginSuccess, loginFailed, loginReset } =
  authSlice.actions;

// reducer
export default authSlice.reducer;
