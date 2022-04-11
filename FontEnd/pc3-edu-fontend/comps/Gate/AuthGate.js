import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axiosJWT from "../../helper/axiosJWT";

const AuthGate = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    //call api xác thực nếu xác thực thất bại sẽ redirect về home và thông báo lỗi
    // call api admim
    const token = window.localStorage.getItem("accesstoken");
    axiosJWT
      .get("http://localhost:8000/api/admin")
      .then((res) => {
        toast.success("chào mừng quản trị viên");
      })
      .catch((err) => {
        console.log("bị lỗi ở gọi api");
        console.log(err.message);
        toast.error("bạn không có quyền admin");
        router.push("/");
      });
  }, []);
  return children;
};

export default AuthGate;
