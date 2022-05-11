import {
  Col,
  Row,
  Button,
  InputGroup,
  FormControl,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Forum = () => {
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
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

  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const handleCloseAddQuestion = () => setShowAddQuestion(false);
  const handleShowAddQuestion = () => setShowAddQuestion(true);
  async function getBlogCategory() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/category-blog/list"
      );
      setListCateBlog(res.data.listCateBlog);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function getListBlog() {
    try {
      const res = await axios.get("http://localhost:8000/api/blog/list");

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
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  // function question in forum
  async function getQuestionInForumByUser() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/question-in-forum/user/" +
          currentUser.userInfor._id
      );
      setListQuestionOfUser(res.data.listQuestionInForum);
    } catch (err) {
      const errMessage = err.response.data.message;
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
        const res = await axios.post(
          "http://localhost:8000/api/question-in-forum/create",
          dataToAdd
        );
        toast.success("Đã gửi câu hỏi thành công. chờ admin kiểm duyệt nhé!");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
      handleCloseAddQuestion();
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
  // function question in forum

  useEffect(() => {
    getListBlog();
    getBlogCategory();
    getListCateQuestion();
    getQuestionInForumByUser();
  }, []);
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
                      onClick={() => {
                        setShow("event");
                      }}
                    >
                      Sự Kiện
                    </li>
                    <li
                      onClick={() => {
                        setShow("question");
                      }}
                    >
                      Hỏi Đáp
                    </li>
                    <li
                      onClick={() => {
                        setShow("my-question");
                      }}
                    >
                      Câu hỏi của tôi
                    </li>
                  </ul>
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
                                  <img src="/user/default-avatar.png"></img>
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
                                  <h4>{blogItem.title}</h4>
                                </div>
                                <div className="post-content">
                                  <MathJax>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: blogItem?.content,
                                      }}
                                    />
                                  </MathJax>
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
                    <div className="forum-question-item">
                      <div className="forum-question-item-header">
                        <div className="user-avatar">
                          <img src="/user/default-avatar.png"></img>
                        </div>
                        <div className="user-name">Truong Ngoc Trong</div>
                      </div>
                      <div className="forum-question-item-content">
                        <div className="forum-question-title">
                          <h4>Xin chào mọi người đây là bài viết đầu tiên</h4>
                        </div>
                        <div className="forum-question-content">
                          <p>
                            Hello anh em, việc hiển thị các keystrokes (tạm
                            dịch: “tổ hợp phím”) trong quá trình làm video hướng
                            dẫn, highlight nội dung bạn đang gõ lên màn hình.
                            Nếu bạn có nhu cầu đó thì đây là bài viết dành cho
                            bạn...
                          </p>
                        </div>
                      </div>
                      <div className="forum-question-item-footer">
                        <div className="forum-question-time">
                          12/03/2022 - 4:46 phút
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
                                    <td>
                                      {quesItem.status == true ? (
                                        <>Đã duyệt</>
                                      ) : (
                                        <>Chờ duyệt</>
                                      )}
                                    </td>
                                    <td>
                                      <Button style={{ margin: "5px" }}>
                                        Chi tiết
                                      </Button>
                                      <Button variant="danger">Xóa</Button>
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
                  <div className="slidebar-content">
                    {listCateBlog.map((cateItem, index) => {
                      return (
                        <>
                          <div className="btn btn-light">
                            {cateItem.category}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Col>
          </Row>{" "}
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
        </div>
      </MathJaxContext>
    </>
  );
};
Forum.layout = "userLayout";
export default Forum;
