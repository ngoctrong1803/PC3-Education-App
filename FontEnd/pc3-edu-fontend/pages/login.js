import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { loginUser, loginResetFunc } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LOGIN_URL = "/login";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passRef = useRef();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const loginResponse = useSelector((state) => {
    return state.auth.login;
  });

  useEffect(() => {
    if (loginResponse.currentUser) {
      const accessToken = loginResponse.currentUser.accesstoken;
      const refreshToken = loginResponse.currentUser.refreshtoken;
      window.localStorage.setItem("accesstoken", accessToken);
      window.localStorage.setItem("refreshtoken", refreshToken);
      toast.success("đăng nhập thành công");
    }
    if (!loginResponse?.currentUser) {
      if (loginResponse.error) {
        toast.error(loginResponse.errMessage);
        loginResetFunc(dispatch);
      }
    }
  }, [loginResponse]);

  const handleLogin = async (e) => {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    const userLogin = {
      email: email,
      password: pass,
    };
    loginUser(userLogin, dispatch, router);
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
