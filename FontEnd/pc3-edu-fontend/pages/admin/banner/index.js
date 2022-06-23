import {
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
  Modal,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../helper/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
import useAdminAuth from "../../../hooks/authAdminHook";
import Style from "./Style";

const Users = () => {
  const isAdmin = useAdminAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const [showAddBanner, setShowAddBanner] = useState(false);
  const handleCloseAddBanner = () => setShowAddBanner(false);
  const handleShowAddBanner = () => setShowAddBanner(true);

  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const handleCloseUpdateBanner = () => setShowUpdateBanner(false);
  const handleShowUpdateBanner = () => setShowUpdateBanner(true);

  const [showDeleteBanner, setShowDeleteBanner] = useState(false);
  const handleCloseDeleteBanner = () => setShowDeleteBanner(false);
  const handleShowDeleteBanner = () => setShowDeleteBanner(true);

  const instance = axios.create();
  const [isUpload, setIsUpload] = useState(false);
  const [isUpload1, setIsUpload1] = useState(false);
  const [isUpload2, setIsUpload2] = useState(false);
  const [isUpload3, setIsUpload3] = useState(false);
  const [listBanner, setListBanner] = useState([]);

  async function uploadImage() {
    //  try {
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
    await axiosJWT.put("/api/user/update-avatar/" + currentUser.userInfor._id, {
      imageurl: res.data.url,
    });

    setIsUpload(false);
  }

  //get list banner
  async function getListBanner() {
    try {
      const res = await axiosJWT.get("/api/banner/list");
      setListBanner(res.data.listBanner);
      console.log("danh sách các banner đã lấy được", res.data.listBanner);
    } catch (error) {
      toast.error("Đã xảy ra ngoại lệ, không lấy được danh sách banner");
    }
  }
  //data to add
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState();
  async function handleAddBanner() {
    try {
      const formData = new FormData();
      formData.append("file", imageSelected[0]);
      formData.append("upload_preset", "pc3_image");
      setIsUpload(true);
      const res = await instance.post(
        "https://api.cloudinary.com/v1_1/dwjhsgpt7/image/upload",
        formData
      );
      try {
        if (title != "" && description != "" && imageSelected != "") {
          await axiosJWT.post("/api/banner/create", {
            title: title,
            description: description,
            image: res.data.url,
          });
          toast.success("Thêm mới thành công!");
          setIsUpload(false);
          setImageSelected(null);
          handleCloseAddBanner();
        } else {
          toast.error("Vui lòng nhập đầy đủ thông tin banner");
          setIsUpload(false);
        }
      } catch (error) {
        toast.error("Lỗi thêm mới hình ảnh");
        setImageSelected(null);
        setIsUpload(false);
      }
    } catch (error) {
      toast.error("Lỗi file hình ảnh");
      setIsUpload(false);
    }
  }
  const [bannerIDToUpdate, setBannerIDToUpdate] = useState("");
  async function handleUpdateBanner() {
    try {
      const formData = new FormData();
      formData.append("file", imageSelected[0]);
      formData.append("upload_preset", "pc3_image");
      setIsUpload(true);
      const res = await instance.post(
        "https://api.cloudinary.com/v1_1/dwjhsgpt7/image/upload",
        formData
      );
      try {
        if (title != "" && description != "" && imageSelected != "") {
          await axiosJWT.put("/api/banner/update/" + bannerIDToUpdate, {
            title: title,
            description: description,
            image: res.data.url,
          });
          toast.success("Cập nhật thành công!");
          getListBanner();
          setIsUpload(false);
          setImageSelected(null);
          handleCloseUpdateBanner();
        } else {
          toast.error("Vui lòng nhập đầy đủ thông tin banner");
          setIsUpload(false);
        }
      } catch (error) {
        toast.error("Lỗi thêm mới hình ảnh");
        setImageSelected(null);
        setIsUpload(false);
      }
    } catch (error) {
      toast.error("Lỗi file hình ảnh");
      setIsUpload(false);
    }
  }
  const [bannerIDToDelete, setBannerIDToDelete] = useState("");
  async function handleDeleteBanner() {
    try {
      await axiosJWT.delete("/api/banner/delete/" + bannerIDToDelete);
      toast.success("Xóa banner thành công thành công!");
      getListBanner();
      handleCloseDeleteBanner();
    } catch (error) {
      toast.error("Đã xảy ra ngoại lệ. Lỗi xóa banner");
    }
  }

  useEffect(() => {
    getListBanner();
  }, []);

  return (
    <Style>
      <div className="admin-banner-wrap">
        <div className="admin-banner-header">
          <h3>Cập nhật banner</h3>
          <div>
            <Button
              variant="outline-primary"
              style={{ marginRight: "5px" }}
              onClick={() => {
                setShowAddBanner(true);
              }}
            >
              Thêm mới
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => {
                window.history.back();
              }}
            >
              Quay lại
            </Button>
          </div>
        </div>
        {listBanner.map((item, index) => {
          return (
            <>
              <div className="banner-item-wrap">
                <div className="banner-item-title">
                  <span>{item.title}</span>
                </div>
                <img className="banner-img" src={item.image}></img>
                <div className="banner-item-footer">
                  <Button
                    variant="danger"
                    onClick={() => {
                      setBannerIDToDelete(item._id);
                      handleShowDeleteBanner();
                    }}
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() => {
                      setTitle(item.title);
                      setDescription(item.description);
                      setImageSelected("");
                      setBannerIDToUpdate(item._id);
                      handleShowUpdateBanner();
                    }}
                  >
                    Cập nhật
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* delete banner */}
      <Modal show={showAddBanner} onHide={handleCloseAddBanner}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới banner</Modal.Title>
        </Modal.Header>
        <Form.Group controlId="formFile">
          <Modal.Body>
            <Form.Label>Tiêu đề:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề banner"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Form.Label>Mô tả:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mô tả banner"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Form.Label>Hình ảnh:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setImageSelected(e.target.files);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddBanner}>
              Hủy
            </Button>
            {isUpload ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Tải lên...
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  handleAddBanner();
                }}
              >
                Thêm mới
              </Button>
            )}
          </Modal.Footer>
        </Form.Group>
      </Modal>

      {/* update banner */}
      <Modal show={showUpdateBanner} onHide={handleCloseUpdateBanner}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật banner</Modal.Title>
        </Modal.Header>
        <Form.Group controlId="formFile">
          <Modal.Body>
            <Form.Label>Tiêu đề:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề banner"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Form.Label>Mô tả:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mô tả banner"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Form.Label>Hình ảnh:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setImageSelected(e.target.files);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateBanner}>
              Hủy
            </Button>
            {isUpload ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Tải lên...
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  handleUpdateBanner();
                }}
              >
                Cập nhật
              </Button>
            )}
          </Modal.Footer>
        </Form.Group>
      </Modal>
      {/* delete banner */}
      <Modal show={showDeleteBanner} onHide={handleCloseDeleteBanner}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa banner</Modal.Title>
        </Modal.Header>
        <Form.Group controlId="formFile">
          <Modal.Body>Bạn có chắc chắn muốn xóa banner này!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteBanner}>
              Hủy
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteBanner();
              }}
            >
              Xóa
            </Button>
          </Modal.Footer>
        </Form.Group>
      </Modal>
    </Style>
  );
};

Users.layout = "adminLayout";
export default Users;
