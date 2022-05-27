import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Accordion, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateCurrentUserFunc } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/authHook";
const UserInfor = () => {
  const isAuth = useAuth();
  const PASS_REGEX = /[a-z0-9]{8,32}/;
  const PHONE_REGEX =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  const [changePassword, setChangePassword] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const inputUploadRef = useRef();
  const [imageSelected, setImageSelected] = useState();
  const [avatarUpdateURL, setAvatarUpdateURL] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const instance = axios.create();

  async function uploadImage() {
    try {
      const formData = new FormData();
      formData.append("file", imageSelected[0]);
      formData.append("upload_preset", "pc3_image");
      setIsUpload(true);
      const res = await instance.post(
        "https://api.cloudinary.com/v1_1/dwjhsgpt7/image/upload",
        formData
      );
      // url from clouldinary
      setAvatarUpdateURL(res.data.url);
      // update avatar in database
      await axios.put(
        "http://localhost:8000/api/user/update-avatar/" +
          currentUser.userInfor._id,
        {
          imageurl: res.data.url,
        }
      );

      setIsUpload(false);

      const updateCurrentUser = {
        userInfor: {
          _id: currentUser.userInfor._id,
          email: currentUser.userInfor.email,
          fullname: currentUser.userInfor.fullname,
          role: currentUser.userInfor.role,
          avatar: res.data.url, // change avatar
          class: currentUser.userInfor.class,
          birthday: currentUser.userInfor.birthday,
          address: currentUser.userInfor.address,
          phone: currentUser.userInfor.phone,
        },
        accesstoken: currentUser.accesstoken,
        refreshtoken: currentUser.refreshtoken,
      };
      // handle change in redux
      updateCurrentUserFunc(updateCurrentUser, dispatch);
      toast.success("Cập nhật avatar thành công");
    } catch (error) {
      toast.error("Lỗi tải file!");
    }
  }
  //handle change user infro
  const [userAddress, setUserAddress] = useState("");
  const [userClass, setUserClass] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [userPassword, setUserPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);

  // set data
  useEffect(() => {
    if (isAuth) {
      setUserAddress(currentUser.userInfor.address);
      setUserClass(currentUser.userInfor.class);
      setUserPhone(currentUser.userInfor.phone);
    }
  }, []);
  async function handleUploadUserInfor() {
    if (
      currentUser.userInfor.address == userAddress &&
      currentUser.userInfor.class == userClass &&
      currentUser.userInfor.phone == userPhone
    ) {
      toast.warning("Thông tin không có sự thay đổi");
    } else if (
      currentUser.userInfor.address == "" ||
      currentUser.userInfor.class == "" ||
      currentUser.userInfor.phone == ""
    ) {
      toast.error("Thông tin người dùng không được để trống");
    } else {
      if (PHONE_REGEX.test(userPhone)) {
        try {
          const dataToSend = {
            userAddress: userAddress,
            userClass: userClass,
            userPhone: userPhone,
          };
          const res = await axios.put(
            "http://localhost:8000/api/user/update-infor/" +
              currentUser?.userInfor?._id,
            dataToSend
          );
          const dataFormServer = res.data.userUpdate;
          console.log("data from server", dataFormServer);
          const updateCurrentUser = {
            userInfor: {
              _id: dataFormServer._id,
              email: dataFormServer.email,
              fullname: dataFormServer.fullname,
              role: dataFormServer.role,
              avatar: dataFormServer.avatar, // change avatar
              class: dataFormServer.class,
              birthday: dataFormServer.birthday,
              address: dataFormServer.address,
              phone: dataFormServer.phone,
            },
            accesstoken: currentUser.accesstoken,
            refreshtoken: currentUser.refreshtoken,
          };
          // handle change in redux
          updateCurrentUserFunc(updateCurrentUser, dispatch);
          toast.success("Cập nhật thông tin thành công");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Số điện thoại không đúng định dạng");
      }
    }
  }
  async function handleChangePassword() {
    if (userPassword == "") {
      toast.error("Vui lòng nhập mật khẩu cũ!");
      return;
    }
    if (newPassword == "") {
      toast.error("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (confirmNewPassword == "") {
      toast.error("Vui lòng nhập lại mật khẩu mới");
      return;
    }
    if (confirmNewPassword != newPassword) {
      toast.error("Mật khẩu mới không khớp");
      return;
    }
    if (!PASS_REGEX.test(newPassword)) {
      toast.error("Mật khẩu là chữ hoặc số từ 8 đến 32 ký tự");
      return;
    }
    if (confirmNewPassword == newPassword) {
      try {
        const dataToSend = {
          currentPassword: userPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        };
        console.log("vào try catch");
        const res = await axios.put(
          "http://localhost:8000/api/user/change-password/" +
            currentUser.userInfor._id,
          dataToSend
        );
        toast.success("Đổi mật khẩu thành công!");
        setUserPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (error) {
        const errMessage = error.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  if (!isAuth) return null;

  return (
    <>
      <Head>
        <title>Thông tin cá nhân</title>
      </Head>
      <div className="user-infor-page">
        <div className="d-flex justify-content-between mb-2">
          <h3>Thông tin cá nhân</h3>
          <Button
            variant="outline-warning"
            onClick={() => {
              window.history.back();
            }}
          >
            Quay lại
          </Button>
        </div>

        <div className="user-infor-wrap ">
          <Row>
            <Col md={0} xs={0} lg={3} className="user-avatar-wrap">
              <div className="user-avatar">
                {avatarUpdateURL == "" ? (
                  <>
                    <img
                      style={{
                        boxShadow: "0 0.2rem 0.3rem rgba(20, 30, 40, 0.95)",
                        objectFit: "cover",
                      }}
                      src={`${currentUser?.userInfor?.avatar}`}
                      className="mb-0"
                    ></img>
                  </>
                ) : (
                  <>
                    <img src={avatarUpdateURL} className="mb-0"></img>
                  </>
                )}
                {isUpload ? (
                  <div>
                    <Spinner animation="grow" variant="primary" size="sm" />
                    <Spinner animation="grow" variant="primary" size="sm" />
                    <Spinner animation="grow" variant="primary" size="sm" />
                  </div>
                ) : null}

                <h5 className="mt-2 mb-3">Trương Ngọc Trọng</h5>
                <Accordion
                  defaultActiveKey=""
                  className="input-file-upload-image"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="upload-image-header">
                      <span
                        style={{
                          fontSize: "15px",
                          backgroundColor: "rgba(39, 228, 245, 0.023)",
                        }}
                      >
                        Cập nhật avatar
                      </span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ backgroundColor: "rgba(39, 228, 245, 0.123)" }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Control
                            ref={inputUploadRef}
                            type="file"
                            style={{
                              fontSize: "15px",
                              backgroundColor: "rgba(39, 228, 245, 0.023)",
                            }}
                            onChange={(e) => {
                              setImageSelected(e.target.files);
                            }}
                          />
                        </Form.Group>
                        <Button
                          style={{
                            fontSize: "15px",
                          }}
                          onClick={() => {
                            uploadImage();
                          }}
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
            {!changePassword ? (
              <Col md={9} xs={9} lg={9}>
                <div className="user-infor pt-4">
                  <Form>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>
                        Họ và tên{" "}
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          (*)
                        </span>
                      </Form.Label>
                      <Form.Control
                        placeholder="Trương Ngọc Trọng"
                        value={currentUser?.userInfor?.fullname}
                        disabled
                      />
                    </Form.Group>
                    <Row className="mb-3">
                      {/* email in here */}
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Email{" "}
                          <span
                            style={{
                              color: "red",
                              fontWeight: "600",
                            }}
                          >
                            (*)
                          </span>
                        </Form.Label>
                        <Form.Control
                          value={currentUser?.userInfor?.email}
                          type="email"
                          placeholder="ngoctrong1412@gmail.com"
                          disabled
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>
                          Ngày sinh{" "}
                          <span
                            style={{
                              color: "red",
                              fontWeight: "600",
                            }}
                          >
                            (*)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          disabled
                          // value={"2014-02-09"}
                          value={`${new Date(
                            currentUser?.userInfor?.birthday
                          ).getFullYear()}-${
                            new Date(
                              currentUser?.userInfor?.birthday
                            ).getMonth() +
                              1 >
                            9
                              ? new Date(
                                  currentUser?.userInfor?.birthday
                                ).getMonth() + 1
                              : "0" +
                                (new Date(
                                  currentUser?.userInfor?.birthday
                                ).getMonth() +
                                  1)
                          }-${
                            new Date(
                              currentUser?.userInfor?.birthday
                            ).getDate() > 9
                              ? new Date(
                                  currentUser?.userInfor?.birthday
                                ).getDate()
                              : "0" +
                                new Date(
                                  currentUser?.userInfor?.birthday
                                ).getDate()
                          }`}
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>
                        Địa chỉ
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          (*)
                        </span>
                      </Form.Label>
                      <Form.Control
                        placeholder="Đại Ân, Cát Nhơn, Phù Cát, Bình Định"
                        value={userAddress}
                        onChange={(e) => {
                          setUserAddress(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Lớp
                          <span
                            style={{
                              color: "red",
                              fontWeight: "600",
                            }}
                          >
                            (*)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="12A1"
                          value={userClass}
                          onChange={(e) => {
                            setUserClass(e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>
                          Số điện thoại
                          <span
                            style={{
                              color: "red",
                              fontWeight: "600",
                            }}
                          >
                            (*)
                          </span>
                        </Form.Label>
                        <Form.Control
                          placeholder="0358489850"
                          value={userPhone}
                          onChange={(e) => {
                            setUserPhone(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Row>

                    <Button variant="success" onClick={handleUploadUserInfor}>
                      Cập nhật
                    </Button>
                    <Button
                      variant="warning"
                      style={{ marginLeft: "15px" }}
                      onClick={() => {
                        setChangePassword(true);
                      }}
                    >
                      Đổi mật khẩu
                    </Button>
                  </Form>
                  <span
                    style={{
                      display: "block",
                      color: "red",
                      fontWeight: "600",
                      paddingTop: "15px",
                    }}
                  >
                    (*) Thông tin bắt buộc.
                  </span>
                </div>
              </Col>
            ) : (
              <Col md={6} xs={6} lg={6}>
                <div
                  className="user-infor"
                  style={{ paddingTop: "55px", paddingLeft: "15px" }}
                >
                  <Form>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>
                        Mật khẩu hiện tại
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          (*)
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        value={userPassword}
                        onChange={(e) => {
                          setUserPassword(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>
                        Mật khẩu mới
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          (*)
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>
                        <sapn style={{ display: "flex", alignItems: "center" }}>
                          Nhập lại mật khẩu mới
                          <span
                            style={{
                              color: "red",
                              fontWeight: "600",
                            }}
                          >
                            (*)
                          </span>
                        </sapn>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        value={confirmNewPassword}
                        onChange={(e) => {
                          setConfirmNewPassword(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Button
                      variant="warning"
                      style={{ marginLeft: "15px" }}
                      onClick={handleChangePassword}
                    >
                      Đổi mật khẩu
                    </Button>
                    <Button
                      style={{ marginLeft: "15px" }}
                      onClick={() => {
                        setChangePassword(false);
                      }}
                    >
                      Quay lại
                    </Button>
                  </Form>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};
UserInfor.layout = "userLayout";
export default UserInfor;
