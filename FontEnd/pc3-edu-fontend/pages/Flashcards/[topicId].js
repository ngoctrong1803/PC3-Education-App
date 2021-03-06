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
import FlashcardMatch from "../../comps/FlashcardMatch";
import useAuth from "../../hooks/authHook";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
const Topic = () => {
  const isAuth = useAuth();
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const topicID = arrayTemp[position];
  //const listVoices = window.speechSynthesis.getVoices();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const [show, setShow] = useState("flashcard");

  const [listFlashcard, setListFlashcard] = useState([]);
  const [topic, setTopic] = useState({});
  const [showEnglish, setShowEnglish] = useState(true);
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(1);
  const flashcardRef = useRef();
  function handleChangeShow() {
    setShowEnglish((pre) => !pre);
  }
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
  async function getFlashcardByTopicID() {
    try {
      const res = await axiosJWT.get("/api/flashcard/list/" + topicID);
      setTopic(res.data.topic);
      setListFlashcard(ramdomArray(res.data.listFlashcard));
    } catch (err) {
      const errMessage = err.response.data.message ?? "???? x???y ra ngo???i l???";
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
    if (isAuth) {
      getFlashcardByTopicID();
    }
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
      volume: 1, // ??m l?????ng
      rate: readingSpeed, // t???c ????? ?????c
      pitch: 1.5, // cao ?????
    });
  };

  const [showExample, setShowExample] = useState(false);
  function handleShowExample() {
    setShowExample((pre) => !pre);
  }

  return (
    <div className="flashcard-detail-page-wrap">
      <Row>
        <Col xs={3} ms={3} className="flashcard-detail-slidebar-wrap">
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
                  <ion-icon name="id-card-outline"></ion-icon>&nbsp; Th??? ghi nh???
                </li>
                <li
                  onClick={() => {
                    setShow("quiz");
                  }}
                >
                  <ion-icon name="grid-outline"></ion-icon>&nbsp; Tr???c nghi???m
                </li>
                <li
                  onClick={() => {
                    setShow("write");
                  }}
                >
                  <ion-icon name="pencil-outline"></ion-icon>&nbsp; Vi???t t???
                </li>
                <li
                  onClick={() => {
                    setShow("match");
                  }}
                >
                  <ion-icon name="wallet-outline"></ion-icon>&nbsp; Gh??p th???
                </li>
                <li
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <ion-icon name="log-out-outline"></ion-icon>&nbsp; Quay l???i
                </li>
              </ul>
            </div>
          </div>
        </Col>
        {show == "flashcard" ? (
          <Col xs={9} ms={9} className="flashcard-game">
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "blue",
                  fontSize: "22px",
                  marginRight: "5px",
                  paddingLeft: "15px",
                }}
              >
                Hi???n th???:
              </span>
              {showEnglish ? (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    handleChangeShow();
                  }}
                >
                  Ti???ng Anh
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    handleChangeShow();
                  }}
                >
                  Ti???ng Vi???t
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
                Ph??t ??m ti???ng anh
                <ion-icon
                  name="volume-medium-outline"
                  style={{
                    fontSize: " 22px",
                  }}
                ></ion-icon>
              </Button>
              <Button
                variant="warning"
                style={{
                  marginLeft: "5px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: " 16px",
                }}
                onClick={getFlashcardByTopicID}
              >
                ?????o th??? t??? th???
                <ion-icon
                  name="swap-horizontal-outline"
                  style={{
                    fontSize: " 22px",
                  }}
                ></ion-icon>
              </Button>
              <Button
                variant="outline-info"
                style={{
                  marginLeft: "5px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: " 16px",
                }}
                onClick={handleShowExample}
              >
                {showExample ? "???n v?? d???" : "Hi???n th??? v?? d???"}

                <ion-icon
                  name="sunny-outline"
                  style={{
                    fontSize: " 22px",
                  }}
                ></ion-icon>
              </Button>
              <div style={{ width: "120px", marginLeft: "20px" }}>
                <lable>T???c ????? ?????c</lable>
                <Form.Range
                  defaultValue={50}
                  onChange={(e) => {
                    if (e.target.value > 50) {
                      setReadingSpeed(1 + e.target.value / 100);
                    } else if (e.target.value < 50) {
                      setReadingSpeed(1 - (100 - e.target.value / 100));
                    } else if (e.target.value == 50) {
                      setReadingSpeed(1);
                    }
                  }}
                />
              </div>
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
                            {showEnglish ? (
                              <>
                                {flashcardItem.meaningInEnglish + "."}
                                <br></br>
                                {showExample ? flashcardItem.example : ""}
                              </>
                            ) : (
                              <>
                                {flashcardItem.meaningInVietnamese}
                                <br></br>
                                {showExample ? flashcardItem.explain : ""}
                              </>
                            )}
                          </div>
                          <div className="flashcard-back">
                            {showEnglish ? (
                              <>
                                {flashcardItem.meaningInVietnamese}
                                <br></br>
                                {showExample ? flashcardItem.explain : ""}
                              </>
                            ) : (
                              <>
                                {flashcardItem.meaningInEnglish + "."}
                                <br></br>
                                {showExample ? flashcardItem.example : ""}
                              </>
                            )}
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
          <Col xs={9} ms={9} className="flashcard-game">
            <FlashcardQuiz listFlashcard={listFlashcard}></FlashcardQuiz>
          </Col>
        ) : null}
        {show == "write" ? (
          <Col xs={9} ms={9} className="flashcard-game">
            <FlashcardWrite listFlashcard={listFlashcard}></FlashcardWrite>
          </Col>
        ) : null}
        {show == "match" ? (
          <Col xs={9} ms={9} className="flashcard-game">
            <FlashcardMatch listFlashcard={listFlashcard}></FlashcardMatch>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};
Topic.layout = "userLayout";
export default Topic;
