import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Pagination,
} from "react-bootstrap";
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

  //handle filter and pagination
  const [totalPage, setTotalPage] = useState([]);
  const [nameToFind, setNameToFind] = useState("");
  async function getTopics(page) {
    try {
      const res = await axiosJWT.post("/api/topic/list-in-index/" + page, {
        topicName: nameToFind,
      });
      console.log("res", res.data.listTopic);
      setListTopic(res.data.listTopic);
      const listTotalTopic = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalTopic.push(i + 1);
      }
      setTotalPage(listTotalTopic);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    if (isAuth) {
      getTopics(1);
    }
  }, [nameToFind]);

  return (
    <div className="flashcard-page-wrap">
      <div className="flashcard-page-title">
        <span>Topic Flashcard</span>
        <InputGroup
          className="mb-1 admin-users-header-find "
          style={{ width: "300px", marginLeft: "15px" }}
        >
          <FormControl
            placeholder="Nhập tên chủ đề"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={nameToFind}
            onChange={(e) => {
              setNameToFind(e.target.value);
            }}
          />
          <Button variant="primary">Tìm kiếm</Button>
        </InputGroup>
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
      <div className="flashcard-pagination">
        <Pagination>
          <Pagination.Prev />
          {totalPage.map((item) => {
            return (
              <>
                <Pagination.Item
                  className="pagination_item"
                  onClick={() => {
                    getTopics(item);
                    const listPagination =
                      document.querySelectorAll(".pagination_item");
                    const activeItem = (itemClick) => {
                      listPagination.forEach((item) => {
                        item.classList.remove("active");
                      });
                      itemClick.classList.add("active");
                    };
                    listPagination.forEach((item) => {
                      item.addEventListener("click", function () {
                        activeItem(item);
                      });
                    });
                  }}
                >
                  {item}
                </Pagination.Item>
              </>
            );
          })}
          <Pagination.Next />
        </Pagination>
      </div>
    </div>
  );
};
Flashcard.layout = "userLayout";
export default Flashcard;
