import styled from "styled-components";
const Style = styled.div`
  .flashcard-write-wrap {
    background-image: url("/background/background-pinkcute.jpg");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    color: #004ba2;
    position: relative;
    margin-right: 15px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    min-height: 600px;
    border: #333 solid 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      margin-top: 75px;
    }

    .flash-card-write-level {
      box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
      padding: 35px;
      border-radius: 15px;
      .flash-card-write-level-item {
        box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.15) !important;
        background-color: var(--clr);
        color: rgb(255, 255, 255);
        font-size: 18px;
        font-weight: 500;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 5px;
      }
    }
    .result-flashcard-write {
      width: 200px;
      height: 200px;

      box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
      border-radius: 5px;
      position: absolute;
      left: 10px;
      top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .result-progress {
        width: 170px;
        height: 15px;
      }
    }
    .result-flashcard-write-final {
      margin-top: 65px;
      margin-bottom: 35px;
      width: 400px;
      height: 420px;
      background-color: rgba(243, 245, 243, 0.901);
      box-shadow: 0 0.5rem 0.5rem rgb(206, 212, 224) !important;
      border-radius: 15px;
      // position: absolute;
      left: 10px;
      top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .result-flashcard-write-final-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: 800;
        width: 100%;
        height: 70px;
        padding: 10px;
        border-radius: 15px 15px 0 0;
        background-color: rgba(53, 215, 12, 0.901);
        color: rgb(255, 255, 255);
      }
      .result-flashcard-write-final-content {
        margin-top: 15px;
        box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
        padding: 25px;
        border-radius: 10px;
      }
      .result-flashcard-write-final-footer-title {
        color: rgb(254, 70, 70);
        margin-top: 15px;
        font-size: 22px;
        font-weight: 500;
      }
      .result-flashcard-write-final-footer {
        button {
          margin: 5px;
        }
      }
      .result-progress {
        margin-top: 10px;
        width: 320px;
        height: 25px;
      }
      span {
        font-size: 20px;
      }
    }
    .timer-flashcard-write {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 150px;
      height: 150px;
      border: rgb(6, 235, 14) solid 10px;
      border-radius: 50%;
      right: 30px;
      top: 50px;
      span {
        color: rgb(9, 193, 15);
        font-weight: 600;
        font-size: 58px;
      }
    }
    .question-flashcard-write-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      width: 600px;
      height: 450px;
      border: rgb(176, 176, 176) solid 2px;
      border-radius: 10px;
      box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
      .question-flashcard-write-answer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        font-size: 20px;
        right: 15px;
        bottom: 15px;
        background-color: #69ec5a;
        width: 180px;
        height: 60px;
        border-radius: 15px;
        color: #fff;
        box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
      }
    }
    .answer-write-flashcard {
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 25px 10px 25px;
      border: rgb(212, 234, 249) solid 2px;
      width: 230px;
      height: 50px;
      background-color: #f3f5f6c4;
      border-radius: 10px;
      box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
    }
    #btn-next {
      position: absolute;
      bottom: 15px;
      right: 15px;
    }
  }
`;

export default Style;
