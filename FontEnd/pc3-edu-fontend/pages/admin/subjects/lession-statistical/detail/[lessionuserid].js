import {
  Col,
  Row,
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const Exercise = () => {
  const router = useRouter();
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
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
  import { useSelector } from "react-redux";
  import { useRouter } from "next/router";
  const Exam = () => {
    const config = {
      loader: { load: ["input/asciimath"] },
    };
    const [listQuestion, setListQuestion] = useState([]);
    const [exam, setExam] = useState({});
    const url = window.location.pathname;
    const arrayTemp = url.split("/");
    const position = arrayTemp.length - 1;
    const examID = arrayTemp[position];
    const router = useRouter();
    const currentUser = useSelector((state) => {
      return state.auth.login.currentUser;
    });
  
    const [timeDone, setTimeDone] = useState(-1);
    const [statisticalOfExam, setStatisticalOfExam] = useState({});
    const [listAnswerOfUser, setListAnswerOfUser] = useState([]);
    const [listCateQues, setListCateQues] = useState([]);
  
    const [showConfirmRedo, setShowConfirmRedo] = useState(false);
  
    const handleCloseConfirmRedo = () => setShowConfirmRedo(false);
    const handleShowConfirmRedo = () => setShowConfirmRedo(true);
  
    const buttonRedo = useRef();
  
    async function getStatisticalOfExam() {
      try {
        const dataToFind = {
          userID: currentUser.userInfor._id,
          examID: examID,
        };
        const res = await axios.post(
          "http://localhost:8000/api/statistical-of-exam/get-by-user-and-exam",
          dataToFind
        );
  
        if (res.data.statistical._id) {
          setStatisticalOfExam(res.data.statistical);
          setTimeDone(res.data.statistical.time);
  
          const statisticalID = res.data.statistical._id;
          try {
            const resOfResult = await axios.get(
              "http://localhost:8000/api/result-of-exam/" + statisticalID
            );
            setListAnswerOfUser(resOfResult.data.listResultOfExam);
          } catch (err) {
            const errMessage = err.response.data.message;
            toast.error(errMessage);
          }
        }
      } catch (err) {
        router.push("/Exams/" + examID);
      }
    }
  
    async function getExam() {
      try {
        const res = await axios.get("http://localhost:8000/api/exam/" + examID);
        setExam(res.data.exam);
      } catch (err) {
        const errMessage = err?.response.data.message;
        toast.error(errMessage);
      }
    }
  
    async function getContenOfExam() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/exam-question/list/" + examID
        );
        console.log("content of exam:", res.data.listExamQuestion);
        setListQuestion(res.data.listExamQuestion);
        setListCateQues(res.data.listCateQues);
      } catch (err) {
        const errMessage = err?.response.data.message;
        toast.error(errMessage);
      }
    }
  
    async function handleRedo() {
      try {
        const dataToDelete = {
          userID: currentUser.userInfor._id,
          examID: examID,
        };
        const res = await axios.post(
          "http://localhost:8000/api/statistical-of-exam/delete/by-user-and-exam",
          dataToDelete
        );
        setTimeout(() => {
          router.push("/Exams/" + examID);
        }, 300);
      } catch (err) {
        const errMessage = err?.response.data.message;
        toast.error(errMessage);
      }
    }
  
    useEffect(() => {
      getExam();
      getContenOfExam();
      getStatisticalOfExam();
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
                            <label>câu {index + 1}:</label>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: questionItem.question,
                              }}
                            />
                            <div className="result-exam-question-type">
                              {listCateQues.map((cateQuesItem, index) => {
                                if (questionItem.catExeID == cateQuesItem._id) {
                                  return <>{cateQuesItem.description}</>;
                                }
                              })}
                            </div>
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
                  <h5>Tổng số câu: {listQuestion.length}</h5>
                  <h5>Tổng thời gian: {exam.time} phút</h5>
                  <h5>Số câu đúng: {statisticalOfExam.totalAnswerTrue}</h5>
                  <h5>Điểm số: {statisticalOfExam.score}</h5>
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
                        {Math.floor(timeDone) < 10 && timeDone != -1 ? (
                          <span>0{Math.floor(timeDone)}</span>
                        ) : timeDone != -1 ? (
                          <span>{Math.floor(timeDone)}</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="button-nav mt-4">
                      <Button
                        variant="success"
                        ref={buttonRedo}
                        onClick={() => {
                          handleShowConfirmRedo();
                        }}
                      >
                        Làm lại <ion-icon name="document-text-outline"></ion-icon>
                      </Button>
                      <Link href={`/Exams/${examID}`}>
                        <Button variant="warning">
                          Quay lại <ion-icon name="log-out-outline"></ion-icon>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Modal show={showConfirmRedo} onHide={handleCloseConfirmRedo}>
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "18px" }}>
                  Kết quả cũ sẽ bị xóa! bạn có chắc chắn muốn làm lại.
                </span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmRedo}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseConfirmRedo();
                  handleRedo();
                }}
              >
                Làm lại
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </MathJaxContext>
    );
  };
  Exam.layout = "userLayout";
  export default Exam;
  

  const [lession, setLession] = useState({});
  const [listMCExercise, setListMCExercise] = useState([]);
  const [listCatExe, setListCatExe] = useState([]);
  const [listAnswerOfUser, setListAnswerOfUser] = useState([]);
  const [statisticalInfor, setStatisticalInfor] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  function handleCloseConfirm() {
    setShowConfirm(false);
  }
  function handleShowConfirm() {
    setShowConfirm(true);
  }

  async function getResult() {
    const dataToFind = {
      userID: userID,
      lessionID: lessionID,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/statistical-of-exercise/by-user-and-lession",
        dataToFind
      );
      setStatisticalInfor(res.data);

      if (res.data.statisticalOfExercise._id) {
        const statisticalID = res.data.statisticalOfExercise._id;
        try {
          const resOfResult = await axios.get(
            "http://localhost:8000/api/result-of-exercise/" + statisticalID
          );
          setListAnswerOfUser(resOfResult.data.listResultOfExercise);
        } catch (err) {
          const errMessage = err.response.data.message;
          toast.error(errMessage);
        }
      }
    } catch (err) {
      router.push("/admin/subjects");
      const errMessage =
        err?.response?.data?.message ?? "không tồn tại kết quả";
      toast.error(errMessage);
    }
  }

  async function getMCExercises() {
    if (lessionID) {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/mcexercise/mcexercise-by-lession/" +
            lessionID
        );
        setLession(res.data.lession);

        setListCatExe(res.data.categoryOfExercise);
        setListMCExercise(res.data.listMCExercise);
      } catch (err) {
        const errMessage = err?.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  useEffect(() => {
    getResult();
    getMCExercises();
  }, []);

  return (
    <>
      <MathJaxContext config={config}>
        <Row>
          <Col lg={9} md={9} xs={9}>
            <div className="content-of-exercise-result-wrap">
              <div className="content-of-exercise-result-title">
                <div>
                  <h5>{lession.lessionName}</h5>
                </div>
                <div>
                  <Button
                    variant="warning"
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    Quay lại
                  </Button>
                </div>
              </div>
              <div className="content-of-exercise-result">
                <h5>Kết quả đã làm:</h5>
                {listMCExercise.map((mcexerciseItem, index) => {
                  return (
                    <div
                      className="content-of-exercise-result-exercise"
                      key={index}
                    >
                      <MathJax>
                        <div className="content-of-exercise-result-question">
                          <h6>câu {index + 1}:</h6>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: mcexerciseItem?.question,
                            }}
                          />
                          <label>
                            {listCatExe.map((cateItem, index) => {
                              return (
                                <>
                                  {mcexerciseItem.catExeID == cateItem._id
                                    ? cateItem.description
                                    : null}
                                </>
                              );
                            })}
                          </label>
                        </div>
                        <div className="content-of-exercise-result-answer">
                          <Row md={2} lg={2} xs={2}>
                            <div style={{ display: "flex" }}>
                              A.&nbsp;{" "}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: mcexerciseItem?.option1,
                                }}
                              />
                            </div>

                            <div style={{ display: "flex" }}>
                              B.&nbsp;{" "}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: mcexerciseItem?.option2,
                                }}
                              />
                            </div>
                            <div style={{ display: "flex" }}>
                              C.&nbsp;{" "}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: mcexerciseItem?.option3,
                                }}
                              />
                            </div>
                            <div style={{ display: "flex" }}>
                              D.&nbsp;{" "}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: mcexerciseItem?.option4,
                                }}
                              />
                            </div>
                          </Row>
                        </div>
                        <div className="content-of-exercise-result-user-answer">
                          <div className="content-of-exercise-result-answer-final">
                            {" "}
                            <h6>Đáp án:&nbsp;</h6>
                            {mcexerciseItem.answer == "option1" ? (
                              <div style={{ display: "flex" }}>
                                A.&nbsp;{" "}
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option1,
                                  }}
                                />
                              </div>
                            ) : mcexerciseItem.answer == "option2" ? (
                              <div style={{ display: "flex" }}>
                                B.&nbsp;{" "}
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option2,
                                  }}
                                />
                              </div>
                            ) : mcexerciseItem.answer == "option3" ? (
                              <div style={{ display: "flex" }}>
                                C.&nbsp;{" "}
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option3,
                                  }}
                                />
                              </div>
                            ) : mcexerciseItem.answer == "option4" ? (
                              <div style={{ display: "flex" }}>
                                D.&nbsp;{" "}
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option4,
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                          <div className="content-of-exercise-result-answer-final">
                            {" "}
                            <h6>Đã chọn:&nbsp;</h6>
                            {listAnswerOfUser.map((answerItem, index) => {
                              return (
                                <>
                                  {answerItem.MCExerciseID ==
                                    mcexerciseItem._id &&
                                  answerItem.option == "option1" ? (
                                    <div style={{ display: "flex" }}>
                                      A.&nbsp;{" "}
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: mcexerciseItem?.option1,
                                        }}
                                      />
                                    </div>
                                  ) : answerItem.MCExerciseID ==
                                      mcexerciseItem._id &&
                                    answerItem.option == "option2" ? (
                                    <div style={{ display: "flex" }}>
                                      B.&nbsp;{" "}
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: mcexerciseItem?.option2,
                                        }}
                                      />
                                    </div>
                                  ) : answerItem.MCExerciseID ==
                                      mcexerciseItem._id &&
                                    answerItem.option == "option3" ? (
                                    <div style={{ display: "flex" }}>
                                      C.&nbsp;{" "}
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: mcexerciseItem?.option3,
                                        }}
                                      />
                                    </div>
                                  ) : answerItem.MCExerciseID ==
                                      mcexerciseItem._id &&
                                    answerItem.option == "option4" ? (
                                    <div style={{ display: "flex" }}>
                                      D.&nbsp;{" "}
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: mcexerciseItem?.option4,
                                        }}
                                      />
                                    </div>
                                  ) : null}
                                  {answerItem.MCExerciseID ==
                                    mcexerciseItem._id &&
                                  mcexerciseItem.answer == answerItem.option ? (
                                    <div className="result-final-true">
                                      <ion-icon name="checkmark-outline"></ion-icon>
                                      Chính xác
                                    </div>
                                  ) : null}
                                  {answerItem.MCExerciseID ==
                                    mcexerciseItem._id &&
                                  mcexerciseItem.answer != answerItem.option ? (
                                    <div className="result-final-false">
                                      <ion-icon name="close-outline"></ion-icon>
                                      Sai rồi
                                    </div>
                                  ) : null}
                                </>
                              );
                            })}
                          </div>
                        </div>
                        <div className="result-exercise-explain">
                          <OverlayTrigger
                            trigger="click"
                            key={"key"}
                            placement={"top"}
                            overlay={
                              <Popover id={`explain`}>
                                <Popover.Header as="h3">
                                  Lời giải
                                </Popover.Header>
                                <Popover.Body>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: mcexerciseItem?.explain,
                                    }}
                                  />
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <Button variant="outline-primary">Cách giải</Button>
                          </OverlayTrigger>
                        </div>
                      </MathJax>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col lg={3} md={3} xs={3}>
            <div className="sidebar-of-exercise-result-wrap">
              <h5>Thông tin người làm</h5>
              <h6>Họ và tên: {statisticalInfor?.userInfor?.fullname} </h6>
              <h6> Lớp: {statisticalInfor?.userInfor?.class}</h6>
              <h6>
                {" "}
                Điểm số: {statisticalInfor?.statisticalOfExercise?.score}
              </h6>
              <h6>
                {" "}
                Thời gian: {/* hour */}
                {Math.floor(
                  statisticalInfor?.statisticalOfExercise?.time / 60 / 60
                ) < 10 &&
                statisticalInfor?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    0
                    {Math.floor(
                      statisticalInfor?.statisticalOfExercise?.time / 60 / 60
                    )}
                    :
                  </span>
                ) : statisticalInfor?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    {Math.floor(
                      statisticalInfor?.statisticalOfExercise?.time / 60 / 60
                    )}
                    :
                  </span>
                ) : null}
                {/* minute */}
                {Math.floor(
                  statisticalInfor?.statisticalOfExercise?.time / 60
                ) < 10 &&
                statisticalInfor?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    0
                    {Math.floor(
                      statisticalInfor?.statisticalOfExercise?.time / 60
                    )}
                    :
                  </span>
                ) : statisticalInfor?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    {Math.floor(
                      statisticalInfor?.statisticalOfExercise?.time / 60
                    )}
                    :
                  </span>
                ) : null}
                {/* second */}
                {Math.floor(statisticalInfor?.statisticalOfExercise?.time) <
                  10 && statisticalInfor?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    0{Math.floor(statisticalInfor?.statisticalOfExercise?.time)}
                  </span>
                ) : statisticalInfor?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    {Math.floor(statisticalInfor?.statisticalOfExercise?.time)}
                  </span>
                ) : null}
              </h6>
            </div>
          </Col>
        </Row>
      </MathJaxContext>
    </>
  );
};
Exercise.layout = "adminLayout";
export default Exercise;
