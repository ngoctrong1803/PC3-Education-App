import { Form, Row, Button, Col, Toast, Table } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../helper/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
import useTeacherAuth from "../../../hooks/authTeacherHook";

const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const PASS_REGEX = /[a-z0-9]{8,32}/;
const PHONE_REGEX =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

const Create = () => {
  const isTeacher = useTeacherAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
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
  const [listUser, setListUser] = useState([]);
  async function getListUser() {
    try {
      const res = await axiosJWT.get("/api/user/list-user");
      setListUser(res.data.listUser);
      console.log("list user:", res.data.listUser);
    } catch (err) {
      const errMsg = err.response.data.message;
      console.log("err: ", err.response.data.message);
    }
  }

  useEffect(() => {
    if (isTeacher) {
      getListRole();
      getListUser();
    }
  }, []);
  // check validate email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setTimeout(() => {
      if (result) {
        setValidEmail(result);
      } else {
        setValidEmail(result);
      }
    }, 1000);
  }, [email]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setTimeout(() => {
      if (result) {
        setValidPhone(result);
      } else {
        setValidPhone(result);
      }
    }, 1000);
  }, [phone]);

  // check validate password
  useEffect(() => {
    const result = PASS_REGEX.test(password);
    const match = password === matchPassword;
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
      avatar: "/user/default-avatar.png",
    };

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
      validPhone == true &&
      data.password == matchPassword &&
      data.class != ""
    ) {
      //set data
      setUserRegister(data);
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
      setFullnameErr("Vui l??ng nh???p H??? v?? t??n");
    } else {
      setFullnameErr("");
    }
    if (email == "") {
      setEmailErr("Vui l??ng nh???p email");
      console.log("2");
    } else if (validEmail == false) {
      setEmailErr("Email kh??ng h???p l???");
    } else {
      setEmailErr("");
    }
    if (password == "") {
      setPasswordErr("Vui l??ng nh???p m???t kh???u");
    } else {
      setPasswordErr("");
    }
    if (role == "" || role == "none") {
      setRoleErr("Vui l??ng ch???n ch???c v???");
    } else {
      setRoleErr("");
    }
    if (address == "") {
      setAddressErr("Vui l??ng nh???p ?????a ch???");
    } else {
      setAddressErr("");
    }
    if (birthday == "") {
      setBirthdayErr("Vui l??ng nh???p ng??y th??ng n??m sinh");
    } else {
      setBirthdayErr("");
    }
    if (studentClass == "") {
      setStudentClassErr(
        "Vui l??ng nh???p l???p h???c (L???p ch??? nhi???m ?????i v???i gi??o vi??n, L???p h???c ?????i v???i h???c sinh)"
      );
    } else {
      setStudentClassErr("");
    }
    if (phone == "") {
      setPhoneErr("Vui l??ng nh???p s??? ??i???n tho???i!");
    } else {
      setPhoneErr("");
    }
    if (validPhone == false) {
      setPhoneErr("S??? ??i???n tho???i bao g???m 10 s???");
    } else {
      setPhoneErr("");
    }
    if (password !== matchPassword) {
      setMatchPasswordErr("M???t kh???u kh??ng kh???p");
    } else {
      setMatchPasswordErr("");
    }
    if (userRegister.email != "") {
      axiosJWT
        .post("/api/auth/create", userRegister)
        .then((res) => {
          toast.success("Th??m m???i th??nh c??ng");
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          setMessageError(errMsg);
          setShowMessageError(true);
        });
    }
  }
  // handle upload excel to create user
  function checkLeapYear(year) {
    if (Number(year) % 400 == 0) return true;
    if (Number(year) % 4 == 0 && Number(year) % 100 != 0) return true;
    return false;
  }
  function checkDate(dateString) {
    var dateParts = dateString.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    if (!Number.isInteger(Number(year)) || Number(year) < 0) {
      return false;
    }
    if (
      !Number.isInteger(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      return false;
    }
    if (!Number.isInteger(Number(day)) || Number(day) < 1 || Number(day) > 31) {
      return false;
    } else {
      var month30 = [4, 6, 9, 11];
      if (month30.indexOf(Number(month)) != -1) {
        // if month have 30 day
        if (Number(day) > 30) {
          return false;
        }
      } else if (Number(month) == 2) {
        if (!checkLeapYear(year)) {
          if (Number(day) > 28) {
            return false;
          }
        } else {
          if (Number(day) > 29) {
            return false;
          }
        }
      }
    }
    return true;
  }
  const [importExcel, setImportExcel] = useState(false);
  const [listUserValid, setListUserValid] = useState([]);
  const [listUserInvalid, setListUserInvalid] = useState([]);
  const [listUserExist, setListUserExist] = useState([]);
  const uploadFile = useRef();

  async function readExcel(e) {
    e.preventDefault();
    const reader = new FileReader();
    const fileName = e.target.files[0].name;
    const arrayTemp = fileName.split(".");
    const extend = arrayTemp[arrayTemp.length - 1];
    if (extend == "xlsx") {
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        console.log("work book:", workbook);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        json.shift(); // remove example (json[0])
        const userArray = json;
        const userArrayValid = [];
        const userExist = [];
        const userArrayInvalid = [];

        //handle user in excel
        if (userArray != 0) {
          userArray.map((userItem, index) => {
            let check = true;
            let temp = -1;
            var dateParts = userItem.birthday.split("/");
            const day = dateParts[0];
            const month = dateParts[1];
            const year = dateParts[2];
            const dataToPush = {
              fullname: userItem?.fullname ?? "",
              email: userItem?.email == undefined ? "" : userItem?.email,
              address: userItem?.address == undefined ? "" : userItem?.address,
              birthday:
                userItem?.birthday == undefined
                  ? ""
                  : year + "-" + month + "-" + day,
              phone: userItem?.phone == undefined ? "" : "" + userItem?.phone,
              class: userItem?.class ?? "",
              password: userItem?.phone ?? "",
              role:
                listRole.map((roleItem, index) => {
                  if (roleItem.description == userItem.role) {
                    temp = index;
                    return roleItem.roleName;
                  }
                })[temp] ?? "",
            };
            console.log("data to push:", dataToPush);
            console.log("list user:", listUser);
            listUser.map((userItem, index) => {
              if (
                dataToPush.email == userItem.email ||
                dataToPush.phone == userItem.phone
              ) {
                check = false;
              }
            });

            if (
              dataToPush.fullname != "" &&
              dataToPush.email != "" &&
              dataToPush.role != "" &&
              dataToPush.address != "" &&
              dataToPush.birthday != "" &&
              checkDate(dataToPush.birthday) &&
              dataToPush.phone != "" &&
              dataToPush.class != "" &&
              EMAIL_REGEX.test(dataToPush.email) &&
              PHONE_REGEX.test(dataToPush.phone) &&
              check == true
            ) {
              userArrayValid.push(dataToPush);
            } else if (
              dataToPush.fullname != "" &&
              dataToPush.email != "" &&
              dataToPush.role != "" &&
              dataToPush.address != "" &&
              dataToPush.birthday != "" &&
              checkDate(dataToPush.birthday) &&
              dataToPush.phone != "" &&
              EMAIL_REGEX.test(dataToPush.email) &&
              PHONE_REGEX.test(dataToPush.phone) &&
              dataToPush.class != "" &&
              check == false
            ) {
              userExist.push(dataToPush);
            } else {
              userArrayInvalid.push(dataToPush);
            }
          });
          if (userArrayValid.length == 0) {
            uploadFile.current.value = "";
          }
          console.log("user valid:", userArrayValid);
          console.log("user invalid", userArrayInvalid);
          console.log("user exist", userExist);
          setListUserValid(userArrayValid);
          setListUserInvalid(userArrayInvalid);
          setListUserExist(userExist);
          setImportExcel(true);
        } else {
          toast.error("File r???ng vui l??ng ki???m tra l???i!");
          uploadFile.current.value = "";
        }
      };
    } else {
      toast.error("File kh??ng ????ng ?????nh d???ng!");
      uploadFile.current.value = "";
    }
  }

  async function handleUploadUsers() {
    if (listUserValid.length != 0) {
      let counter = 0;
      let checkError = false;
      for (let i = 0; i < listUserValid.length; i++) {
        try {
          const res = await axiosJWT.post("/api/user/create", listUserValid[i]);
          counter++;
        } catch (err) {
          checkError = true;
        }
      }
      if (counter > 0) {
        toast.success("Th??m m???i ng?????i d??ng th??nh c??ng");
      }
      if (checkError) {
        toast.warning(
          "???? c?? th??ng tin s??? ??i???n tho???i ho???c email ng?????i d??ng b??? tr??ng l???p trong file excel. C??u ng?????i d??ng tr??ng l???p th??ng tin ch??? ???????c th??m ???????c ng?????i ?????u ti??n"
        );
      }
    } else {
      toast.error("Danh s??ch c??c c??u h???i h???p l??? r???ng!");
    }
  }

  return (
    <div className="create-user-page">
      <div className="create-user-page-header">
        <div className="create-user-page-header-title">
          <span>Th??m m???i ng?????i d??ng</span>
        </div>
        <div className="create-user-page-header-button">
          <a href="/Excel/Users.xlsx" download>
            <Button variant="outline-success">Excel m???u</Button>
          </a>
          <Button
            variant="outline-warning"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              window.history.back();
            }}
          >
            Quay l???i
          </Button>
        </div>
      </div>
      <div className="create-user-page-content">
        <div className="create-user-page-content-add-file">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Th??m file Excel</Form.Label>
            <Form.Control
              type="file"
              ref={uploadFile}
              onChange={(e) => {
                readExcel(e);
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
                      H??? v?? t??n
                    </Form.Label>
                    <Form.Control
                      ref={emailRef}
                      type="text"
                      placeholder="VD: Nguy???n V??n A"
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
                      placeholder="T??i kho???n"
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
                      M???t kh???u{" "}
                      {validPassword ? (
                        <ion-icon
                          name="checkmark-circle-outline"
                          style={{ color: "green", margin: "5px" }}
                        ></ion-icon>
                      ) : null}
                    </Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="M???t kh???u"
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
                    <Form.Label>Ch???c v???</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option value={"none"}> -- ch???n ch???c v??? -- </option>
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
                  <Form.Group as={Col} controlId="formGridMatchPassword">
                    <Form.Label
                      style={{
                        display: "flex",
                        "align-items": "center",
                      }}
                    >
                      Nh???p l???i m???t kh???u
                      {validMatchPassword ? (
                        <ion-icon
                          name="checkmark-circle-outline"
                          style={{ color: "green", margin: "5px" }}
                        ></ion-icon>
                      ) : null}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nh???p l???i m???t kh???u"
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
                    <Form.Label>?????a ch???</Form.Label>
                    <Form.Control
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      placeholder="VD: 191 Ho??ng di???u 2"
                    />
                    {addressErr !== "" ? <span>{addressErr}</span> : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridBirthday">
                    <Form.Label>Ng??y sinh</Form.Label>
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
                    <Form.Label>S??? ??i???n tho???i</Form.Label>
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
                    <Form.Label>L???p h???c hi???n t???i</Form.Label>
                    <Form.Control
                      placeholder="VD: 12A1"
                      value={studentClass}
                      onChange={(e) => {
                        setStudentClass(e.target.value);
                      }}
                    />
                    {studentClassErr !== "" ? (
                      <span>{studentClassErr}</span>
                    ) : null}
                  </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                  Th??m m???i
                </Button>
                {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
              </Form>
            </>
          ) : null}
          {importExcel ? (
            <>
              {/* table in here */}
              <h5 style={{ color: "#198754" }}>
                Danh s??ch ng?????i d??ng h???i h???p l???
              </h5>
              <Table striped bordered hover className="valid-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>H??? v?? t??n</th>
                    <th>Email</th>
                    <th>Ch???c v???</th>
                    <th>?????a ch???</th>
                    <th>Ng??y sinh</th>
                    <th>S??? ??i???n tho???i</th>
                    <th>L???p</th>
                    <th>Ch???c n??ng</th>
                  </tr>
                </thead>
                <tbody>
                  {listUserValid.map((userItem, index) => {
                    return (
                      <>
                        {" "}
                        <tr>
                          <td>{index + 1}</td>
                          <td>{userItem.fullname}</td>
                          <td>{userItem.email}</td>
                          <td>
                            {listRole.map((roleItem, index) => {
                              if (roleItem.roleName == userItem.role) {
                                return <>{roleItem.description}</>;
                              }
                            })}
                          </td>
                          <td>{userItem.address}</td>
                          <td>{userItem.birthday}</td>
                          <td>{userItem.phone}</td>
                          <td>{userItem.class}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => {
                                const newList = listUserValid;
                                newList.splice(index, 1);
                                setListUserValid([...newList]);
                              }}
                            >
                              X??a
                            </Button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
              <div className="btn-upload-excel">
                <Button
                  style={{ marginRight: "5px" }}
                  variant="secondary"
                  onClick={() => {
                    setImportExcel(false);
                    uploadFile.current.value = "";
                  }}
                >
                  H???y b???
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    handleUploadUsers();
                  }}
                >
                  T???i l??n
                </Button>
              </div>
              <h5 style={{ color: "#dc3545" }}>
                Danh s??ch ng?????i d??ng ???? t???n t???i
                <span style={{ fontSize: "16px", color: "#dc3545" }}>
                  (Email ho???c s??? ??i???n tho???i ???? ???????c ????ng k??)
                </span>
              </h5>
              <Table striped bordered hover className="invalid-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>H??? v?? t??n</th>
                    <th>Email</th>
                    <th>Ch???c v???</th>
                    <th>?????a ch???</th>
                    <th>Ng??y sinh</th>
                    <th>S??? ??i???n tho???i</th>
                    <th>L???p</th>
                  </tr>
                </thead>
                <tbody>
                  {listUserExist.map((userItem, index) => {
                    return (
                      <>
                        {" "}
                        <tr>
                          <td>{index + 1}</td>
                          <td>{userItem.fullname}</td>
                          <td>{userItem.email}</td>
                          <td>
                            {listRole.map((roleItem, index) => {
                              if (roleItem.roleName == userItem.role) {
                                return <>{roleItem.description}</>;
                              }
                            })}
                          </td>
                          <td>{userItem.address}</td>
                          <td>{userItem.birthday}</td>
                          <td>{userItem.phone}</td>
                          <td>{userItem.class}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
              <h5 style={{ color: "#dc3545" }}>
                Danh s??ch ng?????i d??ng kh??ng h???p l???
              </h5>
              <Table striped bordered hover className="invalid-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>H??? v?? t??n</th>
                    <th>Email</th>
                    <th>Ch???c v???</th>
                    <th>?????a ch???</th>
                    <th>Ng??y sinh</th>
                    <th>S??? ??i???n tho???i</th>
                    <th>L???p</th>
                  </tr>
                </thead>
                <tbody>
                  {listUserInvalid.map((userItem, index) => {
                    return (
                      <>
                        {" "}
                        <tr>
                          <td>{index + 1}</td>
                          <td>{userItem.fullname}</td>
                          <td>{userItem.email}</td>
                          <td>
                            {listRole.map((roleItem, index) => {
                              if (roleItem.roleName == userItem.role) {
                                return <>{roleItem.description}</>;
                              }
                            })}
                          </td>
                          <td>{userItem.address}</td>
                          <td>{userItem.birthday}</td>
                          <td>{userItem.phone}</td>
                          <td>{userItem.class}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </>
          ) : null}
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
            <strong className="me-auto">Th??ng b??o!</strong>
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
            <strong className="me-auto">Th??ng b??o!</strong>
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
