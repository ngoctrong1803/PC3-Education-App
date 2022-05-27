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
import useAuth from "../../../hooks/authHook";
const Exercise = () => {
  const isAuth = useAuth();
  const router = useRouter();
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];

  const [lession, setLession] = useState({});
  const [listMCExercise, setListMCExercise] = useState([]);
  const [listCatExe, setListCatExe] = useState([]);
  const [listAnswerOfUser, setListAnswerOfUser] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  function handleCloseConfirm() {
    setShowConfirm(false);
  }
  function handleShowConfirm() {
    setShowConfirm(true);
  }

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  async function getResult() {
    const dataToFind = {
      userID: currentUser.userInfor._id,
      lessionID: lessionID,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/statistical-of-exercise/by-user-and-lession",
        dataToFind
      );

      if (res.data.statisticalOfExercise._id) {
        const statisticalID = res.data.statisticalOfExercise._id;
        try {
          const resOfResult = await axios.get(
            "http://localhost:8000/api/result-of-exercise/" + statisticalID
          );
          console.log(
            "danh sách câu trả lời user:",
            resOfResult.data.listResultOfExercise
          );
          setListAnswerOfUser(resOfResult.data.listResultOfExercise);
        } catch (err) {
          const errMessage = err.response.data.message;
          toast.error(errMessage);
        }
      }
    } catch (err) {
      router.push("/Learning/" + lessionID);
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
        console.log("bài học:", res.data.lession);
        setListCatExe(res.data.categoryOfExercise);
        setListMCExercise(res.data.listMCExercise);
        console.log("danh sách bài tập:", res.data.listMCExercise);
      } catch (err) {
        const errMessage = err?.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleRedoExercise() {
    try {
      const dataToFind = {
        userID: currentUser.userInfor._id,
        lessionID: lessionID,
      };
      const res = await axios.post(
        "http://localhost:8000/api/statistical-of-exercise/delete/by-user-and-lession",
        dataToFind
      );
      router.push("/Learning/" + lessionID);
    } catch (err) {
      const errMessage = err?.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    if (isAuth) {
      getResult();
      getMCExercises();
    }
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
                  <Button variant="warning" onClick={handleShowConfirm}>
                    Làm lại
                  </Button>
                  <Link href={`/Learning/${lessionID}`}>
                    <Button>Quay lại bài học</Button>
                  </Link>
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
            <div className="sidebar-of-exercise-result-wrap"></div>
          </Col>
        </Row>
      </MathJaxContext>
      <Modal show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#f45246", color: "#fff" }}
        >
          <Modal.Title>Chú ý!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Khi bạn lại lại bài tập kết quả cũ sẽ bị xóa. bạn có chắc chắn không
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseConfirm}>
            Quay lại
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleCloseConfirm();
              handleRedoExercise();
            }}
          >
            Chắc chắn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
Exercise.layout = "userLayout";
export default Exercise;
