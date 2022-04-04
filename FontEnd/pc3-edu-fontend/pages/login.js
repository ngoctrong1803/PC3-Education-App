import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { loginUser } from "../redux/apiRequest";

const LOGIN_URL = "/login";
const Login = () => {
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const passRef = useRef();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    // const userLogin = {
    //   email: email,
    //   password: pass,
    // };
    // loginUser(userLogin);
    try {
      axios
        .post("http://localhost:8000/api/auth/login", {
          email: email,
          password: pass,
        })
        .then((res) => {
          toast.success("đăng nhập thành công");
          setCookie("accesstoken", res.data.accesstoken, 1);
          setCookie(
            "refreshtoken",
            res.data.refreshtoken,
            {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            },
            360
          );
          router.push("/");
        })
        .catch((err) => {
          console.log("xuống catch");
          const errMsg = err.response.data.message;
          toast.error(errMsg);
        });
    } catch (err) {
      console.log("catch bự");
      const errMsg = err.response.data.message;
      toast.error(errMsg);
    }
  };
  return (
    <div className="container-fluid background">
      <div className="login-wrap">
        <div className="col-md-4 row-container">
          <Form>
            <div className="text-center">
              <h3 className="fw-bold mt-4 mb-5">Đăng nhập</h3>
            </div>
            <div className="form-field">
              <input
                ref={emailRef}
                type="text"
                className="form-input"
                placeholder="Tài khoản"
                id="username"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              {emailErr != "" ? (
                <span style={{ color: "red" }}>{emailErr}</span>
              ) : null}
            </div>
            <div className="form-field">
              <input
                ref={passRef}
                type="password"
                className="form-input"
                placeholder="Mật khẩu"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                value={pass}
              />
              {passErr != "" ? (
                <span style={{ color: "red" }}>mật khẩu không đúng!</span>
              ) : null}
            </div>
            <div className="form-check d-flex align-items-center fs-7">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                id="rememberMe"
              />
              <label className="form-check-label ms-2">Lưu đăng nhập</label>
            </div>
            <div className="d-grid mt-4">
              <Button variant="primary" onClick={handleLogin}>
                Đăng nhập
              </Button>
            </div>
            <div className="text-center mt-4">
              <div className="fs-7">
                <span>Bạn chưa có tài khoản?</span>
                <a href="mailto:pc3@gmail.com" className="text-primary">
                  Đăng ký
                </a>
              </div>
              <hr />
              <div className="fs-8 mt-2">
                <a href="about.html">Giới thiệu về PC3</a>
                <span className="ms-1 me-1">|</span>
                <a href="about.html">PC3 trên Facebook</a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
Login.layout = "noLayout";
export default Login;
