import { Form, Row, Button, Col, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const PASS_REGEX = /[a-z0-9]/;

const Create = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const roleRef = useRef();
  const addressRef = useRef();
  const errRef = useRef();
  const birthRef = useRef();
  const phoneRef = useRef();
  const studentClassRef = useRef();

  // message error
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [matchPasswordErr, setMatchPasswordErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [studentClassErr, setStudentClassErr] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);

  // validate user
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailForcus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordForcus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordForcus] = useState(false);

  const [role, setRole] = useState("");

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressForcus] = useState(false);

  const [birthday, setBirthday] = useState("");
  const [validBirthday, setValidBirthday] = useState(false);
  const [birthdayFocus, setBirthdayForcus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneForcus] = useState(false);

  const [studentClass, setStudentClass] = useState("");
  const [validStudentClass, setValidStudentClass] = useState(false);
  const [studentClassFocus, setStudentClassForcus] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // check validate email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log("email: ", email);
    console.log("email check:", result);
    setTimeout(() => {
      if (result) {
        setValidEmail(result);
      } else {
        setValidEmail(result);
      }
    }, 1000);
  }, [email]);

  // check validate password
  useEffect(() => {
    const result = PASS_REGEX.test(password);
    console.log("pass: ", password);
    console.log("check pass:", result);
    const match = password === matchPassword;
    console.log("match pass: ", matchPassword);
    console.log("check match pass:", match);
    if (result) {
      setTimeout(() => {
        setValidPassword(result);
      }, 1000);
      if (match) {
        setValidMatchPassword(match);
      } else {
        setValidMatchPassword(match);
      }
    } else {
      setValidPassword(result);
    }
  }, [password, matchPassword]);

  // hanle show error
  useEffect(() => {
    setErrorMsg("");
  }, [email, password, matchPassword]);

  // log data
  useEffect(() => {
    const data = {
      email: email,
      password: password,
      role: role,
      address: address,
      birthday: birthday,
      phone: phone,
      class: studentClass,
    };
    if (
      data.email != "" &&
      data.password != "" &&
      data.matchPassword != "" &&
      data.role != "" &&
      data.birthday != "" &&
      data.address != "" &&
      data.studentClass != "" &&
      data.phone != ""
    ) {
      setUserRegister(data);
    }
    console.log("data:", data);
  }, [
    email,
    password,
    matchPassword,
    role,
    birthday,
    address,
    studentClass,
    phone,
  ]);

  const [userRegister, setUserRegister] = useState({
    email: "",
    password: "",
    role: "",
    address: "",
    birthday: "",
    phone: "",
    class: "",
  });
  function handleRegister(e) {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e);
    // const formData = new FormData(e.target);
    // const formDataObj = Object.fromEntries(formData.entries());
    // console.log("submit form", formDataObj);
    console.log("handle submit");
    if (userRegister.email != "") {
      axios
        .post("http://localhost:8000/api/user/create", userRegister)
        .then((data) => {
          console.log("data off user register: ", data);
        })
        .catch((err) => console.log("err", err));
    }
    // fetch("http://localhost:8000/test")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log("err", err));
  }
  return (
    <div className="create-user-page">
      <div className="create-user-page-header">
        <div className="create-user-page-header-title">
          <span>Thêm mới người dùng</span>
        </div>
        <div className="create-user-page-header-button">
          <Button variant="outline-success">Excel mẫu</Button>
        </div>
      </div>
      <div className="create-user-page-content">
        <div className="create-user-page-content-add-file">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Thêm file Excel</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </div>
        <div className="create-user-page-content-add-form">
          <Form noValidate onSubmit={handleRegister}>
            <Row className="mb-3" xs={2} md={2} lg={2}>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label
                  style={{
                    display: "flex",
                    "align-items": "center",
                  }}
                >
                  Email{" "}
                  {validEmail ? (
                    <ion-icon
                      name="checkmark-circle-outline"
                      style={{ color: "green", margin: "5px" }}
                    ></ion-icon>
                  ) : null}
                </Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  placeholder="Tài khoản"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {emailErr !== "" ? <span>{emailErr}</span> : null}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label
                  style={{
                    display: "flex",
                    "align-items": "center",
                  }}
                >
                  Mật khẩu{" "}
                  {validPassword ? (
                    <ion-icon
                      name="checkmark-circle-outline"
                      style={{ color: "green", margin: "5px" }}
                    ></ion-icon>
                  ) : null}
                </Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" xs={2} md={2} lg={2}>
              <Form.Group as={Col} controlId="formGridRole">
                <Form.Label>Chức vụ</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value={"none"}> -- chọn chức vụ -- </option>
                  <option value={"admin"}>Quản trị viên</option>
                  <option value={"teacher"}>Giáo viên</option>
                  <option value={"student"}>Học sinh</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMatchPassword">
                <Form.Label
                  style={{
                    display: "flex",
                    "align-items": "center",
                  }}
                >
                  Nhập lại mật khẩu
                  {validMatchPassword ? (
                    <ion-icon
                      name="checkmark-circle-outline"
                      style={{ color: "green", margin: "5px" }}
                    ></ion-icon>
                  ) : null}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={matchPassword}
                  onChange={(e) => {
                    setMatchPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" xs={2} md={2} lg={2}>
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
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
                  placeholder="VD: 18/03/2000"
                  type="date"
                  value={birthday}
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
                  placeholder="VD: 12A1"
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Thêm mới
            </Button>
            <Button onClick={() => setShow(true)}>Show Toast</Button>
          </Form>
        </div>
      </div>
      <div className="toast-message">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header style={{ backgroundColor: "red", color: "#fff" }}>
            <strong className="me-auto">Thông báo!</strong>
            <small>0 phút</small>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "#fff", minHeight: "50px" }}>
            Lỗi ở chỗ nào đó rồi!
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

Create.layout = "adminLayout";
export default Create;
