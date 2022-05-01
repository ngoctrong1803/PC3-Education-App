import {
  Row,
  Col,
  Button,
  ProgressBar,
  ButtonGroup,
  Spinner,
  Form,
} from "react-bootstrap";
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
import FlashcardQuiz from "../../comps/FlashcardQuiz";
import FlashcardWrite from "../../comps/FlashcardWrite";

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
            <FlashcardQuiz listFlashcard={listFlashcard}></FlashcardQuiz>
          </Col>
        ) : null}
        {show == "write" ? (
          <Col xs={9} ms={9}>
            <FlashcardWrite listFlashcard={listFlashcard}></FlashcardWrite>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};
Topic.layout = "userLayout";
export default Topic;
