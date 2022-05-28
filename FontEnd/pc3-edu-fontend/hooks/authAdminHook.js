import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useAdminAuth = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isAdmin = user?.userInfor?.role === "admin";
  const isTeacher = user?.userInfor?.role === "teacher";
  const checkRole = isAdmin || isTeacher;
  useLayoutEffect(() => {
    if (!user?.userInfor?.role || !checkRole) {
      router.replace("/");
      toast.warning(
        "Chỉ quản trị viên hoặc giáo viên mới được truy cập vào trang này!"
      );
    }
  }, []);
  if (!user?.userInfor?.role || !checkRole) return false;
  return true;
};

export default useAdminAuth;
