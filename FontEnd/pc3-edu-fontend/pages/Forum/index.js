import {
  Col,
  Row,
  Button,
  InputGroup,
  FormControl,
  Form,
  Table,
  Modal,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/authHook";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
const Forum = () => {
  const isAuth = useAuth();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const [show, setShow] = useState("event");
  //blog
  const [listBlog, setListBlog] = useState([]);
  const [listAuthor, setListAuthor] = useState([]);
  const [listCateBlog, setListCateBlog] = useState([]);
  const [listCateQuestion, setListCateQuestion] = useState([]);
  const [dateWriteBlogs, setDateWriteBlogs] = useState([]);
  // question in forum
  const [listQuestionOfUser, setListQuestionOfUser] = useState([]);

  // data to create question
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionCateID, setQuestionCateID] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  // modal add question
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const handleCloseAddQuestion = () => setShowAddQuestion(false);
  const handleShowAddQuestion = () => setShowAddQuestion(true);

  // modal update question
  const [showUpdateQuestion, setShowUpdateQuestion] = useState(false);
  const handleCloseUpdateQuestion = () => setShowUpdateQuestion(false);
  const handleShowUpdateQuestion = () => setShowUpdateQuestion(true);
  const [questionIDToUpdate, setQuestionIDToUpdate] = useState("");

  // modal delete question
  const [showConfirmDeleteQuestion, setShowConfirmDeleteQuestion] =
    useState(false);
  const handleCloseConfirmDeleteQuestion = () =>
    setShowConfirmDeleteQuestion(false);
  const handleShowConfirmDeleteQuestion = () =>
    setShowConfirmDeleteQuestion(true);
  const [questionIDToDelete, setQuestionIDToDelete] = useState("");

  // list question in forum
  const [listQuestionInForum, setListQuestionInForum] = useState([]);
  const [listAuthorOfQuestionInForum, setListAuthorOfQuestionInForum] =
    useState([]);
  const [dateWriteQuestions, setDateWriteQuestions] = useState();

  async function getBlogCategory() {
    try {
      const res = await axiosJWT.get("/api/category-blog/list");
      setListCateBlog(res.data.listCateBlog);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  // total page blog
  const [totalBlogPage, setTotalBlogPage] = useState([]);
  const [cateBlogToFind, setCateBlogToFind] = useState("");
  const [contentBlogToFind, setContentBlogToFind] = useState("");
  async function getListBlog(page) {
    try {
      const res = await axiosJWT.post("/api/blog/list-in-forum-index", {
        page: page,
        contentToFind: contentBlogToFind,
        cateToFind: cateBlogToFind,
      });

      const totalListPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        totalListPage.push(i + 1);
      }
      setTotalBlogPage(totalListPage);

      const arrayDate = [];
      // date create
      res.data.listBlog.map((blogItem, index) => {
        let dateTemp = new Date(blogItem.createdAt);
        let year = dateTemp.getFullYear();
        let month = dateTemp.getMonth() + 1;
        let day = dateTemp.getDate();
        const dataToAdd = {
          blogID: blogItem._id,
          date: {
            day,
            month,
            year,
          },
        };
        arrayDate.push(dataToAdd);
      });
      setDateWriteBlogs(arrayDate);
      setListBlog(res.data.listBlog);
      setListAuthor(res.data.listAuthor);
      console.log("list auth", res.data.listAuthor);
    } catch (err) {
      const errMessage = err.response?.data?.message;
      toast.error(errMessage);
    }
  }

  // function question in forum (all question)
  const [cateOfQuestionToFind, setCateOfQuestionToFind] = useState("");
  const [contentOfQuestionToFind, setContentOfQuestionToFind] = useState("");
  const [totalPageOfAllQuestion, setTotalPageOfAllQuestion] = useState([]);
  async function getListQuestionInForum(page) {
    try {
      const res = await axiosJWT.post("/api/question-in-forum/list", {
        page: page,
        contentToFind: contentOfQuestionToFind,
        cateToFind: cateOfQuestionToFind,
      });

      const arrayDate = [];
      // date create
      res.data.listQuestionInForum.map((quesItem, index) => {
        let dateTemp = new Date(quesItem.createdAt);
        let year = dateTemp.getFullYear();
        let month = dateTemp.getMonth() + 1;
        let day = dateTemp.getDate();
        const dataToAdd = {
          questionID: quesItem._id,
          date: {
            day,
            month,
            year,
          },
        };
        arrayDate.push(dataToAdd);
      });

      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPageOfAllQuestion(listTotalPage);
      setDateWriteQuestions(arrayDate);
      setListQuestionInForum(res.data.listQuestionInForum);
      setListAuthorOfQuestionInForum(res.data.listAuthor);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  // function question in forum
  const [totalPageOfMyQuestion, setTotalPageOfMyQuestion] = useState([]);
  async function getQuestionInForumByUser(page) {
    try {
      const res = await axiosJWT.get(
        "/api/question-in-forum/user/" +
          currentUser.userInfor._id +
          "?" +
          "page=" +
          page
      );
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      console.log("bafasdkfaldjks.f", res.data.totalPage);
      setTotalPageOfMyQuestion(listTotalPage);
      setListQuestionOfUser(res.data.listQuestionInForum);
    } catch (err) {
      const errMessage = err?.response?.data?.message;
      toast.error(errMessage);
    }
  }
  async function handleAddQuestion() {
    if (questionTitle == "" || questionCateID == "" || questionContent == "") {
      toast.error("Vui lòng điền đầy đủ thông tin câu hỏi");
    } else {
      try {
        const dataToAdd = {
          title: questionTitle,
          content: questionContent,
          userID: currentUser.userInfor._id,
          catQueID: questionCateID,
        };
        const res = await axiosJWT.post(
          "/api/question-in-forum/create",
          dataToAdd
        );
        toast.success(
          "Đã gửi câu hỏi thành công. chờ quản trị viên kiểm duyệt nhé!"
        );
        getQuestionInForumByUser(1);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
      handleCloseAddQuestion();
    }
  }

  async function handleUpdateQuestion() {
    if (
      questionIDToUpdate == "" ||
      questionTitle == "" ||
      questionCateID == "" ||
      questionContent == ""
    ) {
      toast.error("Vui lòng nhật đầy đủ thông tin của câu hỏi");
    } else {
      const dataToUpdate = {
        content: questionContent,
        title: questionTitle,
        userID: currentUser.userInfor._id,
        catQueID: questionCateID,
      };
      try {
        const res = await axiosJWT.put(
          "/api/question-in-forum/update/" + questionIDToUpdate,
          dataToUpdate
        );
        toast.success(
          "Đã cập nhật thành công! Vui lòng đợi kiểm duyệt của quản trị viên"
        );
        handleCloseUpdateQuestion();
        getQuestionInForumByUser(1);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  async function handleDeleteQuestion() {
    try {
      const res = await axiosJWT.delete(
        "/api/question-in-forum/delete/" + questionIDToDelete
      );
      toast.success("Xóa câu hỏi thành công");
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }

    getQuestionInForumByUser(1);
    handleCloseConfirmDeleteQuestion();
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
  // function question in forum

  useEffect(() => {
    if (isAuth) {
      getBlogCategory();
      getListCateQuestion();
      getQuestionInForumByUser(1);
      getListQuestionInForum(1);
    }
  }, []);
  useEffect(() => {
    if (isAuth) {
      getListQuestionInForum(1);
    }
  }, [cateOfQuestionToFind, contentOfQuestionToFind]);

  useEffect(() => {
    if (isAuth) {
      getListBlog(1);
    }
  }, [cateBlogToFind, contentBlogToFind]);

  const config = {
    loader: { load: ["input/asciimath"] },
  };

  return (
    <>
      <MathJaxContext config={config}>
        <div className="forum-wrap">
          <Row>
            <Col xs={8} ms={8}>
              <div className="forum-content">
                <div className="forum-topic">
                  <ul>
                    <li
                      className="btn"
                      onClick={() => {
                        setShow("event");
                      }}
                    >
                      Sự Kiện
                    </li>
                    <li
                      className="btn"
                      onClick={() => {
                        setShow("question");
                      }}
                    >
                      Hỏi Đáp
                    </li>
                    <li
                      className="btn"
                      onClick={() => {
                        setShow("my-question");
                      }}
                    >
                      Câu hỏi của tôi
                    </li>
                  </ul>
                  {show == "event" ? (
                    <InputGroup
                      style={{
                        width: "350px",
                        marginRight: "35px",
                        marginBottom: "5px",
                      }}
                    >
                      <FormControl
                        placeholder="Nhập nội dung cần tìm kiếm"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={contentBlogToFind}
                        onChange={(e) => {
                          setContentBlogToFind(e.target.value);
                        }}
                      />
                      <Button variant="primary">Tìm kiếm</Button>
                    </InputGroup>
                  ) : null}
                  {show == "question" ? (
                    <InputGroup
                      style={{
                        width: "350px",
                        marginRight: "35px",
                        marginBottom: "5px",
                      }}
                    >
                      <FormControl
                        placeholder="Nhập nội dung cần tìm kiếm"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={contentOfQuestionToFind}
                        onChange={(e) => {
                          setContentOfQuestionToFind(e.target.value);
                        }}
                      />
                      <Button variant="primary">Tìm kiếm</Button>
                    </InputGroup>
                  ) : null}
                </div>

                {show == "event" ? (
                  <div className="forum-event-wrap">
                    {listBlog.map((blogItem, index) => {
                      return (
                        <>
                          <Link href={`/Forum/blog-${blogItem._id}`}>
                            <div className="post-item">
                              <div className="post-item-header">
                                <div className="user-avatar">
                                  {listAuthor.map((authorItem, index) => {
                                    if (authorItem._id == blogItem.userID) {
                                      return (
                                        <img
                                          style={{
                                            border: "2px solid #0d6efd",
                                            objectFit: "cover",
                                          }}
                                          src={authorItem.avatar}
                                        ></img>
                                      );
                                    }
                                  })}
                                </div>
                                <div className="user-name">
                                  {listAuthor.map((authorItem, index) => {
                                    if (authorItem._id == blogItem.userID) {
                                      return <>{authorItem.fullname}</>;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="post-item-content">
                                <div className="post-title">
                                  <h5>{blogItem.title}</h5>
                                </div>
                                <div className="post-content">
                                  {blogItem?.content ? (
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          blogItem?.content?.substr(0, 700) +
                                          "...xem thêm",
                                      }}
                                    />
                                  ) : (
                                    <div>... is loading</div>
                                  )}
                                  <img src={`${blogItem.image}`}></img>
                                </div>
                              </div>
                              <div className="post-item-footer">
                                {dateWriteBlogs.map((dateItem, index) => {
                                  if (dateItem.blogID == blogItem._id) {
                                    let day =
                                      dateItem.date.day < 10
                                        ? "0" + dateItem.date.day
                                        : dateItem.date.day;
                                    let month =
                                      dateItem.date.month < 10
                                        ? "0" + dateItem.date.month
                                        : dateItem.date.month;
                                    let year =
                                      dateItem.date.year < 10
                                        ? "0" + dateItem.date.year
                                        : dateItem.date.year;
                                    return (
                                      <>
                                        {day}/{month}/{year}
                                      </>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                  </div>
                ) : null}
                {show == "question" ? (
                  <div className="forum-question-wrap">
                    {listQuestionInForum.map((quesItem, index) => {
                      if (quesItem.status) {
                        return (
                          <>
                            <Link href={`/Forum/question-${quesItem._id}`}>
                              <div className="forum-question-item">
                                <div className="forum-question-item-header">
                                  <div className="user-avatar">
                                    {listAuthorOfQuestionInForum.map(
                                      (authorItem, index) => {
                                        if (authorItem._id == quesItem.userID) {
                                          return (
                                            <img
                                              style={{
                                                border: "2px solid #0d6efd",
                                                objectFit: "cover",
                                              }}
                                              src={authorItem.avatar}
                                            ></img>
                                          );
                                        }
                                      }
                                    )}
                                  </div>
                                  <div className="user-name">
                                    {listAuthorOfQuestionInForum.map(
                                      (authorItem, index) => {
                                        if (authorItem._id == quesItem.userID) {
                                          return <>{authorItem.fullname}</>;
                                        }
                                      }
                                    )}
                                  </div>
                                </div>
                                <div className="forum-question-item-content">
                                  <div className="forum-question-title">
                                    <h5>{quesItem.title}</h5>
                                  </div>
                                  <div className="forum-question-content">
                                    <p>{quesItem.content}</p>
                                  </div>
                                </div>
                                <div className="forum-question-item-footer">
                                  <div className="forum-question-time">
                                    {dateWriteQuestions.map(
                                      (dateItem, index) => {
                                        if (
                                          dateItem.questionID == quesItem._id
                                        ) {
                                          let day =
                                            dateItem.date.day < 10
                                              ? "0" + dateItem.date.day
                                              : dateItem.date.day;
                                          let month =
                                            dateItem.date.month < 10
                                              ? "0" + dateItem.date.month
                                              : dateItem.date.month;
                                          let year =
                                            dateItem.date.year < 10
                                              ? "0" + dateItem.date.year
                                              : dateItem.date.year;
                                          return (
                                            <>
                                              {day}/{month}/{year}
                                            </>
                                          );
                                        }
                                      }
                                    )}
                                  </div>
                                  <div className="forum-question-interactive">
                                    <ion-icon
                                      class="icon-heart"
                                      name="heart-circle-outline"
                                    ></ion-icon>
                                    <ion-icon
                                      class="icon-comment"
                                      name="chatbox-outline"
                                    ></ion-icon>
                                    <ion-icon
                                      class="icon-sharing"
                                      name="arrow-redo-outline"
                                    ></ion-icon>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </>
                        );
                      }
                    })}
                  </div>
                ) : null}
                {show == "my-question" ? (
                  <div className="forum-question-wrap">
                    <div className="forum-question-item">
                      <div className="forum-question-item-header">
                        <div className="user-name">
                          <h5>Danh sách câu hỏi của bạn</h5>
                          <Button
                            onClick={() => {
                              handleShowAddQuestion();
                            }}
                          >
                            Thêm mới
                          </Button>
                        </div>
                      </div>
                      <div className="forum-question-item-content">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Tiêu đề</th>
                              <th>Nội dung</th>
                              <th>Trạng thái</th>
                              <th>Chức năng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listQuestionOfUser.map((quesItem, index) => {
                              return (
                                <>
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{quesItem.title}</td>
                                    <td>{quesItem.content}</td>
                                    <td style={{ minWidth: "110px" }}>
                                      {quesItem.status ? (
                                        <span
                                          style={{
                                            color: "green",
                                            fontWeight: "600",
                                          }}
                                        >
                                          <ion-icon name="checkmark-outline"></ion-icon>
                                          Đã duyệt
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            color: "#fec416",
                                            fontWeight: "600",
                                          }}
                                        >
                                          ...Đợi duyệt
                                        </span>
                                      )}
                                    </td>
                                    <td style={{ minWidth: "170px" }}>
                                      <Button
                                        variant="warning"
                                        onClick={() => {
                                          handleShowUpdateQuestion();
                                          setQuestionTitle(quesItem.title);
                                          setQuestionCateID(quesItem.catQueID);
                                          setQuestionContent(quesItem.content);
                                          setQuestionIDToUpdate(quesItem._id);
                                        }}
                                      >
                                        Cật nhật
                                      </Button>
                                      <Button
                                        variant="danger"
                                        onClick={() => {
                                          handleShowConfirmDeleteQuestion();
                                          setQuestionIDToDelete(quesItem._id);
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
                        <div className="forum-question-content"></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="forum-blog-pagination">
                  {show == "event" ? (
                    <Pagination>
                      <Pagination.Prev />
                      {totalBlogPage.map((item) => {
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
                  ) : null}
                  {show == "question" ? (
                    <Pagination>
                      <Pagination.Prev />
                      {totalPageOfAllQuestion.map((item) => {
                        return (
                          <>
                            <Pagination.Item
                              className="pagination_item"
                              onClick={(e) => {
                                getListQuestionInForum(item);
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
                  ) : null}
                  {show == "my-question" ? (
                    <Pagination>
                      <Pagination.Prev />
                      {totalPageOfMyQuestion.map((item) => {
                        return (
                          <>
                            <Pagination.Item
                              className="pagination_item"
                              onClick={(e) => {
                                getQuestionInForumByUser(item);
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
                  ) : null}
                </div>
              </div>
            </Col>
            <Col xs={4} ms={4}>
              <div className="forum-slidebar-wrap">
                <div className="forum-slidebar-content">
                  <div className="slidebar-title">
                    <ul>
                      <li>Chủ đề</li>
                    </ul>
                  </div>
                  {show == "event" ? (
                    <div className="slidebar-content">
                      <div
                        className="btn btn-light"
                        onClick={() => {
                          setCateBlogToFind("");
                        }}
                      >
                        Tất cả thể loại
                      </div>
                      {listCateBlog.map((cateItem, index) => {
                        return (
                          <>
                            <div
                              className="btn btn-light"
                              onClick={() => {
                                setCateBlogToFind(cateItem._id);
                              }}
                            >
                              {cateItem.category}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : null}
                  {show == "question" ? (
                    <div className="slidebar-content">
                      <div
                        className="btn btn-light"
                        onClick={() => {
                          setCateOfQuestionToFind("");
                        }}
                      >
                        Tất cả thể loại
                      </div>
                      {listCateQuestion.map((cateItem, index) => {
                        return (
                          <>
                            <div
                              className="btn btn-light"
                              onClick={() => {
                                setCateOfQuestionToFind(cateItem._id);
                              }}
                            >
                              {cateItem.catQueName}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : null}
                  {show == "my-question" ? (
                    <div className="slidebar-content">
                      {listCateQuestion.map((cateItem, index) => {
                        return (
                          <>
                            <div className="btn btn-light">
                              {cateItem.catQueName}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>{" "}
          {/* Modal handle add */}
          <Modal show={showAddQuestion} onHide={handleCloseAddQuestion}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm mới câu hỏi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    placeholder=""
                    autoFocus
                    value={questionTitle}
                    onChange={(e) => {
                      setQuestionTitle(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Chủ đề</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={questionCateID}
                    onChange={(e) => {
                      setQuestionCateID(e.target.value);
                    }}
                  >
                    <option>-- Chủ đề --</option>
                    {listCateQuestion.map((cateItem, index) => {
                      return (
                        <>
                          <option value={cateItem._id}>
                            {cateItem.catQueName}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Nội dung câu hỏi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={questionContent}
                    onChange={(e) => {
                      setQuestionContent(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddQuestion}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleAddQuestion}>
                Gửi câu hỏi
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal handle update */}
          <Modal show={showUpdateQuestion} onHide={handleCloseUpdateQuestion}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật câu hỏi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    placeholder=""
                    autoFocus
                    value={questionTitle}
                    onChange={(e) => {
                      setQuestionTitle(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Chủ đề</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={questionCateID}
                    onChange={(e) => {
                      setQuestionCateID(e.target.value);
                    }}
                  >
                    <option>-- Chủ đề --</option>
                    {listCateQuestion.map((cateItem, index) => {
                      return (
                        <>
                          <option value={cateItem._id}>
                            {cateItem.catQueName}
                          </option>
                        </>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Nội dung câu hỏi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={questionContent}
                    onChange={(e) => {
                      setQuestionContent(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdateQuestion}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleUpdateQuestion}>
                Cập nhật
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
      </MathJaxContext>
    </>
  );
};
Forum.layout = "userLayout";
export default Forum;
