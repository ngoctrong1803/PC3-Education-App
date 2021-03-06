import {
  Button,
  Col,
  Row,
  Spinner,
  Form,
  ProgressBar,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { Pagination, Navigation } from "swiper";
import axios from "axios";
import { useSpeech } from "react-web-voice";
import { toast } from "react-toastify";
import Style from "./Style";

const FlashcardWrite = ({ listFlashcard }) => {
  const timeEasy = 10;
  const timeNormal = 6;
  const timeHard = 3;
  const [audioTrue, setAudioTrue] = useState(new Audio("/music/true.mp3"));
  const [audioFalse, setAudioFalse] = useState(new Audio("/music/false.mp3"));
  const [audioWin, setAudioWin] = useState(new Audio("/music/winner.mp3"));
  const [level, setLevel] = useState("");
  const startButtonRef = useRef();
  const [timerWrite, setTimerWrite] = useState(-1);
  const [userAnswer, setUserAnswer] = useState("");
  const [totalAnswerTrueWrite, setTotalAnswerTrueWrite] = useState(0);
  const [totalAnswerFalseWrite, setTotalAnswerFalseWrite] = useState(0);
  const [currentQuestionWriteIndex, setCurrentQuestionWriteIndex] =
    useState(-1);
  const [currentQuestionWrite, setCurrentQuestionWrite] = useState({});
  const btnSubmit = useRef();
  const txtInputAnswer = useRef();
  const { messages, speak } = useSpeech({ voice: "karen" });

  async function handleLoadQuestion(index) {
    setCurrentQuestionWriteIndex(index);
    const currentFlashcard = listFlashcard[index];
    const currentQuestion = {
      question: currentFlashcard?.meaningInVietnamese,
      answer: currentFlashcard?.meaningInEnglish,
    };
    setCurrentQuestionWrite(currentQuestion);
    resetCouter();
  }

  function resetCouter() {
    if (level == "easy") {
      setTimerWrite(timeEasy);
    } else if (level == "normal") {
      setTimerWrite(timeNormal);
    } else if (level == "hard") {
      setTimerWrite(timeHard);
    }
  }
  // handle reset flashcard write
  function resetFlashcardWrite() {
    setTimerWrite(-1);
    setCurrentQuestionWriteIndex(-1);
    setTotalAnswerFalseWrite(0);
    setTotalAnswerTrueWrite(0);
  }
  //handle couter
  useEffect(() => {
    if (timerWrite == 0) {
      if (currentQuestionWriteIndex < listFlashcard.length) {
        audioFalse.volume = 0.7;
        audioFalse.play();
        toast.error("H???t th???i gian!", {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        txtInputAnswer.current.disabled = true;
        setTimerWrite(-1);
        setTimeout(() => {
          setTotalAnswerFalseWrite((pre) => pre + 1);
          setCurrentQuestionWriteIndex((pre) => pre + 1);
          handleLoadQuestion(currentQuestionWriteIndex + 1);
        }, 1500);
      }
    }
    const timer =
      timerWrite > 0 && setInterval(() => setTimerWrite(timerWrite - 1), 1000);
    return () => clearInterval(timer);
  }, [timerWrite]);

  // handle change question
  useEffect(() => {
    txtInputAnswer?.current?.focus();
    setUserAnswer("");
    txtInputAnswer.current?.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        btnSubmit.current.click();
      }
    });
    if (currentQuestionWriteIndex == listFlashcard.length) {
      setTimeout(() => {
        audioWin.volume = 0.7;
        audioWin.play();
      }, 300);
    }
  }, [currentQuestionWriteIndex]);

  // handle answer
  function handleAnswerWrite(answer) {
    const result =
      currentQuestionWrite.answer.trim().toLowerCase() ==
      answer.trim().toLowerCase();
    setTimerWrite(-1);
    if (result) {
      audioTrue.volume = 0.7;
      audioTrue.play();
      setTotalAnswerTrueWrite((pre) => pre + 1);
      toast.success("Ch??nh x??c!", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      txtInputAnswer.current.disabled = true;
    } else {
      audioFalse.volume = 0.7;
      audioFalse.play();
      setTotalAnswerFalseWrite((pre) => pre + 1);
      toast.error("Sai r???i! C??? g???n nh??!", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      txtInputAnswer.current.disabled = true;
    }
    setTimeout(() => {
      setCurrentQuestionWriteIndex((pre) => pre + 1);
      handleLoadQuestion(currentQuestionWriteIndex + 1);
    }, 2500);
  }
  return (
    <Style>
      <div className="flashcard-write-wrap">
        {listFlashcard.map((flashcardItem, index) => {
          if (currentQuestionWriteIndex == index)
            return (
              <>
                <div className="result-flashcard-write">
                  <h4>K???t qu???</h4>
                  <span>
                    ???? l??m: {totalAnswerTrueWrite + totalAnswerFalseWrite}/
                    {listFlashcard.length}
                  </span>
                  <ProgressBar
                    now={
                      ((totalAnswerTrueWrite + totalAnswerFalseWrite) /
                        listFlashcard.length) *
                      100
                    }
                    className="result-progress"
                  />

                  <span>????ng: {totalAnswerTrueWrite}</span>
                  <ProgressBar
                    variant="success"
                    now={(totalAnswerTrueWrite / listFlashcard.length) * 100}
                    className="result-progress"
                  />
                  <span>Sai: {totalAnswerFalseWrite}</span>
                  <ProgressBar
                    variant="danger"
                    now={(totalAnswerFalseWrite / listFlashcard.length) * 100}
                    className="result-progress"
                  />
                </div>
                <div className="timer-flashcard-write">
                  {timerWrite == -1 ? (
                    <>
                      <Spinner size="sm" animation="grow" variant="success" />
                      <Spinner size="sm" animation="grow" variant="success" />
                      <Spinner size="sm" animation="grow" variant="success" />
                    </>
                  ) : (
                    <span>{timerWrite}</span>
                  )}
                </div>
                <div className="question-flashcard-write-wrap">
                  <h4>{currentQuestionWrite.question}</h4>
                  {timerWrite == -1 ? (
                    <div className="question-flashcard-write-answer">
                      {currentQuestionWrite.answer}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ProgressBar
                    animated
                    min={0}
                    max={level == "easy" ? 5 : level == "normal" ? 4 : 3}
                    now={timerWrite}
                  />
                  <Row style={{ marginTop: "15px" }}>
                    <Col sm={12} lg={12} md={12}></Col>
                    <InputGroup className="mb-3">
                      <FormControl
                        ref={txtInputAnswer}
                        value={userAnswer}
                        placeholder="Ngh??a c???a t???"
                        onChange={(e) => {
                          setUserAnswer(e.target.value);
                        }}
                      />
                      <Button
                        ref={btnSubmit}
                        variant="success"
                        id="button-addon2"
                        onClick={() => {
                          handleAnswerWrite(userAnswer);
                        }}
                      >
                        Ho??n th??nh
                      </Button>
                    </InputGroup>
                  </Row>
                </div>
              </>
            );
        })}
        {currentQuestionWriteIndex == -1 ? (
          <>
            <h3>Ch??o m???ng ?????n v???i vi???t l???i t???</h3>
            <br></br>
            <h5>ch???n ????? kh?? ????? b???t ?????u</h5>
            <div className="flash-card-write-level">
              <div
                className="flash-card-write-level-item"
                style={{ "--clr": "#34ff4c" }}
              >
                {" "}
                <Form.Check
                  type={`radio`}
                  id={`radio1`}
                  label={`D???`}
                  name={`level`}
                  onClick={() => {
                    setLevel("easy");
                  }}
                />
              </div>
              <div
                className="flash-card-write-level-item"
                style={{ "--clr": "#f4cc11" }}
              >
                <Form.Check
                  type={`radio`}
                  id={`radio2`}
                  label={`Trung B??nh`}
                  name={`level`}
                  onClick={() => {
                    setLevel("normal");
                  }}
                />
              </div>
              <div
                className="flash-card-write-level-item"
                style={{ "--clr": "#ff4234" }}
              >
                <Form.Check
                  type={`radio`}
                  id={`radio3`}
                  label={`Kh??`}
                  name={`level`}
                  onClick={() => {
                    setLevel("hard");
                  }}
                />
              </div>
            </div>

            <br></br>
            <Button
              ref={startButtonRef}
              variant="primary"
              onClick={() => {
                if (level == "") {
                  toast.error("ch???n ????? kh?? ????? b???t ?????u");
                } else {
                  handleLoadQuestion(0);
                  if (level == "easy") {
                    setTimerWrite(timeEasy);
                  } else if (level == "normal") {
                    setTimerWrite(timeNormal);
                  } else if (level == "hard") {
                    setTimerWrite(timeHard);
                  }
                }
              }}
            >
              B???t ?????u
            </Button>
          </>
        ) : null}
        {currentQuestionWriteIndex == listFlashcard.length ? (
          <div className="result-flashcard-write-final">
            <div className="result-flashcard-write-final-title">K???t qu???</div>
            <div className="result-flashcard-write-final-content">
              {" "}
              <span>
                ???? l??m: {totalAnswerTrueWrite + totalAnswerFalseWrite}/
                {listFlashcard.length}
              </span>
              <ProgressBar
                now={
                  ((totalAnswerTrueWrite + totalAnswerFalseWrite) /
                    listFlashcard.length) *
                  100
                }
                className="result-progress"
              />
              <span>????ng: {totalAnswerTrueWrite}</span>
              <ProgressBar
                variant="success"
                now={(totalAnswerTrueWrite / listFlashcard.length) * 100}
                className="result-progress"
              />
              <span>Sai: {totalAnswerFalseWrite}</span>
              <ProgressBar
                variant="danger"
                now={(totalAnswerFalseWrite / listFlashcard.length) * 100}
                className="result-progress"
              />
            </div>
            <div className="result-flashcard-write-final-footer-title">
              {totalAnswerTrueWrite == listFlashcard.length ? (
                <>B???n qu?? xu???t s???c!</>
              ) : totalAnswerTrueWrite > listFlashcard.length - 2 ? (
                <>B???n ho??n th??nh t???t!</>
              ) : totalAnswerFalseWrite >= totalAnswerTrueWrite ? (
                <>C???n c??? g???n th??m b???n nh??!</>
              ) : (
                <>Ho??n th??nh nhi???m v???!</>
              )}
            </div>
            <div className="result-flashcard-write-final-footer">
              <Button
                variant="primary"
                onClick={() => {
                  resetFlashcardWrite();
                }}
              >
                {" "}
                Quay l???i{" "}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Style>
  );
};

export default FlashcardWrite;
