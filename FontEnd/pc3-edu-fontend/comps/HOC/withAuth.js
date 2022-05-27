import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
import { store } from "../../redux/store";
import { AuthGate2 } from "../Gate/AuthGate";

const withAuth = (children) => {
  //   const router = useRouter();
  //   const user = useSelector((state) => state.auth.login?.currentUser);
  //   const [isLoaded, setIsLoaded] = useState(false);

  // các biến truyền vào nhằm trước hợp token hết hạn sẽ refresh token
  // console.log("user gate", store);
  const { getState, dispatch } = store;
  const stateRoot = getState();
  const user = stateRoot?.auth?.login?.currentUser;
  console.log("user: -------------------------------------", user);

  if (!user?.userInfor?._id) {
    return AuthGate2;
  }

  return children;
};

export default withAuth;
