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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/authHook";
import { createAxios } from "../../../helper/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
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
  const [resultExercise, setResultExercise] = useState();
  function handleCloseConfirm() {
    setShowConfirm(false);
  }
  function handleShowConfirm() {
    setShowConfirm(true);
  }

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  async function getResult() {
    const dataToFind = {
      userID: currentUser.userInfor._id,
      lessionID: lessionID,
    };
    try {
      const res = await axiosJWT.post(
        "/api/statistical-of-exercise/by-user-and-lession",
        dataToFind
      );

      if (res.data.statisticalOfExercise._id) {
        const statisticalID = res.data.statisticalOfExercise._id;
        try {
          const resOfResult = await axiosJWT.get(
            "/api/result-of-exercise/" + statisticalID
          );
          console.log("k???t qu??? abc:", res.data);
          setResultExercise(res.data);
          setListAnswerOfUser(resOfResult.data.listResultOfExercise);
        } catch (err) {
          const errMessage = err.response.data.message;
          toast.error(errMessage);
        }
      }
    } catch (err) {
      router.push("/Learning/" + lessionID);
      const errMessage =
        err?.response?.data?.message ?? "kh??ng t???n t???i k???t qu???";
      toast.error(errMessage);
    }
  }

  async function getMCExercises() {
    if (lessionID) {
      try {
        const res = await axiosJWT.get(
          "/api/mcexercise/mcexercise-by-lession/" + lessionID
        );
        setLession(res.data.lession);
        console.log("b??i h???c:", res.data.lession);
        setListCatExe(res.data.categoryOfExercise);
        setListMCExercise(res.data.listMCExercise);
        console.log("danh s??ch b??i t???p:", res.data.listMCExercise);
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
      const res = await axiosJWT.post(
        "/api/statistical-of-exercise/delete/by-user-and-lession",
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
                    L??m l???i
                  </Button>
                  <Link href={`/Learning/${lessionID}`}>
                    <Button>Quay l???i b??i h???c</Button>
                  </Link>
                </div>
              </div>
              <div className="content-of-exercise-result">
                <h5>K???t qu??? ???? l??m:</h5>
                {listMCExercise.map((mcexerciseItem, index) => {
                  return (
                    <div
                      className="content-of-exercise-result-exercise"
                      key={index}
                    >
                      <MathJax>
                        <div className="content-of-exercise-result-question">
                          <h6>c??u {index + 1}:</h6>
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
                            <h6>????p ??n:&nbsp;</h6>
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
                            <h6>???? ch???n:&nbsp;</h6>
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
                                      Ch??nh x??c
                                    </div>
                                  ) : null}
                                  {answerItem.MCExerciseID ==
                                    mcexerciseItem._id &&
                                  mcexerciseItem.answer != answerItem.option ? (
                                    <div className="result-final-false">
                                      <ion-icon name="close-outline"></ion-icon>
                                      Sai r???i
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
                                  L???i gi???i
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
                            <Button variant="outline-primary">C??ch gi???i</Button>
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
              <h5>
                {resultExercise?.userInfor?.fullname} -{" "}
                {resultExercise?.userInfor?.class}
              </h5>
              <h5>k???t qu???</h5>
              <h6>{resultExercise?.statisticalOfExercise?.score} ??i???m</h6>
              <h6>
                {resultExercise?.statisticalOfExercise?.totalAnswerTrue} c??u
                ????ng
              </h6>
              <h6>
                Th???i gian: {/* hour */}
                {Math.floor(
                  resultExercise?.statisticalOfExercise?.time / 60 / 60
                ) < 10 && resultExercise?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    0
                    {Math.floor(
                      resultExercise?.statisticalOfExercise?.time / 60 / 60
                    )}
                    :
                  </span>
                ) : resultExercise?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    {Math.floor(
                      resultExercise?.statisticalOfExercise?.time / 60 / 60
                    )}
                    :
                  </span>
                ) : null}
                {/* minute */}
                {Math.floor(resultExercise?.statisticalOfExercise?.time / 60) <
                  10 && resultExercise?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    0
                    {Math.floor(
                      resultExercise?.statisticalOfExercise?.time / 60
                    )}
                    :
                  </span>
                ) : resultExercise?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    {Math.floor(
                      resultExercise?.statisticalOfExercise?.time / 60
                    )}
                    :
                  </span>
                ) : null}
                {/* second */}
                {Math.floor(resultExercise?.statisticalOfExercise?.time) < 10 &&
                resultExercise?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    0
                    {Math.floor(resultExercise?.statisticalOfExercise?.time) -
                      Math.floor(
                        resultExercise?.statisticalOfExercise?.time / 60
                      ) *
                        60}
                  </span>
                ) : resultExercise?.statisticalOfExercise?.time != -1 ? (
                  <span>
                    {Math.floor(resultExercise?.statisticalOfExercise?.time) -
                      Math.floor(
                        resultExercise?.statisticalOfExercise?.time / 60
                      ) *
                        60}
                  </span>
                ) : null}
              </h6>
            </div>
          </Col>
        </Row>
      </MathJaxContext>
      <Modal show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#f45246", color: "#fff" }}
        >
          <Modal.Title>Ch?? ??!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Khi b???n l???i l???i b??i t???p k???t qu??? c?? s??? b??? x??a. b???n c?? ch???c ch???n kh??ng
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseConfirm}>
            Quay l???i
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleCloseConfirm();
              handleRedoExercise();
            }}
          >
            Ch???c ch???n
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
Exercise.layout = "userLayout";
export default Exercise;
