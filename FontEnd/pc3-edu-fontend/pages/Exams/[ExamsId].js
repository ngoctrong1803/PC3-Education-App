import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Rank from "../../comps/Rank";
import Link from "next/link";
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
  const [listAnswerOfUser, setListAnswerOfUser] = useState([]);
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const router = useRouter();

  const [timerExam, setTimerExam] = useState(-1);
  const [timeDone, setTimeDone] = useState();
  const [totalAnswerTrue, setTotalAnswerTrue] = useState(0);
  const [checkFull, setCheckFull] = useState(true);

  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [start, setStart] = useState(false);
  const [examIsDone, setExamIsDone] = useState(false);

  const handleCloseConfirmSubmit = () => setShowConfirmSubmit(false);
  const handleShowConfirmSubmit = () => setShowConfirmSubmit(true);

  const buttonSubmit = useRef();

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
      if (res.data.statistical) {
        setExamIsDone(true);
      }
    } catch (err) {}
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
    } catch (err) {
      const errMessage = err?.response.data.message;
      toast.error(errMessage);
    }
  }
  function handleAnswerOfUser() {
    let listAnswerTemp = []; // lưu trữ danh sách câu hỏi người dùng chọn
    for (var i = 0; i < listQuestion.length; i++) {
      var radios = document.getElementById("form-for-question-" + i);
      for (var j = 0; j < radios.length; j++) {
        if (radios[j].checked) {
          const userAnswer = {
            questionID: listQuestion[i]._id,
            answerOfUser: radios[j].value,
          };
          console.log("user answer:", userAnswer);
          listAnswerTemp.push(userAnswer);
          break;
        }
      }
      if (!listAnswerTemp[i]) {
        setCheckFull(false);
        const userAnswer = {
          questionID: listQuestion[i]._id,
          answerOfUser: "",
        };
        listAnswerTemp.push(userAnswer);
      }
    }
    //start check full
    let counterCheckFull = 0;
    for (var i = 0; i < listAnswerTemp.length; i++) {
      if (listAnswerTemp[i].answerOfUser == "") {
        counterCheckFull++;
      }
    }
    if (counterCheckFull == 0) {
      setCheckFull(true);
    }
    //end check full
    for (var i = 0; i < listQuestion.length; i++) {
      for (var j = 0; j < listAnswerTemp.length; j++) {
        if (listQuestion[i]._id == listAnswerTemp[j].questionID) {
          if (listQuestion[i].answer == listAnswerTemp[j].answerOfUser) {
            setTotalAnswerTrue((pre) => pre + 1);
          }
        }
      }
    }
    setListAnswerOfUser(listAnswerTemp);
    setTimeDone(exam.time * 60 - timerExam);
  }

  async function handleSaveResult() {
    buttonSubmit.current.disabled = true;
    // handle save statistical to database
    const statisticalOfExam = {
      score: (totalAnswerTrue / listQuestion.length) * 10,
      isDone: true,
      totalAnswerTrue: totalAnswerTrue,
      time: timeDone,
      userID: currentUser.userInfor._id,
      examID: examID,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/statistical-of-exam/create",
        statisticalOfExam
      );
      if (res.data.statisticalOfExam) {
        for (var i = 0; i < listAnswerOfUser.length; i++) {
          //  after have statistical
          let resultOfExam = {
            statisticalID: res.data.statisticalOfExam._id,
            option: listAnswerOfUser[i].answerOfUser,
            exaQuesID: listAnswerOfUser[i].questionID,
          };
          try {
            const resResult = await axios.post(
              "http://localhost:8000/api/result-of-exam/create",
              resultOfExam
            );
          } catch (err) {
            const errMessage = err?.response.data.message;
            toast.error(errMessage);
          }
        }
        setTimerExam(-1);
        router.push("/Exams/Result/" + examID);
      }
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
  // Effet timer
  useEffect(() => {
    async function handleOverTime() {
      //handle over time
      toast.error("Hết thời gian");
      let listAnswerTemp = []; // lưu trữ danh sách câu hỏi người dùng chọn
      for (var i = 0; i < listQuestion.length; i++) {
        var radios = document.getElementById("form-for-question-" + i);
        for (var j = 0; j < radios.length; j++) {
          if (radios[j].checked) {
            const userAnswer = {
              questionID: listQuestion[i]._id,
              answerOfUser: radios[j].value,
            };
            console.log("user answer:", userAnswer);
            listAnswerTemp.push(userAnswer);
            break;
          }
        }
        if (!listAnswerTemp[i]) {
          setCheckFull(false);
          const userAnswer = {
            questionID: listQuestion[i]._id,
            answerOfUser: "",
          };
          listAnswerTemp.push(userAnswer);
        }
      }
      //start check full
      let counterCheckFull = 0;
      for (var i = 0; i < listAnswerTemp.length; i++) {
        if (listAnswerTemp[i].answerOfUser == "") {
          counterCheckFull++;
        }
      }
      if (counterCheckFull == 0) {
        setCheckFull(true);
      }
      //end check full
      buttonSubmit.current.disabled = true;
      for (var i = 0; i < listQuestion.length; i++) {
        for (var j = 0; j < listAnswerTemp.length; j++) {
          if (listQuestion[i]._id == listAnswerTemp[j].questionID) {
            if (listQuestion[i].answer == listAnswerTemp[j].answerOfUser) {
              setTotalAnswerTrue((pre) => pre + 1);
            }
          }
        }
      }
      console.log(
        "-----------------------Xử lý nộp bài khi hết giờ----------------------"
      );
      let totalAnswerTrueTemp = 0;
      for (var i = 0; i < listQuestion.length; i++) {
        for (var j = 0; j < listAnswerTemp.length; j++) {
          if (listQuestion[i]._id == listAnswerTemp[j].questionID) {
            if (listQuestion[i].answer == listAnswerTemp[j].answerOfUser) {
              totalAnswerTrueTemp++;
            }
          }
        }
      }
      //handle save statisticalOfExam when time over
      const statisticalOfExam = {
        score: (totalAnswerTrueTemp / listQuestion.length) * 10,
        isDone: true,
        totalAnswerTrue: totalAnswerTrueTemp,
        time: exam.time * 60 - timerExam,
        userID: currentUser.userInfor._id,
        examID: examID,
      };
      try {
        const res = await axios.post(
          "http://localhost:8000/api/statistical-of-exam/create",
          statisticalOfExam
        );
        if (res.data.statisticalOfExam) {
          for (var i = 0; i < listAnswerTemp.length; i++) {
            //after have statistical
            let resultOfExam = {
              statisticalID: res.data.statisticalOfExam._id,
              option: listAnswerTemp[i].answerOfUser,
              exaQuesID: listAnswerTemp[i].questionID,
            };
            try {
              const resResult = await axios.post(
                "http://localhost:8000/api/result-of-exam/create",
                resultOfExam
              );
            } catch (err) {
              const errMessage = err?.response.data.message;
              toast.error(errMessage);
            }
          }
        }
      } catch (err) {
        const errMessage = err?.response.data.message;
        toast.error(errMessage);
      }
      setTimerExam(-1);
      router.push("/Exams/Result/" + examID);
    }
    if (timerExam == 0) {
      handleOverTime();
    }
    const timer =
      timerExam > 0 && setInterval(() => setTimerExam(timerExam - 1), 1000);
    return () => clearInterval(timer);
  }, [timerExam]);
  function handleStart() {
    setStart(true);
    setTimerExam(exam.time * 60);
  }
  return (
    <MathJaxContext config={config}>
      <div className="detail-exam-page">
        <Row>
          <Col xs={8} ms={8}>
            {start ? (
              <div className="exam-wrap">
                <div className="exam-title">
                  <h3>Đề Thi</h3>
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
                          </div>
                          <div className="exam-item-content">
                            <Form
                              className="answers-of-question"
                              id={`form-for-question-${index}`}
                            >
                              <Row xs={2} ms={2} lg={2}>
                                <Col xs={6} ms={6}>
                                  <div className="answer">
                                    <Form.Check
                                      inline
                                      name={`group${index}`}
                                      type="radio"
                                      id={`inline-radio-1`}
                                      value={"option1"}
                                    />
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
                                    <Form.Check
                                      inline
                                      name={`group${index}`}
                                      type="radio"
                                      id={`inline-radio-1`}
                                      value={"option2"}
                                    />
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
                                    <Form.Check
                                      inline
                                      name={`group${index}`}
                                      type="radio"
                                      id={`inline-radio-1`}
                                      value={"option3"}
                                    />
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
                                    <Form.Check
                                      inline
                                      name={`group${index}`}
                                      type="radio"
                                      id={`inline-radio-1`}
                                      value={"option4"}
                                    />
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
                        </div>
                        {/* end question */}
                      </MathJax>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="exam-infor-wrap">
                <div className="slidebar-title">
                  <h4>{exam.title}</h4>
                </div>
                <h5>Tổng số câu: {listQuestion.length}</h5>
                <h5>Thời gian: {exam.time} phút</h5>
                {examIsDone ? (
                  <>
                    <h5>bạn đã hoàn thành bài này</h5>
                    <Link href={`/Exams/Result/${examID}`}>
                      <Button>Xem kết quả</Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      handleStart();
                    }}
                  >
                    Bắt đầu
                  </Button>
                )}
              </div>
            )}
          </Col>
          <Col xs={4} ms={4}>
            {start ? (
              <div className="exam-slidebar-wrap">
                <div className="slidebar-title">
                  <h4>{exam.title}</h4>
                </div>
                <div className="slidebar-content">
                  <h5>Tổng số câu: {listQuestion.length}</h5>
                  <h5>Thời gian: {exam.time} phút</h5>
                  <div className="slidebar-nav">
                    <div className="timer mt-4">
                      <div className="timer-title">
                        <h4>Thời gian</h4>
                      </div>
                      <div className="timer-content">
                        {timerExam == -1 ? <span>00:00:00</span> : null}
                        {/* hour */}
                        {Math.floor(timerExam / 60 / 60) < 10 &&
                        timerExam != -1 ? (
                          <span>0{Math.floor(timerExam / 60 / 60)}:</span>
                        ) : timerExam != -1 ? (
                          <span>{Math.floor(timerExam / 60 / 60)}:</span>
                        ) : null}
                        {/* minute */}
                        {Math.floor(timerExam / 60) < 10 && timerExam != -1 ? (
                          <span>0{Math.floor(timerExam / 60)}:</span>
                        ) : timerExam != -1 ? (
                          <span>{Math.floor(timerExam / 60)}:</span>
                        ) : null}
                        {/* second */}
                        {timerExam - Math.floor(timerExam / 60) * 60 < 10 &&
                        timerExam != -1 ? (
                          <span>
                            0{timerExam - Math.floor(timerExam / 60) * 60}
                          </span>
                        ) : timerExam != -1 ? (
                          <span>
                            {timerExam - Math.floor(timerExam / 60) * 60}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="button-nav mt-4">
                      <Button
                        variant="success"
                        ref={buttonSubmit}
                        onClick={() => {
                          handleAnswerOfUser();
                          handleShowConfirmSubmit();
                        }}
                      >
                        Nộp bài <ion-icon name="enter-outline"></ion-icon>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Rank name="one-exam" examID={`${examID}`}></Rank>
            )}
          </Col>
        </Row>
        <Modal show={showConfirmSubmit} onHide={handleCloseConfirmSubmit}>
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
              {!checkFull ? (
                <span>
                  Bạn chưa hoàn thành toàn bộ câu hỏi... Bạn chắc chắn muốn nộp
                  bài!
                </span>
              ) : (
                <span>Bạn chắc chắn muốn nộp bài!</span>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmSubmit}>
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleCloseConfirmSubmit();
                handleSaveResult();
              }}
            >
              Nộp bài
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </MathJaxContext>
  );
};
Exam.layout = "userLayout";
export default Exam;
