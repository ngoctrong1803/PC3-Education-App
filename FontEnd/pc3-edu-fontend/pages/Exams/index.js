import {
  Row,
  Col,
  SplitButton,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Button,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Rank from "../../comps/Rank";
import Exams from "../../comps/Exams";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
// import required modules
import { Grid } from "swiper";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/authHook";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
const Exam = () => {
  const isAuth = useAuth();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const [listExam, setListExam] = useState([]);
  const [listExaTyp, setListExaTyp] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [totalPage, setTotalPage] = useState([]);

  // hande filter and pagiantion
  const [contentToFind, setContentToFind] = useState("");
  const [subjectIDToFind, setSubjectIDToFind] = useState("");
  const [typExaIDToFind, setExaTypIDToFind] = useState("");
  async function getExaTyp() {
    try {
      const res = await axiosJWT.get("/api/exam-type/list");
      setListExaTyp(res.data.listExamType);
    } catch (error) {}
  }
  async function getSubjects() {
    try {
      const res = await axiosJWT.get("/api/subjects/get-list-subject");
      setListSubject(res?.data.listSubject);
    } catch (err) {
      const errMessage = err.response?.data?.message;
      toast.error(errMessage);
    }
  }
  async function getExam(page) {
    try {
      const res = await axiosJWT.post("/api/exam/list-index", {
        page: page,
        contentToFind: contentToFind,
        subjectID: subjectIDToFind,
        exaTypID: typExaIDToFind,
      });
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPage(listTotalPage);
      console.log("list exam", res.data.listExam);
      setListExam(res.data.listExam);
    } catch (err) {
      const errMessage = err?.response?.data.message;
      toast.error(errMessage);
    }
  }
  useEffect(() => {
    if (isAuth) {
      getExaTyp();
      getSubjects();
    }
  }, []);
  useEffect(() => {
    if (isAuth) {
      getExam(1);
    }
  }, [contentToFind, subjectIDToFind, typExaIDToFind]);
  if (!isAuth) {
    return null;
  }
  return (
    <div className="exams-page">
      <Row>
        <Col xs={8} ms={8}>
          <div className="exams-nav">
            <InputGroup className="mb-3 exam-index-find">
              <FormControl
                placeholder="Nhập tên đề thi"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={contentToFind}
                onChange={(e) => {
                  setContentToFind(e.target.value);
                }}
              />
              <Button variant="primary">Tìm kiếm</Button>
            </InputGroup>
            <Form.Select
              className="select-exam-type"
              aria-label="Default select example"
              onChange={(e) => {
                setSubjectIDToFind(e.target.value);
              }}
            >
              <option value={""}>Tất cả môn học</option>
              {listSubject.map((item) => {
                return (
                  <>
                    <option value={item._id}>{item.name}</option>
                  </>
                );
              })}
            </Form.Select>
            <Form.Select
              className="select-exam-type"
              aria-label="Default select example"
              onChange={(e) => {
                setExaTypIDToFind(e.target.value);
              }}
            >
              <option value={""}>Tất cả các thể loại</option>
              {listExaTyp.map((item) => {
                return (
                  <>
                    <option value={item._id}>{item.description}</option>
                  </>
                );
              })}
            </Form.Select>
          </div>
          <div className="exams">
            <Exams listExam={listExam}></Exams>
            <div
              className="list-exams-footer"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination>
                <Pagination.Prev />
                {totalPage.map((item) => {
                  return (
                    <>
                      <Pagination.Item
                        onClick={() => {
                          getExam(item);
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
        </Col>
        <Col xs={4} ms={4}>
          <div className="exams-slidebar-right">
            <Rank name="all-exam"></Rank>
          </div>
        </Col>
      </Row>
    </div>
  );
};
Exam.layout = "userLayout";
export default Exam;
