import { Row, Col, Button, ProgressBar, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSpeech } from "react-web-voice";
import { toast } from "react-toastify";

const Topic = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const topicID = arrayTemp[position];
  //const listVoices = window.speechSynthesis.getVoices();

  const [show, setShow] = useState("flashcard");

  const [listFlashcard, setListFlashcard] = useState([]);
  const [topic, setTopic] = useState({});
  const [showEnglish, setShowEnglish] = useState(true);
  const [showFlashcard, setShowFlashcard] = useState(false);
  const flashcardRef = useRef();
  function handleChangeShow() {
    setShowEnglish((pre) => !pre);
  }

  async function getFlashcardByTopicID() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/flashcard/list/" + topicID
      );
      setTopic(res.data.topic);
      setListFlashcard(res.data.listFlashcard);
      console.log("list flash card", res.data.listFlashcard);
    } catch (err) {
      const errMessage = err.response.data.message ?? "Đã xảy ra ngoại lệ";
      toast.error(errMessage);
    }
  }
  function handleShowFlashcard(index) {
    if (!showFlashcard) {
      document.getElementById(`flashcard${index}`).classList.add("show");
      setShowFlashcard(true);
    } else {
      document.getElementById(`flashcard${index}`).classList.remove("show");
      setShowFlashcard(false);
    }
  }
  useEffect(() => {
    getFlashcardByTopicID();
  }, []);

  //handle speak
  const { messages, speak } = useSpeech({ voice: "karen" });
  const speakButtonHandler = async () => {
    let textToSpeak = "";
    const collection = document.getElementsByClassName("swiper-slide-active");
    if (showEnglish) {
      textToSpeak =
        collection[0]?.children[0].children[0].children[0].outerText ?? "";
    } else {
      textToSpeak =
        collection[0]?.children[0].children[0].children[1].outerText ?? "";
    }
    const utterance = await speak({
      text: textToSpeak,
      volume: 1,
      rate: 1, // tốc độ đọc
      pitch: 1.5, // cao độ
    });
  };

  // handle flashcard quiz
  const [level, setLevel] = useState("");
  const [timerQuiz, setTimerQuiz] = useState(-1);
  const [totalAnswerTrueQuiz, setTotalAnswerTrueQuiz] = useState(0);
  const [totalAnswerFalseQuiz, setTotalAnswerFalseQuiz] = useState(0);
  const [currentQuestionQuizIndex, setCurrentQuestionIndex] = useState(-1);
  const [currentQuestionQuiz, setCurrentQuestionQuiz] = useState({});

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
    setCurrentQuestionIndex(index);
    const currentFlashcard = listFlashcard[index];

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
        // setCurrentQuestionIndex((pre) => pre + 1);
        // handleLoadQuestion(currentQuestionQuizIndex + 1);
      }
    }
    const timer =
      timerQuiz > 0 && setInterval(() => setTimerQuiz(timerQuiz - 1), 1000);
    return () => clearInterval(timer);
  }, [timerQuiz]);
  function handleAnswerQuiz(e, answer) {
    console.log("current Question:", currentQuestionQuiz);
    console.log("answer:", answer);
    const result = currentQuestionQuiz.answer == answer;
    if (result) {
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
  }

  return (
    <div className="flashcard-detail-page-wrap">
      <Row>
        <Col xs={3} ms={3}>
          <div className="flashcard-detail-slidebar">
            <div className="flashcard-detail-title">
              <span>Flash Card</span>
            </div>
            <div className="flashcard-detail-function">
              <ul>
                <li
                  onClick={() => {
                    setShow("flashcard");
                  }}
                >
                  Thẻ ghi nhớ
                </li>
                <li
                  onClick={() => {
                    setShow("quiz");
                    setCurrentQuestionIndex(-1);
                  }}
                >
                  Trắc nghiệm
                </li>
                <li
                  onClick={() => {
                    setShow("write");
                  }}
                >
                  Viết từ
                </li>
                <li
                  onClick={() => {
                    setShow("matchcard");
                  }}
                >
                  Ghép thẻ
                </li>
                <li
                  onClick={() => {
                    setShow("game");
                  }}
                >
                  Thiên thạch
                </li>
              </ul>
            </div>
          </div>
        </Col>
        {show == "flashcard" ? (
          <Col xs={9} ms={9}>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{ color: "blue", fontSize: "22px", marginRight: "5px" }}
              >
                Hiển thị:
              </span>
              {showEnglish ? (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    handleChangeShow();
                  }}
                >
                  Tiếng Anh
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    handleChangeShow();
                  }}
                >
                  Tiếng Việt
                </Button>
              )}
              <Button
                variant="primary"
                style={{
                  marginLeft: "5px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: " 16px",
                }}
                onClick={speakButtonHandler}
              >
                Phát âm tiếng anh
                <ion-icon
                  name="volume-medium-outline"
                  style={{
                    fontSize: " 22px",
                  }}
                ></ion-icon>
              </Button>
            </div>
            <div className="flashcard-detail-content">
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="flashcard-swiper"
              >
                {listFlashcard.map((flashcardItem, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div
                        className="flashcard-item"
                        id={`flashcard${index}`}
                        onClick={() => {
                          handleShowFlashcard(index);
                        }}
                      >
                        <div className="flashcard-item-inner">
                          <div className="flashcard-front">
                            {showEnglish
                              ? flashcardItem.meaningInEnglish
                              : flashcardItem.meaningInVietnamese}
                          </div>
                          <div className="flashcard-back">
                            {showEnglish
                              ? flashcardItem.meaningInVietnamese
                              : flashcardItem.meaningInEnglish}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </Col>
        ) : null}
        {show == "quiz" ? (
          <Col xs={9} ms={9}>
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
                          now={
                            (totalAnswerTrueQuiz / listFlashcard.length) * 100
                          }
                          className="result-progress"
                        />
                        <span>Sai: {totalAnswerFalseQuiz}</span>
                        <ProgressBar
                          variant="danger"
                          now={
                            (totalAnswerFalseQuiz / listFlashcard.length) * 100
                          }
                          className="result-progress"
                        />
                      </div>
                      <div className="timer-flashcard-quiz">
                        <span>{timerQuiz}</span>
                      </div>
                      <div className="question-flashcard-quiz-wrap">
                        <h4>{currentQuestionQuiz.question}</h4>
                      </div>
                      <div>
                        <Row style={{ marginTop: "15px" }}>
                          <Col xs={6} ms={6}>
                            <div
                              className="answer-flashcard"
                              onClick={(e) => {
                                handleAnswerQuiz(
                                  e,
                                  currentQuestionQuiz.option1
                                );
                              }}
                            >
                              <h5>{currentQuestionQuiz.option1}</h5>
                            </div>
                          </Col>
                          <Col xs={6} ms={6}>
                            <div
                              className="answer-flashcard"
                              onClick={(e) => {
                                handleAnswerQuiz(
                                  e,
                                  currentQuestionQuiz.option2
                                );
                              }}
                            >
                              <h5>{currentQuestionQuiz.option2}</h5>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} ms={6}>
                            <div
                              className="answer-flashcard"
                              onClick={(e) => {
                                handleAnswerQuiz(
                                  e,
                                  currentQuestionQuiz.option3
                                );
                              }}
                            >
                              <h5>{currentQuestionQuiz.option3}</h5>
                            </div>
                          </Col>
                          <Col xs={6} ms={6}>
                            <div
                              className="answer-flashcard"
                              onClick={(e) => {
                                handleAnswerQuiz(
                                  e,
                                  currentQuestionQuiz.option4
                                );
                              }}
                            >
                              <h5>{currentQuestionQuiz.option4}</h5>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Button
                        variant="primary"
                        id="btn-next"
                        onClick={() => {
                          handleLoadQuestion(index + 1);
                        }}
                      >
                        Câu tiếp theo
                      </Button>
                    </>
                  );
              })}
              {currentQuestionQuizIndex == -1 ? (
                <>
                  <h3>chào mừng đến với trắc nghiệm flashcard</h3>
                  <br></br>
                  <h5>chọn độ khó</h5>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        setLevel("easy");
                      }}
                    >
                      Dễ
                    </Button>
                    <Button
                      variant="outline-warning"
                      onClick={() => {
                        setLevel("normal");
                      }}
                    >
                      Trung bình
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        setLevel("hard");
                      }}
                    >
                      Khó
                    </Button>
                  </ButtonGroup>
                  <br></br>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleLoadQuestion(0);
                      if (level == "easy") {
                        setTimerQuiz(5);
                      } else if (level == "normal") {
                        setTimerQuiz(4);
                      } else if (level == "hard") {
                        setTimerQuiz(3);
                      }
                    }}
                  >
                    Bắt đầu
                  </Button>
                </>
              ) : null}
              {currentQuestionQuizIndex == listFlashcard.length ? (
                <div>kết quả làm bài</div>
              ) : null}
            </div>
          </Col>
        ) : null}
        {show == "write" ? (
          <Col xs={9} ms={9}>
            <div></div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};
Topic.layout = "userLayout";
export default Topic;
