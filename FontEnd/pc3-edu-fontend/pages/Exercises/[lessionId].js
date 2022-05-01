import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Rank from "../../comps/Rank";
import { useEffect, useState } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { toast } from "react-toastify";
const Exercise = () => {
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];
  const [modalShow, setModalShow] = useState(false);

  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);

  const [lession, setLession] = useState({});
  const [listMCExercise, setListMCExercise] = useState([]);
  const [listCatExe, setListCatExe] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerOfUser, setAnswerOfUser] = useState();
  const [listAnswerOfUser, setListAnswerOfUser] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timeDone, setTimeDone] = useState(0);

  async function handleAnswer() {
    let counter = 0;
    const answer = document.getElementsByName("answerOfMCExercise");
    for (var i = 0; i < answer.length; i++) {
      if (answer[i].checked) {
        const userAnswer = {
          mcExerciseID: listMCExercise[currentQuestionIndex]._id,
          answer: answer[i].id,
        };
        console.log("userAnswer", userAnswer);
        if (listMCExercise[currentQuestionIndex].answer == answer[i].id) {
          toast.success("Chính xác! chúc mừng bạn!", {
            position: "bottom-center",
            theme: "colored",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setListAnswerOfUser([...listAnswerOfUser, userAnswer]);
          if (score < listMCExercise.length * 10) {
            setScore((pre) => pre + 10);
          }

          if (currentQuestionIndex < listMCExercise.length - 1) {
            setCurrentQuestionIndex((pre) => pre + 1);
          }
          if (currentQuestionIndex == listMCExercise.length - 1) {
            setTimeDone(timer);
            setTimeout(() => {
              setModalShow(true);
            }, 1200);
          }
        } else {
          toast.error("Sai rồi! cố gắn lên nhé!", {
            position: "bottom-center",
            autoClose: 1000,
            theme: "colored",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setListAnswerOfUser([...listAnswerOfUser, userAnswer]);
          if (currentQuestionIndex < listMCExercise.length - 1) {
            setCurrentQuestionIndex((pre) => pre + 1);
          }
          if (currentQuestionIndex == listMCExercise.length - 1) {
            setTimeDone(timer);
            setModalShow(true);
          }
        }
      } else {
        counter++;
      }
    }
    if (counter == 4) {
      toast.error("Đáp án không được bỏ trống!", {
        position: "bottom-center",
        autoClose: 1200,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function getMCExercises() {
    if (lessionID) {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/mcexercise/mcexercise-by-lession/625ee4d8bbcb381015ea1a36"
        );
        console.log("res data:", res.data);
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
    console.log("list answer of user:", listAnswerOfUser);
  }, [listAnswerOfUser]);

  // Third Attempts
  useEffect(() => {
    const time = setInterval(() => setTimer(timer + 1), 1000);
    return () => clearInterval(time);
  }, [timer]);
  useEffect(() => {
    getMCExercises();
  }, []);

  // handle UI
  const [exerciseGuideNav, setExerciseGuideNav] = useState("description");
  useEffect(() => {
    const buttonNav = document.querySelectorAll(".btn-nav");
    const activeItem = (itemClick) => {
      buttonNav.forEach((item) => {
        item.classList.remove("show");
      });
      itemClick.classList.add("show");
    };
    buttonNav.forEach((item) => {
      item.addEventListener("click", function () {
        activeItem(item);
      });
    });
  }, []);
  // handle UI

  return (
    <>
      <MathJaxContext config={config}>
        <Row>
          {listMCExercise.map((mcexerciseItem, index) => {
            if (currentQuestionIndex == index)
              return (
                <>
                  <Col xs={5} md={5}>
                    <div className="exercise-guide-wrap">
                      <div className="exercise-guide-title">
                        <h4>{lession?.lessionName}</h4>
                      </div>
                      <div className="exercise-guide-nav">
                        <ul>
                          <li className="btn-nav">
                            <button
                              onClick={() => {
                                setExerciseGuideNav("description");
                              }}
                            >
                              Mô tả
                            </button>
                          </li>

                          <li className="btn-nav">
                            <button
                              onClick={() => {
                                setExerciseGuideNav("help");
                              }}
                            >
                              Trợ giúp
                            </button>
                          </li>
                        </ul>
                        {exerciseGuideNav == "description" ? (
                          <div className="exercise-guide-description">
                            đây là phần mô tả bài tập
                          </div>
                        ) : null}
                        {exerciseGuideNav == "rank" ? (
                          <div className="exercise-guide-rank">
                            đây là phần bảng xếp hạng
                          </div>
                        ) : null}
                        {exerciseGuideNav == "help" ? (
                          <div className="exercise-guide-help">
                            đây là phần trợ giúp
                          </div>
                        ) : null}
                      </div>
                      <div className="exercise-guide-current-result">
                        <Row>
                          <Col xs={4} md={4}>
                            <div className="exercise-mark">
                              <div className="top" style={{ color: "#fff" }}>
                                Điểm
                              </div>
                              <div className="bottom">
                                {score}/{listMCExercise.length * 10}
                              </div>
                            </div>
                          </Col>
                          <Col xs={4} md={4}>
                            <div className="exercise-answered">
                              <div className="top" style={{ color: "#fff" }}>
                                Hoàn thành
                              </div>
                              <div className="bottom">
                                {currentQuestionIndex <=
                                listMCExercise.length - 1
                                  ? currentQuestionIndex
                                  : currentQuestionIndex + 1}
                                /{listMCExercise.length}
                              </div>
                            </div>
                          </Col>
                          <Col xs={4} md={4}>
                            <div className="exercise-timer">
                              <div className="top" style={{ color: "#fff" }}>
                                Thời gian
                              </div>
                              <div className="bottom">
                                {Math.floor(timer / 60 / 60) < 10 ? (
                                  <span>0{Math.floor(timer / 60 / 60)}</span>
                                ) : (
                                  <span>{Math.floor(timer / 60 / 60)}</span>
                                )}
                                :
                                {Math.floor(timer / 60) < 10 ? (
                                  <span>0{Math.floor(timer / 60)}</span>
                                ) : (
                                  <span>{Math.floor(timer / 60)}</span>
                                )}
                                :
                                {timer - Math.floor(timer / 60) * 60 < 10 ? (
                                  <span>
                                    0{timer - Math.floor(timer / 60) * 60}
                                  </span>
                                ) : (
                                  <span>
                                    {timer - Math.floor(timer / 60) * 60}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col xs={7} md={7}>
                    <div className="exercise-wrap">
                      <div
                        className="exercise-type"
                        style={{ width: "130px", padding: "5px" }}
                      >
                        {listCatExe.map((catExeItem, index) => {
                          if (catExeItem._id == mcexerciseItem.catExeID)
                            return <span>{catExeItem.description}</span>;
                        })}
                      </div>
                      <div className="exercise-title mt-4">
                        <h5>
                          <MathJax>
                            câu {index + 1}:
                            <p
                              dangerouslySetInnerHTML={{
                                __html: mcexerciseItem?.question,
                              }}
                            />
                          </MathJax>
                        </h5>
                      </div>
                      <div className="exercise-content">
                        <Form className="answers-of-question">
                          <div className="answer">
                            <Form.Check
                              inline
                              name="answerOfMCExercise"
                              type="radio"
                              id={`option1`}
                            />
                            <label style={{ marginTop: "15px" }}>
                              {" "}
                              <MathJax>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option1,
                                  }}
                                />
                              </MathJax>
                            </label>
                          </div>
                          <div className="answer">
                            <Form.Check
                              inline
                              name="answerOfMCExercise"
                              type="radio"
                              id={`option2`}
                            />
                            <label style={{ marginTop: "15px" }}>
                              {" "}
                              <MathJax>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option2,
                                  }}
                                />
                              </MathJax>
                            </label>
                          </div>
                          <div className="answer">
                            <Form.Check
                              inline
                              name="answerOfMCExercise"
                              type="radio"
                              id={`option3`}
                            />
                            <label style={{ marginTop: "15px" }}>
                              {" "}
                              <MathJax>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option3,
                                  }}
                                />
                              </MathJax>
                            </label>
                          </div>
                          <div className="answer">
                            <Form.Check
                              inline
                              name="answerOfMCExercise"
                              type="radio"
                              id={`option3`}
                            />
                            <label style={{ marginTop: "15px" }}>
                              {" "}
                              <MathJax>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: mcexerciseItem?.option4,
                                  }}
                                />
                              </MathJax>
                            </label>
                          </div>
                        </Form>
                      </div>
                      <div className="exercise-footer">
                        <Button variant="warning">
                          <ion-icon name="sunny-outline"></ion-icon>
                          <span>Gợi ý</span>
                        </Button>
                        {currentQuestionIndex == listMCExercise.length - 1 ? (
                          <Button
                            variant="success"
                            onClick={() => {
                              handleAnswer();
                            }}
                          >
                            Hoàn thành
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={() => {
                              if (
                                currentQuestionIndex <
                                listMCExercise.length - 1
                              ) {
                                handleAnswer();
                              }
                            }}
                          >
                            Câu tiếp theo
                          </Button>
                        )}
                      </div>
                    </div>
                  </Col>
                </>
              );
          })}
        </Row>
      </MathJaxContext>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            backgroundColor: "#3ed34a",
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter" style={{}}>
            <h2>Kết quả làm bài</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: "500px",
          }}
        >
          <div className="result-exercise-wrap">
            <div
              className="result-exercise-item-wrap"
              style={{ "--clr": "#0fc70f" }}
            >
              <div className="result-exercise" style={{ "--clr": "#0fc70f" }}>
                {score}/{listMCExercise.length * 10}
              </div>
              <h3>Điểm số</h3>
            </div>
            <div
              className="result-exercise-item-wrap"
              style={{ "--clr": "#ffa117" }}
            >
              <div className="result-exercise" style={{ "--clr": "#ffa117" }}>
                {" "}
                {score / 10}/{listMCExercise.length}
              </div>
              <h3>Số câu đúng</h3>
            </div>
            <div
              className="result-exercise-item-wrap"
              style={{ "--clr": "#f44336" }}
            >
              <div className="result-exercise" style={{ "--clr": "#f44336" }}>
                {" "}
                {Math.floor(timeDone / 60 / 60) < 10 ? (
                  <span>0{Math.floor(timeDone / 60 / 60)}</span>
                ) : (
                  <span>{Math.floor(timeDone / 60 / 60)}</span>
                )}
                :
                {Math.floor(timeDone / 60) < 10 ? (
                  <span>0{Math.floor(timeDone / 60)}</span>
                ) : (
                  <span>{Math.floor(timeDone / 60)}</span>
                )}
                :
                {timeDone - Math.floor(timeDone / 60) * 60 < 10 ? (
                  <span>0{timeDone - Math.floor(timeDone / 60) * 60}</span>
                ) : (
                  <span>{timeDone - Math.floor(timeDone / 60) * 60}</span>
                )}
              </div>
              <h3>Thời gian làm</h3>
            </div>
          </div>
          <div className="result-exercise-title-wrap">
            Chúc mừng bạn đã hoàn thành!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalShow(false);
            }}
          >
            Quay lại bài học
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
Exercise.layout = "userLayout";
export default Exercise;