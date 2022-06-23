import { Form, Row, Button, Col, Toast, Table } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../redux/authSlice";
import useTeacherAuth from "../../../../hooks/authTeacherHook";

const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const PASS_REGEX = /[a-z0-9]/;
const PHONE_REGEX =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

const UserDetail = () => {
  const isTeacher = useTeacherAuth();
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const userID = arrayTemp[position];
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const [userInfor, setUserInfor] = useState({});

  const emailRef = useRef();
  const passRef = useRef();
  const roleRef = useRef();
  const addressRef = useRef();
  const errRef = useRef();
  const birthRef = useRef();
  const phoneRef = useRef();
  const studentClassRef = useRef();

  // message error
  const [fullnameErr, setFullnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [roleErr, setRoleErr] = useState("");
  const [matchPasswordErr, setMatchPasswordErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [studentClassErr, setStudentClassErr] = useState("");

  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  const [showMessageError, setShowMessageError] = useState(false);

  // validate user
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  // validate user
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [listRole, setListRole] = useState([]);
  async function getListRole() {
    try {
      const res = await axiosJWT.get("/api/role/list");
      setListRole(res.data.listRole);
    } catch (err) {
      const errMsg = err.response.data.message;
      console.log("err: ", err.response.data.message);
    }
  }
  async function getUserByID() {
    try {
      const res = await axiosJWT.get("/api/user/get-user-by-id/" + userID);
      console.log("user infor", res.data.user);
      setUserInfor(res.data.user);
    } catch (err) {
      toast.error("không tồn tại người dùng");
      router.push("/admin/users");
    }
  }

  useEffect(() => {
    if (isTeacher) {
      getListRole();
      getUserByID();
    }
  }, []);
  useEffect(() => {
    if (isTeacher) {
      setFullname(userInfor.fullname);
      setEmail(userInfor.email);
      setRole(userInfor.role);
      setAddress(userInfor.address);
      setPhone(userInfor.phone);
      setBirthday(userInfor.birthday);
      setStudentClass(userInfor.class);
    }
  }, [userInfor]);

  return (
    <div className="create-user-page pt-4">
      <div className="create-user-page-header">
        <div className="create-user-page-header-title">
          <span>Thông tin người dùng</span>
        </div>
        <div className="create-user-page-header-button">
          <Button
            variant="outline-warning"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              window.history.back();
            }}
          >
            Quay lại
          </Button>
        </div>
      </div>
      <div
        className="create-user-page-content"
        style={{
          borderRadius: "15px",
          padding: "15px",
          backgroundColor: "#f2f5fa",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="create-user-page-content-add-form">
          <>
            <div
              className="d-flex flex flex-column justify-content-center align-items-center p-3"
              style={{
                backgroundImage: "url('/background/background-avatar2.jpg')",
                backgroundPosition: "center" /* Center the image */,
                backgroundRepeat: "no-repeat" /* Do not repeat the image */,
                backgroundSize: "cover",
                borderRadius: "15px",
              }}
            >
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  border: "solid #1493fe 4px",
                  objectFit: "cover",
                }}
                src={userInfor.avatar}
              ></img>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#1493fe",
                }}
              >
                {userInfor.fullname}
              </span>
            </div>
            <Form noValidate className="mt-4">
              <Row className="mb-3" xs={2} md={2} lg={2}>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label
                    style={{
                      display: "flex",
                      "align-items": "center",
                    }}
                  >
                    Email{" "}
                  </Form.Label>
                  <Form.Control
                    disabled
                    type="email"
                    placeholder="Tài khoản"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>Chức vụ</Form.Label>
                  <Form.Select
                    disabled
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    value={role}
                  >
                    <option value={"none"}> -- chọn chức vụ -- </option>
                    {listRole.map((roleItem, index) => {
                      return (
                        <>
                          <option value={roleItem.roleName}>
                            {roleItem.description}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                  {roleErr !== "" ? <span>{roleErr}</span> : null}
                </Form.Group>
              </Row>

              <Row className="mb-3" xs={2} md={2} lg={2}>
                <Form.Group className="mb-3" controlId="formGridAddress">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    disabled
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="VD: 191 Hoàng diệu 2"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridBirthday">
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control
                    disabled
                    placeholder="VD: 18/03/2000"
                    value={
                      new Date(birthday).getDate() +
                      "/" +
                      new Date(birthday).getMonth() +
                      "/" +
                      new Date(birthday).getFullYear()
                    }
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3" xs={2} md={2} lg={2}>
                <Form.Group className="mb-3" controlId="formGridPhone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    disabled
                    placeholder="VD: 0358489850"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridStudentClass">
                  <Form.Label>Lớp học hiện tại</Form.Label>
                  <Form.Control
                    disabled
                    placeholder="VD: 12A1"
                    value={studentClass}
                    onChange={(e) => {
                      setStudentClass(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
            </Form>
          </>
        </div>
      </div>
      <div className="toast-message">
        <Toast
          onClose={() => setShowMessageSuccess(false)}
          show={showMessageSuccess}
          delay={3000}
          autohide
        >
          <Toast.Header
            style={{
              backgroundColor: "rgba(100, 212, 25, 0.75)",
              color: "#fff",
            }}
          >
            <strong className="me-auto">Thông báo!</strong>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "#fff", minHeight: "50px" }}>
            {messageSuccess ? messageSuccess : null}
          </Toast.Body>
        </Toast>
      </div>
      <div className="toast-message">
        <Toast
          onClose={() => setShowMessageError(false)}
          show={showMessageError}
          delay={3000}
          autohide
        >
          <Toast.Header
            style={{
              backgroundColor: "rgba(225, 15, 15, 0.75)",
              color: "#fff",
            }}
          >
            <strong className="me-auto">Thông báo!</strong>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "#fff", minHeight: "50px" }}>
            {messageError ? messageError : null}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

UserDetail.layout = "adminLayout";
export default UserDetail;
