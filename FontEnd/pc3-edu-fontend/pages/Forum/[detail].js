import { useRouter } from "next/dist/client/router";
import { useEffect, useState, useRef } from "react";
import {
  Col,
  Row,
  Button,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import useAuth from "../../hooks/authHook";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";

const Detail = () => {
  const isAuth = useAuth();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const [showComment, setShowComment] = useState(false);
  const handelShowComment = () => {
    setShowComment(!showComment);
  };
  const urlTemp = window.location.pathname;
  const arrayTemp = urlTemp.split("/");
  const position = arrayTemp.length - 1;
  const url = arrayTemp[position];
  let type;
  let array;
  let id;
  if (url != null) {
    array = url.split("-");
    type = array[0];
    id = array[1];
  }
  const [contentOfBlog, setContentOfBlog] = useState({});
  const [author, setAuthor] = useState({});
  const [dateWriteBlog, setDateWriteBlog] = useState({});

  const [contentOfQuestion, setContentOfQuestion] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const [listComment, setListComment] = useState([]);
  const [listUserComment, setListUserComment] = useState([]);

  const [commentIDToDelete, setCommentIDToDelete] = useState("");
  const [showConfirmDeleteComment, setShowConfirmDeleteComment] =
    useState(false);
  function handleShowConfirmDeleteComment() {
    setShowConfirmDeleteComment(true);
  }
  function handleCloseConfirmDeleteComment() {
    setShowConfirmDeleteComment(false);
  }
  async function getContentOfBlog() {
    try {
      const res = await axiosJWT.get("/api/blog/" + id);
      console.log("res", res);
      setAuthor(res.data.author[0]);
      console.log("ng?????i l??m", res.data.author[0]);
      setContentOfBlog(res.data.blog);
      let dateTemp = new Date(res.data.blog.createdAt);
      let year = dateTemp.getFullYear();
      let month = dateTemp.getMonth() + 1;
      let day = dateTemp.getDate();
      const dateWriteBlogTemp = {
        day,
        month,
        year,
      };
      setDateWriteBlog(dateWriteBlogTemp);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  async function getContentOfQuestion() {
    try {
      const res = await axiosJWT.get("/api/question-in-forum/content/" + id);
      const content = {
        questionContent: res.data.questionInForum,
        questionAuthor: res.data.author,
        questionCategory: res.data.category,
      };
      setContentOfQuestion(content);
      setListComment(res.data.listComment);
      setListUserComment(res.data.listUserComment);

      console.log("n???i dung c??u h???i", res.data);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  async function handleComment() {
    if (commentContent != "") {
      const dataToAddComment = {
        content: commentContent,
        like: 0,
        questionID: id,
        userID: currentUser.userInfor._id,
      };
      try {
        const res = await axiosJWT.post(
          "/api/comment/create",
          dataToAddComment
        );
        getContentOfQuestion();
        setCommentContent("");
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleDeleteComment() {
    try {
      const res = await axiosJWT.delete(
        "/api/comment/delete/" + commentIDToDelete
      );
      toast.success("???? x??a b??nh lu???n!");
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
    getContentOfQuestion();
    handleCloseConfirmDeleteComment();
  }

  useEffect(() => {
    if (isAuth) {
      if (type == "blog" && id != "") {
        getContentOfBlog();
      }
      if (type == "question" && id != "") {
        getContentOfQuestion();
      }
    }
  }, []);
  const config = {
    loader: { load: ["input/asciimath"] },
  };

  return (
    <div className="forum-wrap">
      <MathJaxContext config={config}>
        <Row>
          <Col xs={8} ms={8}>
            {/* start type = event */}
            {type == "blog" ? (
              <div className="forum-event-detail">
                <div className="forum-event-detail-title-user">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={author.avatar}
                      style={{
                        border: "2px solid #0d6efd",
                        objectFit: "cover",
                      }}
                    ></img>
                    <span>{author.fullname}</span>
                  </div>

                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    Quay l???i
                  </Button>
                </div>
                <div className="forum-event-detail-title">
                  <span>{contentOfBlog.title}</span>
                </div>
                <div className="forum-event-detail-content">
                  <div className="image-forum-event-detail-content">
                    <img src={`${contentOfBlog.image}`}></img>
                  </div>
                  <MathJax>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: contentOfBlog?.content,
                      }}
                    />
                  </MathJax>
                </div>
                <div className="forum-event-detail-footer">
                  {dateWriteBlog.day < 10
                    ? "0" + dateWriteBlog.day
                    : dateWriteBlog.day}
                  /
                  {dateWriteBlog.month < 10
                    ? "0" + dateWriteBlog.month
                    : dateWriteBlog.month}
                  /
                  {dateWriteBlog.year < 10
                    ? "0" + dateWriteBlog.year
                    : dateWriteBlog.year}
                </div>
              </div>
            ) : null}
            {/* end type = event */}
            {/* start type = question */}
            {type == "question" ? (
              <div className="forum-question-detail">
                <div className="forum-question-detail-title">
                  <div className="forum-question-detail-title-user">
                    <div>
                      <img
                        style={{
                          border: "2px solid #0d6efd",
                          objectFit: "cover",
                        }}
                        src={contentOfQuestion?.questionAuthor?.avatar}
                      ></img>
                      <span>{contentOfQuestion?.questionAuthor?.fullname}</span>
                    </div>
                    <Button
                      variant="outline-warning"
                      onClick={() => {
                        window.history.back();
                      }}
                    >
                      Quay l???i
                    </Button>
                  </div>
                  <span className="question-title">
                    {contentOfQuestion?.questionCategory?.catQueName} -{" "}
                    {contentOfQuestion?.questionContent?.title}
                  </span>
                </div>
                <div className="forum-question-detail-content">
                  <span>{contentOfQuestion?.questionContent?.content}</span>
                </div>
                <div className="forum-question-detail-footer">
                  <div className="forum-question-interactive">
                    <ion-icon
                      class="icon-heart"
                      name="heart-circle-outline"
                    ></ion-icon>
                    <ion-icon
                      class="icon-comment"
                      name="chatbox-outline"
                      onClick={handelShowComment}
                    ></ion-icon>
                    <ion-icon
                      class="icon-sharing"
                      name="arrow-redo-outline"
                    ></ion-icon>
                  </div>
                </div>
                {showComment ? (
                  <div className="forum-question-detail-comment">
                    <div className="forum-question-detail-user-comment">
                      <div className="forum-question-detail-user-avatar">
                        <img src={currentUser?.userInfor?.avatar}></img>
                      </div>
                      <InputGroup>
                        <FormControl
                          placeholder="Vi???t b??nh lu???n"
                          aria-label="Recipient's username with two button addons"
                          value={commentContent}
                          onChange={(e) => {
                            setCommentContent(e.target.value);
                          }}
                        />

                        <Button
                          variant="primary"
                          onClick={() => {
                            handleComment();
                          }}
                        >
                          B??nh Lu???n
                        </Button>
                      </InputGroup>
                    </div>
                    <div className="forum-question-detail-user-commented-wrap">
                      <ul>
                        {listComment.map((commentItem, index) => {
                          return (
                            <>
                              {" "}
                              <li key={index}>
                                <div className="forum-question-detail-user-commented">
                                  <div className="forum-question-detail-user-commented-title">
                                    <div>
                                      {listUserComment.map(
                                        (authorItem, index) => {
                                          if (
                                            authorItem._id == commentItem.userID
                                          )
                                            return (
                                              <img
                                                src={authorItem?.avatar}
                                              ></img>
                                            );
                                        }
                                      )}

                                      <span>
                                        {listUserComment.map(
                                          (authorItem, index) => {
                                            if (
                                              authorItem._id ==
                                              commentItem.userID
                                            )
                                              return <>{authorItem.fullname}</>;
                                          }
                                        )}
                                      </span>
                                    </div>
                                    <div className="btn-delete">
                                      {commentItem.userID ==
                                      currentUser.userInfor._id ? (
                                        <ion-icon
                                          name="trash-outline"
                                          onClick={() => {
                                            setCommentIDToDelete(
                                              commentItem._id
                                            );
                                            handleShowConfirmDeleteComment();
                                          }}
                                        ></ion-icon>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="forum-question-detail-user-commented-content">
                                    <span>{commentItem.content}</span>
                                  </div>
                                  <div className="forum-question-detail-user-commented-footer">
                                    <ion-icon
                                      class="icon-heart"
                                      name="heart-circle-outline"
                                    ></ion-icon>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            {/* end type = question */}
          </Col>
          <Col xs={4} ms={4}>
            {type == "blog" ? (
              <div className="forum-slidebar-wrap">
                <div className="forum-slidebar-content">
                  <div className="slidebar-title">
                    <ul>
                      <li>Ch??? ?????</li>
                    </ul>
                  </div>
                  <div className="slidebar-content">
                    <div className="btn btn-light">Th??ng b??o ??o??n tr?????ng</div>
                    <div className="btn btn-light">Th??? thao</div>
                    <div className="btn btn-light">Ho???t ?????ng v??n ngh???</div>
                    <div className="btn btn-light">Ngo???i kh??a</div>
                  </div>
                </div>
              </div>
            ) : null}
            {type == "question" ? (
              <div className="forum-slidebar-wrap">
                <div className="forum-slidebar-content">
                  <div className="slidebar-title">
                    <ul>
                      <li>Ch??? ?????</li>
                    </ul>
                  </div>
                  <div className="slidebar-content">
                    <div className="btn btn-light">To??n l???p 10</div>
                    <div className="btn btn-light">V???t l?? 12</div>
                    <div className="btn btn-light">V??n h???c</div>
                    <div className="btn btn-light">H??a h???c</div>
                  </div>
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
      </MathJaxContext>
      <Modal
        show={showConfirmDeleteComment}
        onHide={handleCloseConfirmDeleteComment}
      >
        <Modal.Header closeButton>
          <Modal.Title>X??c nh???n</Modal.Title>
        </Modal.Header>
        <Modal.Body>B???n c?? ch???c ch???n mu???n x??a b??nh lu???n!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDeleteComment}>
            H???y
          </Button>
          <Button variant="danger" onClick={handleDeleteComment}>
            X??a
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
Detail.layout = "userLayout";
export default Detail;
