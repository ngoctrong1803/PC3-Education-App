import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const Rank = (props) => {
  const nameOfRank = props.name;
  const [listStatistical, setListStatistical] = useState([]);

  async function getRank() {
    try {
      if (nameOfRank == "all-subject") {
        const res = await axios.get(
          "http://localhost:8000/api/statistical-of-exercise/list-statistical-result-of-all-subject"
        );
        setListStatistical(res.data.listStatistical);
      } else if (nameOfRank == "one-subject") {
        const subjectSlug = props.subjectSlug;
        const res = await axios.get(
          "http://localhost:8000/api/statistical-of-exercise/list-statistical-result-of-subject/" +
            subjectSlug
        );
        setListStatistical(res.data.listStatistical);
      } else if (nameOfRank == "all-exam") {
        const res = await axios.get(
          "http://localhost:8000/api/statistical-of-exam/exam-statistical-result-all-exam"
        );
        setListStatistical(res.data.listStatistical);
      } else if (nameOfRank == "one-exam") {
        const examID = props.examID;
        const res = await axios.get(
          "http://localhost:8000/api/statistical-of-exam/exam-statistical-result-exam/" +
            examID
        );
        setListStatistical(res.data.listStatistical);
      }
    } catch (error) {
      const errMessage = error.response.data.message;
    }
  }
  useEffect(() => {
    getRank();
  }, [nameOfRank]);
  return (
    <>
      <div className="rank-chart">
        <div className="rank-chart-title">
          <ion-icon name="podium"></ion-icon>
          <h5>Bản xếp hạng</h5>
        </div>
        <ul>
          {listStatistical.map((statisItem, index) => {
            return (
              <>
                <li>
                  <div className="rank-item">
                    <div className="rank-item-user">
                      {index == 0 ? (
                        <img className="cup-item" src="/Ranks/gold.png"></img>
                      ) : index == 1 ? (
                        <img className="cup-item" src="/Ranks/silver.png"></img>
                      ) : index == 2 ? (
                        <img className="cup-item" src="/Ranks/bronze.png"></img>
                      ) : index == 3 ? (
                        <img
                          className="cup-item"
                          src="/Ranks/rank_kk.png"
                        ></img>
                      ) : index == 4 ? (
                        <img
                          className="cup-item"
                          src="/Ranks/rank_kk.png"
                        ></img>
                      ) : null}

                      <img src={statisItem.user[0].avatar}></img>
                      <span>{statisItem.user[0].fullname}</span>
                    </div>
                    <div className="rank-item-mark">
                      <span>{statisItem.totalScore}</span>
                      <ion-icon class="icon" name="star"></ion-icon>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Rank;
