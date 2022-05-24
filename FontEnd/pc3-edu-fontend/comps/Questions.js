import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
const Question = () => {
  const [listQuestion, setListQuestion] = useState([]);
  async function getListQuestion() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/question-in-forum/list-index"
      );
      setListQuestion(res.data.listQuestion);
      console.log("res", res.data);
    } catch (error) {
      const errMessage = error.response.data.message;
      toast.error(errMessage);
    }
  }
  useEffect(() => {
    getListQuestion();
  }, []);
  return (
    <>
      <div className="question-list">
        <div className="question-list-title">
          <h5>Câu hỏi thường gặp</h5>
        </div>
        <div className="question-list-content">
          <ul>
            {listQuestion.map((quesItem, index) => {
              return (
                <>
                  <Link href={`/Forum/question-${quesItem._id}`}>
                    <li>
                      <img src="/helper/question-icon.png"></img>
                      {quesItem.title.length < 70
                        ? quesItem.title
                        : quesItem.title.substr(0, 70) + "..."}
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Question;
