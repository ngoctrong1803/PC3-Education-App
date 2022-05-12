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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Forum = () => {
  const [show, setShow] = useState("blog");
  const [listBlogCategory, setListBlogCategory] = useState([]);
  const [listBlog, setListBlog] = useState([]);
  const [listAuthor, setListAuthor] = useState([]);

  const [blogIDToDelete, setBlogIDToDelete] = useState();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const [listCateQuestion, setListCateQuestion] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [listAuthorOfQuestion, setListAuthorOfQuestion] = useState([]);

  // modal delete question
  const [showConfirmDeleteQuestion, setShowConfirmDeleteQuestion] =
    useState(false);
  const handleCloseConfirmDeleteQuestion = () =>
    setShowConfirmDeleteQuestion(false);
  const handleShowConfirmDeleteQuestion = () =>
    setShowConfirmDeleteQuestion(true);
  const [questionIDToDelete, setQuestionIDToDelete] = useState("");

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };
  async function getBlogCategory() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/category-blog/list"
      );
      setListBlogCategory(res.data.listCateBlog);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function getListBlog() {
    try {
      const res = await axios.get("http://localhost:8000/api/blog/list");
      setListBlog(res.data.listBlog);
      setListAuthor(res.data.listAuthor);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleDeleteBlog() {
    try {
      if (blogIDToDelete) {
        const res = await axios.delete(
          "http://localhost:8000/api/blog/delete/" + blogIDToDelete
        );
        handleCloseConfirmDelete();
        toast.success("Xóa bài viết thành công");
        getListBlog();
      } else {
        toast.error("Không tồn tại bài viết cần xóa");
      }
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  async function getListCateQuestion() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/category-question/list"
      );
      setListCateQuestion(res.data.listCateQuestion);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function getAllQuestion() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/question-in-forum/list"
      );
      setAllQuestion(res.data.listQuestionInForum);
      setListAuthorOfQuestion(res.data.listAuthor);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleChangeStatus(questionID) {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/question-in-forum/update-status/" +
          questionID
      );
      getAllQuestion();
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleDeleteQuestion() {
    try {
      const res = await axios.delete(
        "http://localhost:8000/api/question-in-forum/delete/" +
          questionIDToDelete
      );
      toast.success("Xóa câu hỏi thành công");
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
    getAllQuestion();
    handleCloseConfirmDeleteQuestion();
  }

  useEffect(() => {
    getBlogCategory();
    getListBlog();
    getListCateQuestion();
    getAllQuestion();
  }, []);
  return (
    <div className="admin-forum-page">
      <div className="admin-forum-title">
        {show == "blog" ? (
          <span>Danh sách bài đăng</span>
        ) : show == "question" ? (
          <span>Danh sách câu hỏi</span>
        ) : null}
      </div>
      <div className="admin-forum-header">
        {show == "blog" ? (
          <div style={{ display: "flex" }}>
            <InputGroup className="mb-3 admin-forum-header-find ">
              <FormControl
                placeholder="Nhập tiêu đề bài viết"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary">Tìm kiếm</Button>
            </InputGroup>
            <Form.Select
              className="admin-forum-header-role"
              aria-label="Default select example"
            >
              <option>-- Thể loại --</option>
              {listBlogCategory.map((cateItem, index) => {
                return (
                  <>
                    <option value={cateItem._id}>{cateItem.category}</option>;
                  </>
                );
              })}
            </Form.Select>
          </div>
        ) : null}
        {show == "question" ? (
          <div style={{ display: "flex" }}>
            <InputGroup className="mb-3 admin-forum-header-find ">
              <FormControl
                placeholder="Nhập tiêu đề bài viết"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary">Tìm kiếm</Button>
            </InputGroup>
            <Form.Select
              className="admin-forum-header-role"
              aria-label="Default select example"
            >
              <option>-- Thể loại --</option>
              {listCateQuestion.map((cateItem, index) => {
                return (
                  <>
                    <option value={cateItem._id}>{cateItem.catQueName}</option>
                  </>
                );
              })}
            </Form.Select>
          </div>
        ) : null}

        <div>
          {show == "blog" ? (
            <Link href="/admin/forum/blogcontent/create">
              <Button
                className="admin-forum-header-add-user"
                variant="outline-info"
                onClick={() => {}}
              >
                Thêm mới
              </Button>
            </Link>
          ) : null}

          <Link href="/admin">
            <Button
              className="admin-forum-header-add-user"
              variant="outline-warning"
            >
              quay lại
            </Button>
          </Link>
          {show == "blog" ? (
            <Button
              onClick={() => {
                setShow("question");
              }}
            >
              <ion-icon name="arrow-redo-outline"></ion-icon> Quản lý câu hỏi
            </Button>
          ) : show == "question" ? (
            <Button
              onClick={() => {
                setShow("blog");
              }}
            >
              <ion-icon name="arrow-redo-outline"></ion-icon> Quản lý bài viết
            </Button>
          ) : null}
        </div>
      </div>
      {show == "blog" ? (
        <div className="admin-forum-list">
          <Table bordered className="admin-forum-list-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Thể loại</th>
                <th>Tác giả</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {listBlog.map((blogItem, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{blogItem.title}</td>
                      <td>
                        {listBlogCategory.map((cateItem, index) => {
                          if (cateItem._id == blogItem.cateBlogID) {
                            return <>{cateItem.category}</>;
                          }
                        })}
                      </td>

                      <td>
                        {listAuthor.map((authorItem, index) => {
                          if (authorItem._id == blogItem.userID) {
                            return <>{authorItem.fullname}</>;
                          }
                        })}
                      </td>
                      <td>
                        <Link
                          href={`/admin/forum/blogcontent/detail/${blogItem._id}`}
                        >
                          <Button variant="outline-primary">Chi tiết</Button>
                        </Link>

                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            setBlogIDToDelete(blogItem._id);
                            handleShowConfirmDelete();
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
          <div className="main-forum-list-pagination">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
          {/* confirm delete */}
          <Modal
            show={showConfirmDelete}
            onHide={handleCloseConfirmDelete}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Xác nhận
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc chắn muốn xóa bài viết này không
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleCloseConfirmDelete();
                }}
              >
                Hủy
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteBlog();
                }}
              >
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
      {show == "question" ? (
        <div className="admin-forum-list">
          <Table bordered className="admin-forum-list-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Thể loại</th>
                <th>Tác giả</th>
                <th>Trạng thái</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {allQuestion.map((questionItem, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{questionItem.title}</td>
                      <td>{questionItem.content}</td>
                      <td>
                        {listCateQuestion.map((cateItem, index) => {
                          if (questionItem.catQueID == cateItem._id) {
                            return <>{cateItem.catQueName}</>;
                          }
                        })}
                      </td>
                      <td>
                        {listAuthorOfQuestion.map((authorItem, index) => {
                          if (questionItem.userID == authorItem.userID) {
                            return <>{authorItem.fullname}</>;
                          }
                        })}
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        {questionItem.status ? (
                          <span style={{ color: "green", fontWeight: "600" }}>
                            <ion-icon name="checkmark-outline"></ion-icon>
                            Đã duyệt
                          </span>
                        ) : (
                          <span style={{ color: "#fec416", fontWeight: "600" }}>
                            ...Đợi duyệt
                          </span>
                        )}
                      </td>
                      <td style={{ minWidth: "160px" }}>
                        {!questionItem.status ? (
                          <Button
                            variant="success"
                            onClick={() => {
                              handleChangeStatus(questionItem._id);
                            }}
                          >
                            Duyệt
                          </Button>
                        ) : (
                          <Button
                            variant="warning"
                            onClick={() => {
                              handleChangeStatus(questionItem._id);
                            }}
                          >
                            Hủy
                          </Button>
                        )}

                        <Button
                          variant="danger"
                          onClick={() => {
                            setQuestionIDToDelete(questionItem._id);
                            handleShowConfirmDeleteQuestion();
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
          <div className="main-forum-list-pagination">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
          {/* confirm delete */}
          <Modal
            show={showConfirmDelete}
            onHide={handleCloseConfirmDelete}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Xác nhận
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc chắn muốn xóa bài viết này không
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleCloseConfirmDelete();
                }}
              >
                Hủy
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteBlog();
                }}
              >
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
          {/* delete question */}
          <Modal
            show={showConfirmDeleteQuestion}
            onHide={handleCloseConfirmDeleteQuestion}
          >
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc chắn muốn xóa câu hỏi này không!
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseConfirmDeleteQuestion}
              >
                Hủy
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteQuestion();
                }}
              >
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
    </div>
  );
};

Forum.layout = "adminLayout";
export default Forum;