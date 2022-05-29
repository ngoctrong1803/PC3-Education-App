import {
  Form,
  Row,
  Button,
  Col,
  InputGroup,
  FormControl,
  Modal,
  Table,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Editor from "../../../../../comps/Ckeditor";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../../redux/authSlice";
import useAdminAuth from "../../../../../hooks/authAdminHook";

const CreateQuestion = () => {
  const isAdmin = useAdminAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const curentAdmin = useSelector((state) => state.auth.login.currentUser);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogCategoryID, setBlogCategoryID] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [listBlogCategory, setListBlogCategory] = useState([]);

  const [categoryName, setCateoryName] = useState("");

  const [showAddCategory, setShowAddCategory] = useState(false);
  const handleCloseAddCategory = () => setShowAddCategory(false);
  const handleShowAddCategory = () => setShowAddCategory(true);

  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const handleCloseDeleteCategory = () => setShowDeleteCategory(false);
  const handleShowDeleteCategory = () => setShowDeleteCategory(true);
  const [categoryID, setCategoryID] = useState("");

  const [showConfirmDeleteCategory, setShowConfirmDeleteCategory] =
    useState(false);
  const handleCloseConfirmDeleteCategory = () =>
    setShowConfirmDeleteCategory(false);
  const handleShowConfirmDeleteCategory = () =>
    setShowConfirmDeleteCategory(true);

  useEffect(() => {
    if (isAdmin) {
      setEditorLoaded(true);
      getBlogCategory();
    }
  }, []);
  async function getBlogCategory() {
    try {
      const res = await axiosJWT.get("/api/category-blog/list");
      setListBlogCategory(res.data.listCateBlog);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleAddCategoryBlog() {
    if (categoryName == "") {
      toast.error("vui lòng nhập tên thể loại");
    } else {
      const dataToAdd = {
        category: categoryName,
      };
      const res = await axiosJWT.post("/api/category-blog/create", dataToAdd);
      toast.success("Thêm mới thể loại thành công");
      getBlogCategory();
      try {
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }

      handleCloseAddCategory();
    }
  }
  async function handleDeleteCategory() {
    if (categoryID != "") {
      try {
        const res = await axiosJWT.delete(
          "/api/category-blog/delete/" + categoryID
        );
        toast.success("đã xóa thể loại bài viết");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
      handleCloseConfirmDeleteCategory();
      getBlogCategory();
    } else {
      toast.error("không tồn tại thể loại cần xóa");
      handleCloseConfirmDeleteCategory();
    }
  }
  const [isUpload, setIsUpload] = useState(false);
  const instance = axios.create();
  async function handlAddBlog() {
    let blogImageCloud = "";
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
      blogImageCloud = res.data.url;
      setIsUpload(false);
    } catch (error) {
      toast.error("Lỗi tải file! Thêm mới bài viết thất bại");
      setIsUpload(false);
      return;
    }

    if (blogTitle == "") {
      toast.error("không thể bỏ trống tiêu đề");
    } else if (blogCategoryID == "") {
      toast.error("vui lòng chọn thể loại bài viết");
    } else if (blogContent == "") {
      toast.error("không thể bỏ trống nội dung bài viết");
    } else {
      const blog = {
        title: blogTitle,
        image: blogImageCloud,
        cateBlogID: blogCategoryID,
        content: blogContent,
        view: 0,
        userID: curentAdmin.userInfor._id,
      };
      try {
        const res = await axiosJWT.post("/api/blog/create", blog);
        toast.success("Thêm mới bài biết thành công");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  // handle update image
  const [imageSelected, setImageSelected] = useState();

  return (
    <div className="admin-forum-blog-page">
      <div className="admin-forum-blog-header">
        <div className="admin-forum-blog-input-file">
          <span>Thêm mới câu hỏi bằng excel</span>
          <Form.Group controlId="formFile" className="import-excel">
            <Form.Control type="file" />
          </Form.Group>
        </div>
        <div>
          <Button variant="outline-success" style={{ "margin-right": "5px" }}>
            Excel mẫu
          </Button>
          <Button
            variant="outline-warning"
            onClick={() => {
              window.history.back();
            }}
          >
            quay lại
          </Button>
        </div>
      </div>
      <div className="admin-forum-blog-content-wrap">
        <div className="admin-forum-blog-content-title">
          <span>Thêm mới bài viết</span>
        </div>

        <div className="admin-forum-blog-content-type-and-recommend">
          <Row>
            <Form.Label>Tiêu đề bài viết</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Tiêu đề bài viết"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={blogTitle}
                onChange={(e) => {
                  setBlogTitle(e.target.value);
                }}
              />
            </InputGroup>
          </Row>
          <Row>
            <Col ms={6} lg={6} xs={6}>
              <div className="admin-forum-blog-content-image">
                <Form.Label>Hình ảnh</Form.Label>{" "}
                {isUpload ? (
                  <span style={{ color: "#0d6efd" }}>
                    <Spinner animation="border" size="sm" variant="primary" />{" "}
                    Loading...
                  </span>
                ) : null}
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
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
              </div>
            </Col>
            <Col ms={6} lg={6} xs={6}>
              <div className="admin-forum-blog-content-type">
                <Form.Group
                  controlId="formGridState"
                  style={{ maxWidth: "500px", marginRight: "5px" }}
                  value={blogCategoryID}
                >
                  <Form.Label>Thể loại bài viết</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    onChange={(e) => {
                      setBlogCategoryID(e.target.value);
                    }}
                  >
                    <option>-- chọn thể loại --</option>; l
                    {listBlogCategory.map((cateItem, index) => {
                      return (
                        <>
                          <option value={cateItem._id}>
                            {cateItem.category}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <div>
                  <Button
                    onClick={() => {
                      handleShowAddCategory();
                    }}
                  >
                    Thêm mới thể loại
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant={"danger"}
                    onClick={() => {
                      handleShowDeleteCategory();
                    }}
                  >
                    Xóa thể loại
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="admin-forum-blog-content-question-wrap">
          <div className="admin-forum-blog-content-question">
            <span>Nội dung bài viết</span>
            <Editor
              name="description"
              onChange={(data) => {
                setBlogContent(data);
              }}
              value={""}
              editorLoaded={editorLoaded}
            />
          </div>

          <div className="admin-forum-blog-footer">
            <Button
              variant="primary"
              onClick={() => {
                handlAddBlog();
              }}
            >
              Lưu lại
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                window.history.back();
              }}
            >
              Hủy bỏ
            </Button>
          </div>
        </div>
        <Modal show={showAddCategory} onHide={handleCloseAddCategory}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm mới thể loại</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên thể loại</Form.Label>
                <Form.Control
                  type="email"
                  value={categoryName}
                  onChange={(e) => {
                    setCateoryName(e.target.value);
                  }}
                  placeholder="Lưu bút học sinh"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddCategory}>
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleAddCategoryBlog();
              }}
            >
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {/* confirm delete */}
        <Modal
          size="sm"
          show={showConfirmDeleteCategory}
          onHide={handleCloseConfirmDeleteCategory}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">Chú ý!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Khi xóa thể loại. Tất cả các bài viết thuộc về thể loại sẽ bị xóa
            bạn có chắc chắn không
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleCloseConfirmDeleteCategory();
              }}
            >
              Hủy
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteCategory();
              }}
            >
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
        {/* list category */}
        <Modal
          size="lg"
          show={showDeleteCategory}
          onHide={handleCloseDeleteCategory}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Danh sách các thể loại
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered>
              <thead>
                <tr>
                  <th style={{ display: "flex", justifyContent: "center" }}>
                    STT
                  </th>
                  <th>Tên thể loại</th>
                  <th style={{ display: "flex", justifyContent: "center" }}>
                    Xác nhận xóa
                  </th>
                </tr>
              </thead>
              <tbody>
                {listBlogCategory.map((cateItem, index) => {
                  return (
                    <>
                      <tr>
                        <td
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {index + 1}
                        </td>
                        <td>{cateItem.category}</td>
                        <td
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            variant="danger"
                            onClick={() => {
                              handleShowConfirmDeleteCategory();
                              setCategoryID(cateItem._id);
                            }}
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteCategory}>
              Thoát
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
CreateQuestion.layout = "adminLayout";
export default CreateQuestion;
