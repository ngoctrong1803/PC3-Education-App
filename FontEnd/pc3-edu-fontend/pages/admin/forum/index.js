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
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../helper/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
import useAdminAuth from "../../../hooks/authAdminHook";
const Forum = () => {
  const isAdmin = useAdminAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
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
      const res = await axiosJWT.get("/api/category-blog/list");
      setListBlogCategory(res.data.listCateBlog);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  // handle filter and pagination
  const [contentBlogToFind, setContentBlogToFind] = useState("");
  const [cateBlogToFind, setCateBlogToFind] = useState("");
  const [totalPage, setTotalPage] = useState([]);
  async function getListBlog(page) {
    try {
      const res = await axiosJWT.post("/api/blog/list", {
        page: page,
        contentToFind: contentBlogToFind,
        cateToFind: cateBlogToFind,
      });
      setListBlog(res.data.listBlog);
      setListAuthor(res.data.listAuthor);
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPage(listTotalPage);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleDeleteBlog() {
    try {
      if (blogIDToDelete) {
        const res = await axiosJWT.delete("/api/blog/delete/" + blogIDToDelete);
        handleCloseConfirmDelete();
        toast.success("X??a b??i vi???t th??nh c??ng");
        getListBlog(1);
      } else {
        toast.error("Kh??ng t???n t???i b??i vi???t c???n x??a");
      }
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  async function getListCateQuestion() {
    try {
      const res = await axiosJWT.get("/api/category-question/list");
      setListCateQuestion(res.data.listCateQuestion);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  // handle filter and pagination
  const [contentQuestionToFind, setContentQuestionToFind] = useState("");
  const [cateQuestionToFind, setCateQuestionToFind] = useState("");
  const [totalPageQues, setTotalPageQues] = useState([]);

  async function getAllQuestion(page) {
    try {
      const res = await axiosJWT.post("/api/question-in-forum/list", {
        page: page,
        contentToFind: contentQuestionToFind,
        cateToFind: cateQuestionToFind,
      });

      setAllQuestion(res.data.listQuestionInForum);
      setListAuthorOfQuestion(res.data.listAuthor);
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPageQues(listTotalPage);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleChangeStatus(questionID) {
    try {
      const res = await axiosJWT.put(
        "/api/question-in-forum/update-status/" + questionID
      );
      getAllQuestion(1);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function handleDeleteQuestion() {
    try {
      const res = await axiosJWT.delete(
        "/api/question-in-forum/delete/" + questionIDToDelete
      );
      toast.success("X??a c??u h???i th??nh c??ng");
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
    getAllQuestion(1);
    handleCloseConfirmDeleteQuestion();
  }

  useEffect(() => {
    if (isAdmin) {
      getBlogCategory();
      getListCateQuestion();
    }
  }, []);
  useEffect(() => {
    if (isAdmin) {
      getListBlog(1);
    }
  }, [contentBlogToFind, cateBlogToFind]);
  useEffect(() => {
    if (isAdmin) {
      getAllQuestion(1);
    }
  }, [contentQuestionToFind, cateQuestionToFind]);
  return (
    <div className="admin-forum-page">
      <div className="admin-forum-title">
        {show == "blog" ? (
          <span>Danh s??ch b??i ????ng</span>
        ) : show == "question" ? (
          <span>Danh s??ch c??u h???i</span>
        ) : null}
      </div>
      <div className="admin-forum-header">
        {show == "blog" ? (
          <div style={{ display: "flex" }}>
            <InputGroup className="mb-3 admin-forum-header-find ">
              <FormControl
                placeholder="Nh???p ti??u ????? b??i vi???t"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={contentBlogToFind}
                onChange={(e) => {
                  setContentBlogToFind(e.target.value);
                }}
              />
              <Button variant="primary">T??m ki???m</Button>
            </InputGroup>
            <Form.Select
              className="admin-forum-header-role"
              aria-label="Default select example"
              onChange={(e) => {
                setCateBlogToFind(e.target.value);
              }}
            >
              <option value={""}>T???t c??? th??? lo???i</option>
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
                placeholder="Nh???p ti??u ????? b??i vi???t"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={contentQuestionToFind}
                onChange={(e) => {
                  setContentQuestionToFind(e.target.value);
                }}
              />
              <Button variant="primary">T??m ki???m</Button>
            </InputGroup>
            <Form.Select
              className="admin-forum-header-role"
              aria-label="Default select example"
              onChange={(e) => {
                setCateQuestionToFind(e.target.value);
              }}
            >
              <option value={""}>T???t c??? th??? lo???i</option>
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
                onClick={() => {
                  //window.location.replace("/admin/forum/blogcontent/create");
                }}
              >
                Th??m m???i
              </Button>
            </Link>
          ) : null}

          <Link href="/admin">
            <Button
              className="admin-forum-header-add-user"
              variant="outline-warning"
            >
              quay l???i
            </Button>
          </Link>
          {show == "blog" ? (
            <Button
              onClick={() => {
                setShow("question");
              }}
            >
              <ion-icon name="arrow-redo-outline"></ion-icon> Qu???n l?? c??u h???i
            </Button>
          ) : show == "question" ? (
            <Button
              onClick={() => {
                setShow("blog");
              }}
            >
              <ion-icon name="arrow-redo-outline"></ion-icon> Qu???n l?? b??i vi???t
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
                <th>Ti??u ?????</th>
                <th>Th??? lo???i</th>
                <th>T??c gi???</th>
                <th>Ch???c n??ng</th>
              </tr>
            </thead>
            <tbody>
              {listBlog.map((blogItem, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td style={{ maxWidth: "400px" }}>{blogItem.title}</td>
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
                          <Button variant="outline-primary">Chi ti???t</Button>
                        </Link>

                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            setBlogIDToDelete(blogItem._id);
                            handleShowConfirmDelete();
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
          <div className="main-forum-list-pagination">
            <Pagination>
              <Pagination.Prev />
              {totalPage.map((item) => {
                return (
                  <>
                    <Pagination.Item
                      className="pagination_item"
                      onClick={(e) => {
                        getListBlog(item);
                        const listPagination =
                          document.querySelectorAll(".pagination_item");
                        const activeItem = (itemClick) => {
                          listPagination.forEach((item) => {
                            item.classList.remove("active");
                          });
                          itemClick.classList.add("active");
                        };
                        listPagination.forEach((item) => {
                          item.addEventListener("click", function () {
                            activeItem(item);
                          });
                        });
                      }}
                    >
                      {item}
                    </Pagination.Item>
                  </>
                );
              })}
              <Pagination.Next />
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
                X??c nh???n
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              B???n c?? ch???c ch???n mu???n x??a b??i vi???t n??y kh??ng
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleCloseConfirmDelete();
                }}
              >
                H???y
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteBlog();
                }}
              >
                X??a
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
                <th>Ti??u ?????</th>
                <th>N???i dung</th>
                <th>Th??? lo???i</th>
                <th>T??c gi???</th>
                <th>Tr???ng th??i</th>
                <th>Ch???c n??ng</th>
              </tr>
            </thead>
            <tbody>
              {allQuestion.map((questionItem, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td
                        style={{
                          maxWidth: "220px",
                        }}
                      >
                        {questionItem.title.length < 40
                          ? questionItem.title
                          : questionItem.title.substr(0, 40) + "..."}
                        <OverlayTrigger
                          trigger="hover"
                          key={"top"}
                          placement={"bottom"}
                          overlay={
                            <Popover
                              id={`popover-positioned-top`}
                              style={{ minWidth: "300px" }}
                            >
                              <Popover.Body
                                style={{
                                  backgroundColor: "rgba(231,231,255, 0.5)",
                                }}
                              >
                                {questionItem.title}
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button
                            variant="outline-light"
                            style={{
                              height: "1px",
                              justifyContent: "center",
                            }}
                          ></Button>
                        </OverlayTrigger>
                      </td>
                      <td style={{ maxWidth: "280px" }}>
                        {questionItem.content.length < 65
                          ? questionItem.content
                          : questionItem.content.substr(0, 65) + "..."}
                        <OverlayTrigger
                          trigger="hover"
                          key={"top"}
                          placement={"bottom"}
                          overlay={
                            <Popover
                              id={`popover-positioned-top`}
                              style={{ minWidth: "300px" }}
                            >
                              <Popover.Body
                                style={{
                                  backgroundColor: "rgba(231,231,255, 0.5)",
                                }}
                              >
                                {questionItem.content}
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button
                            variant="outline-light"
                            style={{
                              height: "2px",
                              justifyContent: "center",
                            }}
                          ></Button>
                        </OverlayTrigger>
                      </td>
                      <td>
                        {listCateQuestion.map((cateItem, index) => {
                          if (questionItem.catQueID == cateItem._id) {
                            return <>{cateItem.catQueName}</>;
                          }
                        })}
                      </td>
                      <td>
                        {listAuthorOfQuestion.map((authorItem, index) => {
                          if (questionItem.userID == authorItem._id) {
                            return <>{authorItem.fullname}</>;
                          }
                        })}
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        {questionItem.status ? (
                          <span style={{ color: "green", fontWeight: "600" }}>
                            <ion-icon name="checkmark-outline"></ion-icon>
                            ???? duy???t
                          </span>
                        ) : (
                          <span style={{ color: "#fec416", fontWeight: "600" }}>
                            ...?????i duy???t
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
                            Duy???t
                          </Button>
                        ) : (
                          <Button
                            variant="warning"
                            onClick={() => {
                              handleChangeStatus(questionItem._id);
                            }}
                          >
                            H???y
                          </Button>
                        )}

                        <Button
                          variant="danger"
                          onClick={() => {
                            setQuestionIDToDelete(questionItem._id);
                            handleShowConfirmDeleteQuestion();
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
          <div className="main-forum-list-pagination">
            <Pagination>
              <Pagination.Prev />
              {totalPageQues.map((item) => {
                return (
                  <>
                    <Pagination.Item
                      className="pagination_item"
                      onClick={(e) => {
                        getAllQuestion(item);
                        const listPagination =
                          document.querySelectorAll(".pagination_item");
                        const activeItem = (itemClick) => {
                          listPagination.forEach((item) => {
                            item.classList.remove("active");
                          });
                          itemClick.classList.add("active");
                        };
                        listPagination.forEach((item) => {
                          item.addEventListener("click", function () {
                            activeItem(item);
                          });
                        });
                      }}
                    >
                      {item}
                    </Pagination.Item>
                  </>
                );
              })}
              <Pagination.Next />
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
                X??c nh???n
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              B???n c?? ch???c ch???n mu???n x??a b??i vi???t n??y kh??ng
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleCloseConfirmDelete();
                }}
              >
                H???y
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteBlog();
                }}
              >
                X??a
              </Button>
            </Modal.Footer>
          </Modal>
          {/* delete question */}
          <Modal
            show={showConfirmDeleteQuestion}
            onHide={handleCloseConfirmDeleteQuestion}
          >
            <Modal.Header closeButton>
              <Modal.Title>X??c nh???n</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              B???n c?? ch???c ch???n mu???n x??a c??u h???i n??y kh??ng!
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseConfirmDeleteQuestion}
              >
                H???y
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteQuestion();
                }}
              >
                X??a
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
