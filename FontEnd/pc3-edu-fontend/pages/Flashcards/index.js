import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../hooks/authHook";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
const Flashcard = () => {
  const isAuth = useAuth();
  const [listTopic, setListTopic] = useState([]);
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  async function getTopics() {
    try {
      const res = await axiosJWT.get("/api/topic/list");
      setListTopic(res.data.listTopic);
    } catch (err) {
      const errMessage = err?.response?.data.message ?? "xảy ra ngoại lệ";
      toast.error(errMessage);
    }
  }
  useEffect(() => {
    if (isAuth) {
      getTopics();
    }
  }, []);

  return (
    <div className="flashcard-page-wrap">
      <div className="flashcard-page-title">
        <span>Topic Flashcard đã tạo</span>
      </div>
      <div className="flashcard-page-content">
        <Row sm={2} md={3} lg={5} className="list-flashcard-topic-item">
          {listTopic.map((topicItem, index) => {
            return (
              <>
                <Col>
                  <Link href={`Flashcards/${topicItem._id}`}>
                    <div className="flashcard-topic-item">
                      <img
                        src={`${topicItem.image}`}
                        style={{
                          width: "200px",
                          height: "250px",
                          borderRadius: "15px",
                          border: "2px solid #bfbfbf",
                          objectFit: "cover",
                        }}
                      ></img>
                      <div className="flashcard-topic-item-title">
                        <span>{topicItem.topicName}</span>
                      </div>
                    </div>
                  </Link>
                </Col>
              </>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
Flashcard.layout = "userLayout";
export default Flashcard;
