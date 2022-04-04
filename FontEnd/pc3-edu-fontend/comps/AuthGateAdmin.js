import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const AuthGate = ({ children }) => {
  const router = useRouter();
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  useEffect(() => {
    //call api xác thực nếu xác thực thất bại sẽ redirect về home và thông báo lỗi
    // call api admin
    const token = getCookie("token");

    axios
      .get("http://localhost:8000/api/admin", {
        headers: {
          accesstoken: "Bearer " + token,
          withCredentials: true,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("bị lỗi ở gọi api");
        console.log(err.message);
        //router.push("/");
        toast.error("bạn không có quyền admin");
      });

    // router.push("/");
    // toast.info("🦄 Wow so easy!", {
    //   position: "bottom-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }, []);
  return children;
};

export default AuthGate;
