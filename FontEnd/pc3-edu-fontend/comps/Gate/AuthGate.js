import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";

const AuthGate = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isLoaded, setIsLoaded] = useState(false);

  // các biến truyền vào nhằm trước hợp token hết hạn sẽ refresh token
  console.log("user gate", user);
  useEffect(() => {
    if (!user?.userInfor?.role) {
      router.replace("/");
      toast.info("Vui lòng đăng nhập để tiếp tục!");
      return <div></div>;
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded || !user?.userInfor?.role) return null;
  return children;
};

export const AuthGate2 = () => {
  router.replace("/");
  toast.error("Bạn không có quyền truy cập!");
  return <div></div>;
};

export default AuthGate;
