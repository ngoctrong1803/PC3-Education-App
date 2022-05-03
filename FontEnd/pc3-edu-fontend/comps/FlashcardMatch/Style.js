import styled from "styled-components";
const Style = styled.div`
  .flashcard-match-wrap {
    background-image: url("/background/background-beach.jpg");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    position: relative;
    margin-right: 15px;
    border-radius: 10px;
    min-height: 600px;
    width: 100%;
    height: 100%;
    border: #333 solid 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      margin-top: 75px;
    }
    .content-flashcard-match {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      border: solid #333 2px;
      right: 15px;
      bottom: 15px;
      top: 15px;
      left: 230px;
      border-radius: 15px;
      padding: 25px;
      .content-flashcard-match-item-wrap {
        border-radius: 1px;
        width: 190px;
        height: 100px;
        padding: 0px;
        background-color: rgba(18, 14, 14, 0.1);

        margin: 0.5px;
        box-shadow: 0 0.3rem 0.3rem rgba(255, 255, 255, 0.15) !important;
        .content-flashcard-match-item {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 47, 194, 0.5);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }

    .flash-card-match-level {
      box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
      padding: 35px;
      border-radius: 15px;
      .flash-card-match-level-item {
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
    .result-flashcard-match {
      padding-top: 15px;
      width: 200px;
      height: 240px;

      background-color: rgba(255, 255, 255, 0.35);
      box-shadow: 0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.15) !important;
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
    .result-flashcard-match-final {
      margin-top: 75px;
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
      .result-flashcard-match-final-title {
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
      .result-flashcard-match-final-content {
        margin-top: 15px;
        box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15) !important;
        padding: 25px;
        border-radius: 10px;
      }
      .result-flashcard-match-final-footer-title {
        color: rgb(254, 70, 70);
        margin-top: 15px;
        font-size: 22px;
        font-weight: 500;
      }
      .result-flashcard-match-final-footer {
        button {
          margin: 25px;
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
    .timer-flashcard-match {
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
    .timrer-match {
      position: absolute;
      width: 100%;
      height: 10px;
      bottom: 5px;
    }
  }
`;

export default Style;
