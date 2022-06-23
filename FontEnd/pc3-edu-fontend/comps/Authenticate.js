import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../helper/axiosJWT";
import { loginSuccess } from "../redux/authSlice";

function Authenticate({ children }) {
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  // console.log("user redux : ", currentUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      axiosJWT
        .post("/api/auth/check-user")
        .then((res) => {
          setIsLoaded(true);
        })
        .catch((err) => {
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }

    // if (currentUser?.userInfor?._id) {
    //   setIsLoaded(true);
    //   return;
    // }
  }, []);
  if (!isLoaded) return null;

  return children;
}

export default Authenticate;
