import { Form, Row, Button, Col, Toast } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

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
  const [emailFocus, setEmailForcus] = useState(false);

  // validate user
  const [fullname, setFullname] = useState("");
  const [validFullname, setValidFullname] = useState(false);
  const [fullnameFocus, setFullnameForcus] = useState(false);

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

  // init userRegister
  const [userRegister, setUserRegister] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    address: "",
    birthday: "",
    phone: "",
    class: "",
  });

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

  // check and set data for register
  useEffect(() => {
    // data for register
    const data = {
      fullname: fullname,
      email: email,
      password: password,
      role: role,
      address: address,
      birthday: birthday,
      phone: phone,
      class: studentClass,
    };
    console.log("data for register:", data);
    // check data
    if (
      data.fullname != "" &&
      validEmail == true &&
      validPassword == true &&
      data.role != "" &&
      data.role != "none" &&
      data.birthday != "" &&
      data.address != "" &&
      data.studentClass != "" &&
      data.phone != "" &&
      data.password == matchPassword
    ) {
      //set data
      setUserRegister(data);
      console.log("data register is valid");
    }
  }, [
    fullname,
    email,
    password,
    role,
    birthday,
    address,
    studentClass,
    phone,
    matchPassword,
  ]);

  function handleRegister(e) {
    e.preventDefault();
    e.stopPropagation();
    // show errer message
    if (fullname == "") {
      console.log("1");
      setFullnameErr("Vui lòng nhập Họ và tên");
    } else {
      setFullnameErr("");
    }
    if (email == "") {
      setEmailErr("Vui lòng nhập email");
      console.log("2");
    } else if (validEmail == false) {
      setEmailErr("Email không hợp lệ");
    } else {
      setEmailErr("");
    }
    if (password == "") {
      setPasswordErr("Vui lòng nhập mật khẩu");
    } else {
      setPasswordErr("");
    }
    if (role == "" || role == "none") {
      setRoleErr("Vui lòng chọn chức vụ");
    } else {
      setRoleErr("");
    }
    if (address == "") {
      setAddressErr("Vui lòng nhập địa chỉ");
    } else {
      setAddressErr("");
    }
    if (birthday == "") {
      setBirthdayErr("Vui lòng nhập ngày tháng năm sinh");
    } else {
      setBirthdayErr("");
    }
    if (phone == "") {
      setPhoneErr("Vui lòng nhập số điện thoại");
    } else {
      setPhoneErr("");
    }
    if (password !== matchPassword) {
      setMatchPasswordErr("Mật khẩu không khớp");
    } else {
      setMatchPasswordErr("");
    }
    if (userRegister.email != "") {
      axios
        .post("http://localhost:8000/api/auth/create", userRegister)
        .then((res) => {
          // setMessageSuccess("Thêm mới thành công");
          // setShowMessageSuccess(true);
          toast.success("Thêm mới thành công");
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          setMessageError(errMsg);
          setShowMessageError(true);
          console.log("err: ", err.response.data.message);
        });
    }
  }
  // handle upload excel to create user
  const [importExcel, setImportExcel] = useState(false);
  const uploadFile = useRef();

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
            <Form.Control
              type="file"
              ref={uploadFile}
              onChange={(e) => {
                //readExcel(e);
                setImportExcel(true);
              }}
            />
          </Form.Group>
        </div>
        <div className="create-user-page-content-add-form">
          {!importExcel ? (
            <>
              {" "}
              <Form noValidate onSubmit={handleRegister}>
                <Row className="mb-3" xs={2} md={2} lg={2}>
                  <Form.Group as={Col} controlId="formGridFullName">
                    <Form.Label
                      style={{
                        display: "flex",
                        "align-items": "center",
                      }}
                    >
                      Họ và tên
                    </Form.Label>
                    <Form.Control
                      ref={emailRef}
                      type="text"
                      placeholder="VD: Nguyễn Văn A"
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                    />
                    {fullnameErr !== "" ? <span>{fullnameErr}</span> : null}
                  </Form.Group>
                </Row>
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
                    {passwordErr !== "" ? <span>{passwordErr}</span> : null}
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
                    {roleErr !== "" ? <span>{roleErr}</span> : null}
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
                    {matchPasswordErr !== "" ? (
                      <span>{matchPasswordErr}</span>
                    ) : null}
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
                    {addressErr !== "" ? <span>{addressErr}</span> : null}
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
                    {birthdayErr !== "" ? <span>{birthdayErr}</span> : null}
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
                    {phoneErr !== "" ? <span>{phoneErr}</span> : null}
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
                {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
              </Form>
            </>
          ) : null}
          {importExcel ? <></> : null}
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

Create.layout = "adminLayout";
export default Create;
