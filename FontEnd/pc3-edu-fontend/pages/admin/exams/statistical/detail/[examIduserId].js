import {
  Row,
  Col,
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createAxios } from "../../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../../redux/authSlice";
import useTeacherAuth from "../../../../../hooks/authTeacherHook";
const Exam = () => {
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  const isTeacher = useTeacherAuth();
  const [listQuestion, setListQuestion] = useState([]);
  const [exam, setExam] = useState({});
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const userID_LessionID = arrayTemp[position];
  const arrayTemp2 = userID_LessionID.split("-");
  const userID = arrayTemp2[0];
  const examID = arrayTemp2[1];
  const router = useRouter();

  const [timeDone, setTimeDone] = useState(-1);
  const [statisticalOfExam, setStatisticalOfExam] = useState({});
  const [listAnswerOfUser, setListAnswerOfUser] = useState([]);
  const [listCateQues, setListCateQues] = useState([]);
  const [userInfor, setUserInfor] = useState({});

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  async function getUserInfor() {
    try {
      const res = await axiosJWT.get("/api/user/get-user-by-id/" + userID);
      setUserInfor(res.data.user);
    } catch (error) {
      console.log("get user error!");
    }
  }
  async function getStatisticalOfExam() {
    try {
      const dataToFind = {
        userID: userID,
        examID: examID,
      };
      const res = await axiosJWT.post(
        "/api/statistical-of-exam/get-by-user-and-exam",
        dataToFind
      );

      if (res.data.statistical._id) {
        setStatisticalOfExam(res.data.statistical);
        setTimeDone(res.data.statistical.time);

        const statisticalID = res.data.statistical._id;
        try {
          const resOfResult = await axiosJWT.get(
            "/api/result-of-exam/" + statisticalID
          );
          setListAnswerOfUser(resOfResult.data.listResultOfExam);
        } catch (err) {
          const errMessage = err.response.data.message;
          toast.error(errMessage);
        }
      }
    } catch (err) {
      router.push("exams/statistical/" + examID);
    }
  }

  async function getExam() {
    try {
      const res = await axiosJWT.get("/api/exam/" + examID);
      setExam(res.data.exam);
    } catch (err) {
      const errMessage = err?.response.data.message;
      toast.error(errMessage);
    }
  }

  async function getContenOfExam() {
    try {
      const res = await axiosJWT.get("/api/exam-question/list/" + examID);
      console.log("content of exam:", res.data.listExamQuestion);
      setListQuestion(res.data.listExamQuestion);
      setListCateQues(res.data.listCateQues);
    } catch (err) {
      const errMessage = err?.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    if (isTeacher) {
      getExam();
      getContenOfExam();
      getStatisticalOfExam();
      getUserInfor();
    }
  }, []);
  return (
    <MathJaxContext config={config}>
      <div className="detail-exam-page">
        <Row>
          <Col xs={8} ms={8}>
            <div className="exam-wrap">
              <div className="exam-title">
                <h3>Kết Quả Bài Thi</h3>
              </div>
              <div className="exam-content">
                {listQuestion.map((questionItem, index) => {
                  return (
                    <MathJax key={index}>
                      {/* start question */}
                      <div className="exam-item-wrap">
                        {/* <div className="exam-item-type">Nhận biết</div> */}
                        <div className="exam-item-title">
                          <div className="exam-item-title-header">
                            <label>câu {index + 1}:</label>
                            <div className="result-exam-question-type">
                              {listCateQues.map((cateQuesItem, index) => {
                                if (questionItem.catExeID == cateQuesItem._id) {
                                  return <>{cateQuesItem.description}</>;
                                }
                              })}
                            </div>
                          </div>

                          <p
                            dangerouslySetInnerHTML={{
                              __html: questionItem.question,
                            }}
                          />
                        </div>
                        <div className="exam-item-content">
                          <Form
                            className="answers-of-question"
                            id={`form-for-question-${index}`}
                          >
                            <Row xs={2} ms={2} lg={2}>
                              <Col xs={6} ms={6}>
                                <div className="answer">
                                  A.&#160;
                                  <lable
                                    dangerouslySetInnerHTML={{
                                      __html: questionItem.option1,
                                    }}
                                  ></lable>
                                </div>
                              </Col>
                              <Col xs={6} ms={6}>
                                <div className="answer">
                                  B.&#160;
                                  <lable
                                    dangerouslySetInnerHTML={{
                                      __html: questionItem.option2,
                                    }}
                                  ></lable>
                                </div>
                              </Col>
                            </Row>
                            <Row xs={2} ms={2} lg={2}>
                              <Col xs={6} ms={6}>
                                <div className="answer">
                                  C.&#160;
                                  <lable
                                    dangerouslySetInnerHTML={{
                                      __html: questionItem.option3,
                                    }}
                                  ></lable>
                                </div>
                              </Col>
                              <Col xs={6} ms={6}>
                                <div className="answer">
                                  D.&#160;
                                  <lable
                                    dangerouslySetInnerHTML={{
                                      __html: questionItem.option4,
                                    }}
                                  ></lable>
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                        <div className="result-exam-user-answer-wrap">
                          <div className="result-exam-question-answer">
                            Đáp án:&#160;
                            <>
                              {questionItem.answer == "option1" ? (
                                <div className="result-exam-option">
                                  A&#160;
                                </div>
                              ) : questionItem.answer == "option2" ? (
                                <div className="result-exam-option">
                                  B&#160;
                                </div>
                              ) : questionItem.answer == "option3" ? (
                                <div className="result-exam-option">
                                  C&#160;
                                </div>
                              ) : questionItem.answer == "option4" ? (
                                <div className="result-exam-option">
                                  D&#160;
                                </div>
                              ) : null}
                            </>
                          </div>
                          <div className="result-exam-user-answer">
                            <div>Đã chọn:&#160;</div>
                            {listAnswerOfUser.map((answerItem, index) => {
                              if (questionItem._id == answerItem.exaQuesID) {
                                return (
                                  <>
                                    {answerItem.option == "option1" ? (
                                      <div className="result-exam-option">
                                        A&#160;
                                      </div>
                                    ) : answerItem.option == "option2" ? (
                                      <div className="result-exam-option">
                                        B&#160;
                                      </div>
                                    ) : answerItem.option == "option3" ? (
                                      <div className="result-exam-option">
                                        C&#160;
                                      </div>
                                    ) : answerItem.option == "option4" ? (
                                      <div className="result-exam-option">
                                        D&#160;
                                      </div>
                                    ) : null}
                                    {/* result */}
                                    {answerItem.exaQuesID == questionItem._id &&
                                    questionItem.answer == answerItem.option ? (
                                      <div className="result-final-true">
                                        <ion-icon name="checkmark-outline"></ion-icon>
                                        Chính xác
                                      </div>
                                    ) : null}
                                    {answerItem.exaQuesID == questionItem._id &&
                                    questionItem.answer != answerItem.option &&
                                    answerItem.option != "" ? (
                                      <div className="result-final-false">
                                        <ion-icon name="close-outline"></ion-icon>
                                        Sai rồi
                                      </div>
                                    ) : null}
                                    {answerItem.exaQuesID == questionItem._id &&
                                    answerItem.option == "" ? (
                                      <div className="result-final-false">
                                        <ion-icon name="close-outline"></ion-icon>
                                        Chưa chọn
                                      </div>
                                    ) : null}
                                  </>
                                );
                              }
                            })}
                          </div>

                          <div className="result-exam-explain">
                            <OverlayTrigger
                              trigger="click"
                              key={"top"}
                              placement={"left"}
                              overlay={
                                <Popover id={`popover-positioned-top`}>
                                  <Popover.Header as="h3">
                                    Lời giải
                                  </Popover.Header>
                                  <Popover.Body>
                                    {" "}
                                    <lable
                                      dangerouslySetInnerHTML={{
                                        __html: questionItem.explain,
                                      }}
                                    ></lable>
                                  </Popover.Body>
                                </Popover>
                              }
                            >
                              <Button variant="primary" onClick={() => {}}>
                                Lời giải
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                      {/* end question */}
                    </MathJax>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col xs={4} ms={4}>
            <div className="exam-slidebar-wrap">
              <div className="slidebar-title">
                <h4>{exam.title}</h4>
              </div>
              <div className="slidebar-content">
                <h6>Họ và tên: {userInfor.fullname}</h6>
                <h6>Lớp: {userInfor.class}</h6>

                <h6>Tổng thời gian: {exam.time} phút</h6>
                <h6>
                  Số câu đúng: {statisticalOfExam.totalAnswerTrue}/
                  {listQuestion.length}
                </h6>
                <h6>Điểm số: {statisticalOfExam.score}</h6>
                <div className="slidebar-nav">
                  <div className="timer mt-4">
                    <div className="timer-title">
                      <h4>Thời gian hoàn thành</h4>
                    </div>
                    <div className="timer-content">
                      {timeDone == -1 ? <span>00:00:00</span> : null}
                      {/* hour */}
                      {Math.floor(timeDone / 60 / 60) < 10 && timeDone != -1 ? (
                        <span>0{Math.floor(timeDone / 60 / 60)}:</span>
                      ) : timeDone != -1 ? (
                        <span>{Math.floor(timeDone / 60 / 60)}:</span>
                      ) : null}
                      {/* minute */}
                      {Math.floor(timeDone / 60) < 10 && timeDone != -1 ? (
                        <span>0{Math.floor(timeDone / 60)}:</span>
                      ) : timeDone != -1 ? (
                        <span>{Math.floor(timeDone / 60)}:</span>
                      ) : null}
                      {/* second */}
                      {Math.floor(timeDone) - Math.floor(timeDone / 60) * 60 <
                        10 && timeDone != -1 ? (
                        <span>
                          0
                          {Math.floor(timeDone) -
                            Math.floor(timeDone / 60) * 60}
                        </span>
                      ) : timeDone != -1 ? (
                        <span>
                          {Math.floor(timeDone) -
                            Math.floor(timeDone / 60) * 60}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="button-nav mt-4">
                    <Button
                      variant="warning"
                      onClick={() => {
                        window.history.back();
                      }}
                    >
                      Quay lại <ion-icon name="log-out-outline"></ion-icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </MathJaxContext>
  );
};
Exam.layout = "adminLayout";
export default Exam;
