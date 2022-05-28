import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useTeacherAuth = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isAdmin = user?.userInfor?.role === "admin";
  const isTeacher = user?.userInfor?.role === "teacher";
  useLayoutEffect(() => {
    if (!user?.userInfor?.role || !isTeacher) {
      if (isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
      toast.warning("Chỉ giáo viên mới được truy cập trang này!");
    }
  }, []);
  if (!user?.userInfor?.role || !isTeacher) {
    console.log("không phải teacher");
    return false;
  }
  return true;
};

export default useTeacherAuth;
