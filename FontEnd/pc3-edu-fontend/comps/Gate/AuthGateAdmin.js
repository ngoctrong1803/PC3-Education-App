import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
const AuthGateAdmin = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isLoaded, setIsLoaded] = useState(false);

  // các biến truyền vào nhằm trước hợp token hết hạn sẽ refresh token
  useEffect(() => {
    console.log(user);
    if (!user?.userInfor?.role || user?.userInfor?.role !== "admin") {
      router.replace("/");
      toast.warning("Bạn không có quyền truy cập!");
      return;
    }
    setIsLoaded(true);
  }, []);
  if (!isLoaded) return null;
  return children;
};

export default AuthGateAdmin;
