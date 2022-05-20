import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const UserInfor = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [imageSelected, setImageSelected] = useState();
  const [avatarUpdateURL, setAvatarUpdateURL] = useState("");
  const [url, setUrl] = useState("");
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const instance = axios.create();

  async function uploadImage() {
    try {
      const formData = new FormData();
      formData.append("file", imageSelected[0]);
      formData.append("upload_preset", "pc3_image");
      const res = await instance.post(
        "https://api.cloudinary.com/v1_1/dwjhsgpt7/image/upload",
        formData
      );
      setAvatarUpdateURL(res.data.url);

      console.log("res of image:", res);
    } catch (error) {
      toast.error("Lỗi tải file!");
    }
  }
  return (
    <>
      <Head>
        <title>Thông tin cá nhân</title>
      </Head>
      <div className="user-infor-page">
        <h3>Thông tin cá nhân</h3>
        <div className="user-infor-wrap ">
          <Row>
            <Col md={3} xs={3} lg={3}>
              {" "}
              <div className="user-avatar">
                {avatarUpdateURL == "" ? (
                  <>
                    {" "}
                    <img src={`${currentUser?.userInfor?.avatar}`}></img>
                  </>
                ) : (
                  <>
                    <img src={avatarUpdateURL}></img>
                  </>
                )}

                <h5>Trương Ngọc Trọng</h5>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Cập nhật avatar</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Control
                            type="file"
                            onChange={(e) => {
                              setImageSelected(e.target.files);
                            }}
                          />
                        </Form.Group>
                        <Button
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
                {" "}
                <div className="user-infor">
                  <Form>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control placeholder="Trương Ngọc Trọng" />
                    </Form.Group>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Lớp</Form.Label>
                        <Form.Control type="text" placeholder="12A1" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" placeholder="18/03/2000" />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control placeholder="Đại Ân, Cát Nhơn, Phù Cát, Bình Định" />
                    </Form.Group>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="ngoctrong1412@gmail.com"
                          disabled
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control placeholder="0358489850" />
                      </Form.Group>
                    </Row>

                    <Button variant="success">Cập nhật</Button>
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
                </div>
              </Col>
            ) : (
              <Col md={6} xs={6} lg={6}>
                {" "}
                <div
                  className="user-infor"
                  style={{ paddingTop: "55px", paddingLeft: "15px" }}
                >
                  <Form>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Mật khẩu hiện tại</Form.Label>
                      <Form.Control placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>Mật khẩu mới</Form.Label>
                      <Form.Control placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                      <Form.Control placeholder="" />
                    </Form.Group>

                    <Button variant="warning" style={{ marginLeft: "15px" }}>
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
