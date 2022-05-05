import { Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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
    let listAnswerTemp = [];
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
    }
    setListAnswerOfUser(listAnswerTemp);
  }
  useEffect(() => {
    console.log("list answer of user:", listAnswerOfUser);
  }, [listAnswerOfUser]);
  useEffect(() => {
    getExam();
    getContenOfExam();
  }, []);
  return (
    <MathJaxContext config={config}>
      <div className="detail-exam-page">
        <Row>
          <Col xs={8} ms={8}>
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
          </Col>
          <Col xs={4} ms={4}>
            <div className="exam-slidebar-wrap">
              <div className="slidebar-title">
                <h4>{exam.title}</h4>
              </div>
              <div className="slidebar-content">
                <h5>Tổng số câu: {exam.totalQuestion}</h5>
                <h5>Thời gian: {exam.time} phút</h5>
                <h5>Số câu đã làm: 10/{exam.totalQuestion}</h5>
                <div className="slidebar-nav">
                  <div className="timer mt-4">
                    <div className="timer-title">
                      <h4>Thời gian</h4>
                    </div>
                    <div className="timer-content">
                      <h4>14:26</h4>
                    </div>
                  </div>
                  <div className="button-nav mt-4">
                    <Button
                      variant="info"
                      onClick={() => {
                        handleAnswerOfUser();
                      }}
                    >
                      Lưu bài <ion-icon name="save-outline"></ion-icon>
                    </Button>
                    <Button variant="success">
                      Nộp bài <ion-icon name="enter-outline"></ion-icon>
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
Exam.layout = "userLayout";
export default Exam;
