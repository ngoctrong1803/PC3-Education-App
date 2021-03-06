import {
  Button,
  Col,
  Row,
  Spinner,
  Form,
  ProgressBar,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { Pagination, Navigation } from "swiper";
import axios from "axios";
import { useSpeech } from "react-web-voice";
import { toast } from "react-toastify";
import Style from "./Style";

const FlashcardMatch = ({ listFlashcard }) => {
  const [totalFlashcard, setTotalFlashcard] = useState(0);
  const [timesFalse, setTimesFalse] = useState(3);
  const [listFlashCardMatch, setListFlashCardMatch] = useState([]);
  const [listAnswerMatch, setListAnswerMatch] = useState([]);
  const [timeEasy, setTimeEasy] = useState(45);
  const [timeNormal, setTimeNormal] = useState(30);
  const [timeHard, setTimeHard] = useState(15);
  const [audioTrue, setAudioTrue] = useState(new Audio("/music/true.mp3"));
  const [audioFalse, setAudioFalse] = useState(new Audio("/music/false.mp3"));
  const [audioWin, setAudioWin] = useState(new Audio("/music/winner.mp3"));
  const [level, setLevel] = useState("");
  const startButtonRef = useRef();
  const [timerMatch, setTimerMatch] = useState(-1);
  const [totalAnswerTrueMatch, setTotalAnswerTrueMatch] = useState(0);
  const [totalAnswerFalseMatch, setTotalAnswerFalseMatch] = useState(0);
  const [done, setDone] = useState(false);
  const [start, setStart] = useState(false);
  // handle click card
  const [firstCard, setFirstCard] = useState("");
  const [countClick, setCountClick] = useState(0);
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

  useEffect(() => {
    const listAnswerMatchTemp = [];
    const listFlashCardMatchTemp = [];
    if (listFlashcard.length > 10) {
      for (var i = 0; i < 10; i++) {
        const answer = {
          english: listFlashcard[i].meaningInEnglish,
          vietnamese: listFlashcard[i].meaningInVietnamese,
        };
        listAnswerMatchTemp.push(answer);
        listFlashCardMatchTemp.push(listFlashcard[i].meaningInEnglish);
        listFlashCardMatchTemp.push(listFlashcard[i].meaningInVietnamese);
      }
    } else {
      for (var i = 0; i < listFlashcard.length; i++) {
        const answer = {
          english: listFlashcard[i].meaningInEnglish,
          vietnamese: listFlashcard[i].meaningInVietnamese,
        };
        listAnswerMatchTemp.push(answer);
        listFlashCardMatchTemp.push(listFlashcard[i].meaningInEnglish);
        listFlashCardMatchTemp.push(listFlashcard[i].meaningInVietnamese);
      }
    }

    setListAnswerMatch(listAnswerMatchTemp);
    setListFlashCardMatch(ramdomArray(listFlashCardMatchTemp));
  }, []);

  // handle reset flashcard write
  function resetFlashcardMatch() {
    setDone(false);
    setStart(false);
    setTotalAnswerFalseMatch(0);
    setTotalAnswerTrueMatch(0);
  }

  function playAnswerTrue() {
    audioTrue.volume = 0.7;
    audioTrue.play();
  }

  function playAnswerFalse() {
    audioFalse.volume = 0.7;
    audioFalse.play();
  }
  function playWin() {
    audioWin.volume = 0.7;
    audioWin.play();
  }

  function handleMatchClick(e) {
    const arrayAnswer = listAnswerMatch;
    if (countClick == 0) {
      e.target.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
      e.target.disabled = true;
      setFirstCard(e);
      setCountClick(1);
    }
    if (countClick == 1) {
      const valueOfFirstCard = firstCard.target.value;
      const valueOfSecondCard = e.target.value;
      let flag = false;
      e.target.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
      for (var i = 0; i < arrayAnswer.length; i++) {
        // if true
        if (arrayAnswer[i].english == valueOfFirstCard) {
          if (arrayAnswer[i].vietnamese == valueOfSecondCard) {
            setTotalAnswerTrueMatch((pre) => pre + 1);
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
            //handle flicker
            let change = true;
            let couter = 0;
            let flicker = setInterval(() => {
              if (change) {
                firstCard.target.style.color = "#fff";
                firstCard.target.style.backgroundColor = "#53ff30";
                e.target.style.color = "#fff";
                e.target.style.backgroundColor = "#53ff30";
                change = !change;
              } else {
                firstCard.target.style.color = "#fff";
                firstCard.target.style.backgroundColor = "#a3ff90";
                e.target.style.color = "#fff";
                e.target.style.backgroundColor = "#a3ff90";
                change = !change;
              }
              couter++;
              if (couter == 3) {
                clearInterval(flicker);
              }
            }, 300);
            //handle flicker
            flag = true;
            playAnswerTrue();
            //hanlde non-display
            setTimeout(() => {
              e.target.style.display = "none";
              firstCard.target.style.display = "none";
            }, 1200);
          }
          //if true
        } else if (arrayAnswer[i].vietnamese == valueOfFirstCard) {
          if (arrayAnswer[i].english == valueOfSecondCard) {
            flag = true;
            setTotalAnswerTrueMatch((pre) => pre + 1);
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
            playAnswerTrue();
            //handle flicker
            let change = true;
            let couter = 0;
            let flicker = setInterval(() => {
              if (change) {
                firstCard.target.style.color = "#fff";
                firstCard.target.style.backgroundColor = "#53ff30";
                e.target.style.color = "#fff";
                e.target.style.backgroundColor = "#53ff30";
                change = !change;
              } else {
                firstCard.target.style.color = "#fff";
                firstCard.target.style.backgroundColor = "#a3ff90";
                e.target.style.color = "#fff";
                e.target.style.backgroundColor = "#a3ff90";
                change = !change;
              }
              couter++;
              if (couter == 3) {
                clearInterval(flicker);
              }
            }, 300);
            //handle flicker
            //hanlde non-display
            setTimeout(() => {
              e.target.style.display = "none";
              firstCard.target.style.display = "none";
            }, 1200);
          }
        }
      }
      // if false
      if (flag == false) {
        setTotalAnswerFalseMatch((pre) => pre + 1);
        //handle flicker
        let change = true;
        let couter = 0;
        playAnswerFalse();
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
        let flicker = setInterval(() => {
          if (change) {
            firstCard.target.style.color = "#fff";
            firstCard.target.style.backgroundColor = "#ff4040";
            e.target.style.color = "#fff";
            e.target.style.backgroundColor = "#ff4040";
            change = !change;
          } else {
            firstCard.target.style.color = "#fff";
            firstCard.target.style.backgroundColor = "#ffa7a7";
            e.target.style.color = "#fff";
            e.target.style.backgroundColor = "#ffa7a7";
            change = !change;
          }
          couter++;
          if (couter == 3) {
            clearInterval(flicker);
          }
        }, 200);
        //handle flicker
        setTimeout(() => {
          firstCard.target.disabled = false;
          firstCard.target.style.color = "#fff";
          e.target.style.color = "#fff";
          firstCard.target.style.backgroundColor = "rgba(0, 47, 194, 0.5)";
          e.target.style.backgroundColor = "rgba(0, 47, 194, 0.5)";
        }, 1200);
      }
      setCountClick(0);
    }
  }
  useEffect(() => {
    if (
      totalAnswerTrueMatch != 0 &&
      totalAnswerTrueMatch == listAnswerMatch.length
    ) {
      setTimeout(() => {
        setDone(true);
        playWin();
      }, 1200);
    }
  }, [totalAnswerTrueMatch]);
  useEffect(() => {
    if (totalAnswerFalseMatch == 3) {
      setTimeout(() => {
        setDone(true);
        playWin();
      }, 1200);
    }
  }, [totalAnswerFalseMatch]);
  useEffect(() => {
    if (timerMatch == 0 && !done) {
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
      playAnswerFalse();
      setTimeout(() => {
        setDone(true);
        playWin();
      }, 2500);
    }
    const timer =
      timerMatch > 0 && setInterval(() => setTimerMatch(timerMatch - 1), 1000);
    return () => clearInterval(timer);
  }, [timerMatch]);

  return (
    <Style>
      <Container>
        <div className="flashcard-match-wrap">
          {done == false && start ? (
            // content of match flashcard
            <>
              <div className="result-flashcard-match">
                <h4>K???t qu???</h4>
                <span>
                  Ho??n th??nh: {totalAnswerTrueMatch}/{listAnswerMatch.length}
                </span>
                <ProgressBar
                  now={(totalAnswerTrueMatch / listAnswerMatch.length) * 100}
                  className="result-progress"
                />
                <span>
                  Sai: {totalAnswerFalseMatch}/ {timesFalse}
                </span>
                <ProgressBar
                  variant="danger"
                  now={(totalAnswerFalseMatch / timesFalse) * 100}
                  className="result-progress"
                />
                <br></br>
                <h6>Th???i gian</h6>
                <h4>{timerMatch}</h4>
              </div>

              <div className="content-flashcard-match">
                <div>
                  <Row>
                    {listFlashCardMatch.map((matchItem, index) => {
                      return (
                        <>
                          <div className="content-flashcard-match-item-wrap">
                            <button
                              value={matchItem}
                              className="content-flashcard-match-item"
                              onClick={(e) => {
                                handleMatchClick(e);
                              }}
                            >
                              {matchItem}
                            </button>
                          </div>
                        </>
                      );
                    })}
                  </Row>
                </div>
              </div>
              <ProgressBar
                striped
                variant="info"
                now={
                  level == "easy"
                    ? (timerMatch / timeEasy) * 100
                    : level == "normal"
                    ? (timerMatch / timeNormal) * 100
                    : level == "hard"
                    ? (timerMatch / timeHard) * 100
                    : 0
                }
                className="timrer-match"
              />
            </>
          ) : null}

          {!start ? (
            <>
              {" "}
              <h3>Ch??o m???ng ?????n v???i vi???t gh??p th???</h3>
              <br></br>
              <h5>ch???n ????? kh?? ????? b???t ?????u</h5>
              <div className="flash-card-match-level">
                <div
                  className="flash-card-match-level-item"
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
                  className="flash-card-match-level-item"
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
                  className="flash-card-match-level-item"
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
                    setStart(true);
                    if (level == "easy") {
                      setTimerMatch(timeEasy);
                    } else if (level == "normal") {
                      setTimerMatch(timeNormal);
                    } else if (level == "hard") {
                      setTimerMatch(timeHard);
                    }
                  }
                }}
              >
                B???t ?????u
              </Button>
            </>
          ) : null}
          {done && start ? (
            <div className="result-flashcard-match-final">
              <div className="result-flashcard-match-final-title">K???t qu???</div>
              <div className="result-flashcard-match-final-content">
                {" "}
                <span>
                  Ho??n th??nh: {totalAnswerTrueMatch}/{listAnswerMatch.length}
                </span>
                <ProgressBar
                  now={(totalAnswerTrueMatch / listAnswerMatch.length) * 100}
                  className="result-progress"
                />
                <span>
                  Sai: {totalAnswerFalseMatch}/ {timesFalse}
                </span>
                <ProgressBar
                  variant="danger"
                  now={(totalAnswerFalseMatch / timesFalse) * 100}
                  className="result-progress"
                />
              </div>
              <div className="result-flashcard-match-final-footer-title">
                {totalAnswerTrueMatch == listAnswerMatch.length ? (
                  <>B???n qu?? xu???t s???c!</>
                ) : totalAnswerTrueMatch > listAnswerMatch.length - 2 ? (
                  <>B???n ho??n th??nh t???t!</>
                ) : totalAnswerFalseMatch >= totalAnswerTrueMatch ? (
                  <>C???n c??? g???n th??m b???n nh??!</>
                ) : (
                  <>Ho??n th??nh nhi???m v???!</>
                )}
              </div>
              <div className="result-flashcard-match-final-footer">
                <Button
                  variant="primary"
                  onClick={() => {
                    resetFlashcardMatch();
                  }}
                >
                  {" "}
                  Quay l???i{" "}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Style>
  );
};
export default FlashcardMatch;
