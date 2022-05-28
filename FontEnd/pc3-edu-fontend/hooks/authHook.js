import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useAuth = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.login?.currentUser);
  useLayoutEffect(() => {
    if (!user?.userInfor?.role) {
      router.replace("/");
      toast.info("Vui lòng đăng nhập để tiếp tục!");
    }
  }, []);
  if (!user?.userInfor?.role) return false;
  return true;
};

export default useAuth;
