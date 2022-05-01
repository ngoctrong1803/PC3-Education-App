import { Button, Col, Row, Spinner, Form, ProgressBar } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { Pagination, Navigation } from "swiper";
import axios from "axios";
import { useSpeech } from "react-web-voice";
import { toast } from "react-toastify";
import Style from "./Style";

const FlashcardQuiz = ({ listFlashcard }) => {
  const [audioBackground, setAudioBackground] = useState(
    new Audio("/music/game.mp3")
  );
  const [audioTrue, setAudioTrue] = useState(new Audio("/music/true.mp3"));
  const [audioFalse, setAudioFalse] = useState(new Audio("/music/false.mp3"));
  const [audioWin, setAudioWin] = useState(new Audio("/music/winner.mp3"));
  const [level, setLevel] = useState("");
  const startButtonRef = useRef();
  const [timerQuiz, setTimerQuiz] = useState(-1);
  const [totalAnswerTrueQuiz, setTotalAnswerTrueQuiz] = useState(0);
  const [totalAnswerFalseQuiz, setTotalAnswerFalseQuiz] = useState(0);
  const [currentQuestionQuizIndex, setCurrentQuestionQuizIndex] = useState(-1);
  const [currentQuestionQuiz, setCurrentQuestionQuiz] = useState({});
  const { messages, speak } = useSpeech({ voice: "karen" });

  function ramdomArray(array) {
    const arrayResult = [];
    const length = array.length;
    for (var i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * array.length);
      arrayResult.push(array[random]);
      array.splice(random, 1);
    }
    return arrayResult;
  }

  async function handleLoadQuestion(index) {
    // audioBackground.volume = 0.3;
    // audioBackground.play();
    setCurrentQuestionQuizIndex(index);
    const currentFlashcard = listFlashcard[index];
    const textToSpeak = currentFlashcard?.meaningInEnglish ?? "";
    setTimeout(async () => {
      const utterance = await speak({
        text: textToSpeak,
        volume: 1,
        rate: 1, // tốc độ đọc
        pitch: 1.5, // cao độ
      });
    }, 500);

    let listAnswerToSplice = [...listFlashcard];
    listAnswerToSplice.splice(index, 1);

    let listAnswerRamdom = [...ramdomArray(listAnswerToSplice)];
    let listAnswerTemp = [];
    for (var i = 0; i < 3; i++) {
      if (listAnswerRamdom[i]) {
        listAnswerTemp.push(listAnswerRamdom[i]);
      } else {
        listAnswerTemp.push({});
      }
    }
    listAnswerTemp.push(currentFlashcard);
    let listAnswer = [...ramdomArray(listAnswerTemp)];

    const currentQuestion = {
      question: currentFlashcard?.meaningInEnglish,
      answer: currentFlashcard?.meaningInVietnamese,
      option1: listAnswer[0]?.meaningInVietnamese ?? "",
      option2: listAnswer[1]?.meaningInVietnamese ?? "",
      option3: listAnswer[2]?.meaningInVietnamese ?? "",
      option4: listAnswer[3]?.meaningInVietnamese ?? "",
    };
    setCurrentQuestionQuiz(currentQuestion);
    resetCouter();
  }

  function resetCouter() {
    if (level == "easy") {
      setTimerQuiz(5);
    } else if (level == "normal") {
      setTimerQuiz(4);
    } else if (level == "hard") {
      setTimerQuiz(3);
    }
  }
  // handle reset flashcard quiz
  function resetFlashcardQuiz() {
    setTimerQuiz(-1);
    setCurrentQuestionQuizIndex(-1);
    setTotalAnswerFalseQuiz(0);
    setTotalAnswerTrueQuiz(0);
  }
  async function playTrueSound() {
    audioTrue.volume = 0.7;
    audioTrue.play();
  }
  async function playFalseSound() {
    audioFalse.volume = 0.7;
    audioFalse.play();
  }
  async function playWinSound() {
    audioWin.volume = 0.7;
    audioWin.play();
  }
  // Third Attempts
  useEffect(() => {
    if (timerQuiz == 0) {
      if (currentQuestionQuizIndex < listFlashcard.length) {
        toast.error("Hết thời gian!", {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        audioFalse.volume = 0.7;
        audioFalse.play();
        const answerOfUser = document.getElementsByClassName(
          "answer-quiz-flashcard"
        );
        for (var i = 0; i < answerOfUser.length; i++) {
          answerOfUser[i].disabled = true;
        }
        setTimerQuiz(-1);
        setTimeout(() => {
          setTotalAnswerFalseQuiz((pre) => pre + 1);
          setCurrentQuestionQuizIndex((pre) => pre + 1);
          handleLoadQuestion(currentQuestionQuizIndex + 1);
        }, 1500);
      }
    }
    if (currentQuestionQuizIndex == listFlashcard.length - 1) {
      setTimeout(() => {}, 2000);
    }
    const timer =
      timerQuiz > 0 && setInterval(() => setTimerQuiz(timerQuiz - 1), 1000);
    return () => clearInterval(timer);
  }, [timerQuiz]);
  // handle answer
  function handleAnswerQuiz(e, answer) {
    const result = currentQuestionQuiz.answer == answer;
    const answerOfUser = document.getElementsByClassName(
      "answer-quiz-flashcard"
    );
    for (var i = 0; i < answerOfUser.length; i++) {
      answerOfUser[i].disabled = true;
    }
    setTimerQuiz(-1);
    if (result) {
      audioTrue.volume = 0.7;
      audioTrue.play();
      setTotalAnswerTrueQuiz((pre) => pre + 1);
      let change = true;
      let couter = 0;
      let flicker = setInterval(() => {
        if (change) {
          e.target.style.color = "#fff";
          e.target.style.backgroundColor = "#06eb0e";
          change = !change;
        } else {
          e.target.style.color = "#fff";
          e.target.style.backgroundColor = "#8af38e";
          change = !change;
        }
        couter++;
        if (couter == 3) {
          clearInterval(flicker);
        }
      }, 300);
      toast.success("Chính xác!", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      audioFalse.volume = 0.7;
      audioFalse.play();
      setTotalAnswerFalseQuiz((pre) => pre + 1);
      let change = true;
      let couter = 0;
      let flicker = setInterval(() => {
        if (change) {
          e.target.style.color = "#fff";
          e.target.style.backgroundColor = "#f41a1a";
          change = !change;
        } else {
          e.target.style.color = "#fff";
          e.target.style.backgroundColor = "#f46d6d";
          change = !change;
        }
        couter++;
        if (couter == 3) {
          clearInterval(flicker);
        }
      }, 300);
      toast.error("Sai rồi! Cố gắn nhé!", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (currentQuestionQuizIndex == listFlashcard.length - 1) {
      setTimeout(() => {
        audioWin.volume = 0.7;
        audioWin.play();
      }, 2200);
    }
    setTimeout(() => {
      setCurrentQuestionQuizIndex((pre) => pre + 1);
      handleLoadQuestion(currentQuestionQuizIndex + 1);
    }, 2000);
  }
  return (
    <Style>
      <div className="flashcard-quiz-wrap">
        {listFlashcard.map((flashcardItem, index) => {
          if (currentQuestionQuizIndex == index)
            return (
              <>
                <div className="result-flashcard-quiz">
                  <h4>Kết quả</h4>
                  <span>
                    Đã làm: {totalAnswerTrueQuiz + totalAnswerFalseQuiz}/
                    {listFlashcard.length}
                  </span>
                  <ProgressBar
                    now={
                      ((totalAnswerTrueQuiz + totalAnswerFalseQuiz) /
                        listFlashcard.length) *
                      100
                    }
                    className="result-progress"
                  />

                  <span>Đúng: {totalAnswerTrueQuiz}</span>
                  <ProgressBar
                    variant="success"
                    now={(totalAnswerTrueQuiz / listFlashcard.length) * 100}
                    className="result-progress"
                  />
                  <span>Sai: {totalAnswerFalseQuiz}</span>
                  <ProgressBar
                    variant="danger"
                    now={(totalAnswerFalseQuiz / listFlashcard.length) * 100}
                    className="result-progress"
                  />
                </div>
                <div className="timer-flashcard-quiz">
                  {timerQuiz == -1 ? (
                    <>
                      <Spinner size="sm" animation="grow" variant="success" />
                      <Spinner size="sm" animation="grow" variant="success" />
                      <Spinner size="sm" animation="grow" variant="success" />
                    </>
                  ) : (
                    <span>{timerQuiz}</span>
                  )}
                </div>
                <div className="question-flashcard-quiz-wrap">
                  <h4>{currentQuestionQuiz.question}</h4>
                </div>
                <div>
                  <ProgressBar
                    animated
                    min={0}
                    max={level == "easy" ? 5 : level == "normal" ? 4 : 3}
                    now={timerQuiz}
                  />
                  <Row style={{ marginTop: "15px" }}>
                    <Col xs={6} ms={6}>
                      <button
                        className="answer-quiz-flashcard"
                        onClick={(e) => {
                          handleAnswerQuiz(e, currentQuestionQuiz.option1);
                        }}
                      >
                        {currentQuestionQuiz.option1}
                      </button>
                    </Col>
                    <Col xs={6} ms={6}>
                      <button
                        className="answer-quiz-flashcard"
                        onClick={(e) => {
                          handleAnswerQuiz(e, currentQuestionQuiz.option2);
                        }}
                      >
                        {currentQuestionQuiz.option2}
                      </button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6} ms={6}>
                      <button
                        className="answer-quiz-flashcard"
                        onClick={(e) => {
                          handleAnswerQuiz(e, currentQuestionQuiz.option3);
                        }}
                      >
                        {currentQuestionQuiz.option3}
                      </button>
                    </Col>
                    <Col xs={6} ms={6}>
                      <button
                        className="answer-quiz-flashcard"
                        onClick={(e) => {
                          handleAnswerQuiz(e, currentQuestionQuiz.option4);
                        }}
                      >
                        {currentQuestionQuiz.option4}
                      </button>
                    </Col>
                  </Row>
                </div>
                <Button
                  variant="primary"
                  id="btn-next"
                  onClick={() => {
                    handleLoadQuestion(index + 1);
                  }}
                ></Button>
              </>
            );
        })}
        {currentQuestionQuizIndex == -1 ? (
          <>
            <h3>chào mừng đến với trắc nghiệm flashcard</h3>
            <br></br>
            <h5>chọn độ khó để bắt đầu</h5>
            <div className="flash-card-quiz-level">
              <div
                className="flash-card-quiz-level-item"
                style={{ "--clr": "#34ff4c" }}
              >
                {" "}
                <Form.Check
                  type={`radio`}
                  id={`radio1`}
                  label={`Dễ`}
                  name={`level`}
                  onClick={() => {
                    setLevel("easy");
                  }}
                />
              </div>
              <div
                className="flash-card-quiz-level-item"
                style={{ "--clr": "#f4cc11" }}
              >
                <Form.Check
                  type={`radio`}
                  id={`radio2`}
                  label={`Trung Bình`}
                  name={`level`}
                  onClick={() => {
                    setLevel("normal");
                  }}
                />
              </div>
              <div
                className="flash-card-quiz-level-item"
                style={{ "--clr": "#ff4234" }}
              >
                <Form.Check
                  type={`radio`}
                  id={`radio3`}
                  label={`Khó`}
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
                  toast.error("chọn độ khó để bắt đầu");
                } else {
                  handleLoadQuestion(0);
                  if (level == "easy") {
                    setTimerQuiz(5);
                  } else if (level == "normal") {
                    setTimerQuiz(4);
                  } else if (level == "hard") {
                    setTimerQuiz(3);
                  }
                }
              }}
            >
              Bắt đầu
            </Button>
          </>
        ) : null}
        {currentQuestionQuizIndex == listFlashcard.length ? (
          <div className="result-flashcard-quiz-final">
            <div className="result-flashcard-quiz-final-title">Kết quả</div>
            <div className="result-flashcard-quiz-final-content">
              {" "}
              <span>
                Đã làm: {totalAnswerTrueQuiz + totalAnswerFalseQuiz}/
                {listFlashcard.length}
              </span>
              <ProgressBar
                now={
                  ((totalAnswerTrueQuiz + totalAnswerFalseQuiz) /
                    listFlashcard.length) *
                  100
                }
                className="result-progress"
              />
              <span>Đúng: {totalAnswerTrueQuiz}</span>
              <ProgressBar
                variant="success"
                now={(totalAnswerTrueQuiz / listFlashcard.length) * 100}
                className="result-progress"
              />
              <span>Sai: {totalAnswerFalseQuiz}</span>
              <ProgressBar
                variant="danger"
                now={(totalAnswerFalseQuiz / listFlashcard.length) * 100}
                className="result-progress"
              />
            </div>
            <div className="result-flashcard-quiz-final-footer-title">
              {totalAnswerTrueQuiz == listFlashcard.length ? (
                <>Bạn quá xuất sắc!</>
              ) : totalAnswerTrueQuiz > listFlashcard.length - 2 ? (
                <>Bạn hoàn thành tốt!</>
              ) : totalAnswerFalseQuiz >= totalAnswerTrueQuiz ? (
                <>Cần cố gắn thêm bạn nhé!</>
              ) : (
                <>Hoàn thành nhiệm vụ!</>
              )}
            </div>
            <div className="result-flashcard-quiz-final-footer">
              <Button
                variant="primary"
                onClick={() => {
                  resetFlashcardQuiz();
                }}
              >
                {" "}
                Quay lại{" "}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Style>
  );
};

export default FlashcardQuiz;
