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
import { createAxios } from "../../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../../redux/authSlice";
import useTeacherAuth from "../../../../../hooks/authTeacherHook";
const Exercise = () => {
  const isTeacher = useTeacherAuth();
  const router = useRouter();
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const userlession = arrayTemp[position];
  const userIDlessionIDArray = userlession.split("-");
  const userID = userIDlessionIDArray[0];
  const lessionID = userIDlessionIDArray[1];

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
      const res = await axiosJWT.post(
        "/api/statistical-of-exercise/by-user-and-lession",
        dataToFind
      );
      setStatisticalInfor(res.data);

      if (res.data.statisticalOfExercise._id) {
        const statisticalID = res.data.statisticalOfExercise._id;
        try {
          const resOfResult = await axiosJWT.get(
            "/api/result-of-exercise/" + statisticalID
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
        const res = await axiosJWT.get(
          "/api/mcexercise/mcexercise-by-lession/" + lessionID
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
    if (isTeacher) {
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
