import {
  Form,
  Row,
  Button,
  Col,
  InputGroup,
  FormControl,
  Modal,
  Table,
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
  const [editorLoaded, setEditorLoaded] = useState(false);
  const curentAdmin = useSelector((state) => state.auth.login.currentUser);
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const blogID = arrayTemp[position];
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

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
      getBlogById();
    }
  }, []);

  async function getBlogById() {
    try {
      const res = await axiosJWT.get("/api/blog/" + blogID);
      if (res.data.blog) {
        const blog = res.data.blog;
        setBlogTitle(blog.title);
        setBlogContent(blog.content);
        setBlogImage(blog.image);
        setBlogCategoryID(blog.cateBlogID);
      }
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
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
      toast.error("vui l??ng nh???p t??n th??? lo???i");
    } else {
      const dataToAdd = {
        category: categoryName,
      };
      const res = await axiosJWT.post("/api/category-blog/create", dataToAdd);
      toast.success("Th??m m???i th??? lo???i th??nh c??ng");
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
        toast.success("???? x??a th??? lo???i b??i vi???t");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
      handleCloseConfirmDeleteCategory();
      getBlogCategory();
    } else {
      toast.error("kh??ng t???n t???i th??? lo???i c???n x??a");
      handleCloseConfirmDeleteCategory();
    }
  }
  async function handlUpdateBlog() {
    if (blogTitle == "") {
      toast.error("kh??ng th??? b??? tr???ng ti??u ?????");
    } else if (blogCategoryID == "") {
      toast.error("vui l??ng ch???n th??? lo???i b??i vi???t");
    } else if (blogContent == "") {
      toast.error("kh??ng th??? b??? tr???ng n???i dung b??i vi???t");
    } else {
      const blog = {
        title: blogTitle,
        image: blogImage,
        cateBlogID: blogCategoryID,
        content: blogContent,
        view: 0,
        userID: curentAdmin.userInfor._id,
      };
      try {
        const res = await axiosJWT.put("/api/blog/update/" + blogID, blog);
        toast.success("C???t nh???t b??i bi???t th??nh c??ng");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  return (
    <div className="admin-forum-blog-page">
      <div className="admin-forum-blog-header">
        <div className="admin-forum-blog-input-file">
          <span>Th??m m???i c??u h???i b???ng excel</span>
          <Form.Group controlId="formFile" className="import-excel">
            <Form.Control type="file" />
          </Form.Group>
        </div>
        <div>
          <Button variant="outline-success" style={{ "margin-right": "5px" }}>
            Excel m???u
          </Button>
          <Button
            variant="outline-warning"
            onClick={() => {
              window.history.back();
            }}
          >
            quay l???i
          </Button>
        </div>
      </div>
      <div className="admin-forum-blog-content-wrap">
        <div className="admin-forum-blog-content-title">
          <span>Th??m m???i b??i vi???t</span>
        </div>

        <div className="admin-forum-blog-content-type-and-recommend">
          <Row>
            <Form.Label>Ti??u ????? b??i vi???t</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Ti??u ????? b??i vi???t"
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
                <Form.Label>H??nh ???nh</Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="h??nh ???nh"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={blogImage}
                    onChange={(e) => {
                      setBlogImage(e.target.value);
                    }}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col ms={6} lg={6} xs={6}>
              <div className="admin-forum-blog-content-type">
                <Form.Group
                  controlId="formGridState"
                  style={{ maxWidth: "500px", marginRight: "5px" }}
                  value={blogCategoryID}
                >
                  <Form.Label>Th??? lo???i b??i vi???t</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    value={blogCategoryID}
                    onChange={(e) => {
                      setBlogCategoryID(e.target.value);
                    }}
                  >
                    <option>-- ch???n th??? lo???i --</option>; l
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
                    Th??m m???i th??? lo???i
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant={"danger"}
                    onClick={() => {
                      handleShowDeleteCategory();
                    }}
                  >
                    X??a th??? lo???i
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="admin-forum-blog-content-question-wrap">
          <div className="admin-forum-blog-content-question">
            <span>N???i dung b??i vi???t</span>
            <Editor
              name="description"
              onChange={(data) => {
                setBlogContent(data);
              }}
              value={blogContent}
              editorLoaded={editorLoaded}
            />
          </div>

          <div className="admin-forum-blog-footer">
            <Button
              variant="primary"
              onClick={() => {
                handlUpdateBlog();
              }}
            >
              C???p nh???t
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                window.history.back();
              }}
            >
              H???y b???
            </Button>
          </div>
        </div>
        <Modal show={showAddCategory} onHide={handleCloseAddCategory}>
          <Modal.Header closeButton>
            <Modal.Title>Th??m m???i th??? lo???i</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>T??n th??? lo???i</Form.Label>
                <Form.Control
                  type="email"
                  value={categoryName}
                  onChange={(e) => {
                    setCateoryName(e.target.value);
                  }}
                  placeholder="L??u b??t h???c sinh"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddCategory}>
              H???y
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleAddCategoryBlog();
              }}
            >
              L??u l???i
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
            <Modal.Title id="example-modal-sizes-title-sm">Ch?? ??!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Khi x??a th??? lo???i. T???t c??? c??c b??i vi???t thu???c v??? th??? lo???i s??? b??? x??a
            b???n c?? ch???c ch???n kh??ng
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleCloseConfirmDeleteCategory();
              }}
            >
              H???y
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteCategory();
              }}
            >
              X??a
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
              Danh s??ch c??c th??? lo???i
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered>
              <thead>
                <tr>
                  <th style={{ display: "flex", justifyContent: "center" }}>
                    STT
                  </th>
                  <th>T??n th??? lo???i</th>
                  <th style={{ display: "flex", justifyContent: "center" }}>
                    X??c nh???n x??a
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
                            X??a
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
              Tho??t
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
CreateQuestion.layout = "adminLayout";
export default CreateQuestion;
