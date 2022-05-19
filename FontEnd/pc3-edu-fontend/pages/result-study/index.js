import Head from "next/head";
//import { Button } from "bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectList from "../../comps/SubjectList";
import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Nav,
  Tab,
  Tabs,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
// import required modules
import { Grid, Pagination } from "swiper";
import Link from "next/dist/client/link";
import axios from "axios";
import { useSelector } from "react-redux";

const Subject = () => {
  const [grade, setGrade] = useState(10);
  const [listSubject, setListSubject] = useState([]);
  const [listSubjectStudying, setListSubjectStudying] = useState([]);
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const changeGrade = (grade) => {
    setGrade(grade);
  };
  async function getSubject() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/subjects/list-subject-by-grade/" + grade
      );
      console.log("danh sách môn học:", res.data);
      setListSubject(res.data.listSubject);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function getSubjectStudying() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/statistical-of-exercise/user/" +
          currentUser.userInfor._id
      );
      setListSubjectStudying(res.data.listSubject);
    } catch (error) {
      toast.error("Lỗi lấy môn học đang học");
    }
  }

  useEffect(() => {
    getSubject();
    getSubjectStudying();
  }, [grade]);

  return (
    <div className="result-study-page-wrap">
      <Head>
        <title>Kết Quả Học Tập</title>
      </Head>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link
                href="#khoi-10"
                onClick={() => {
                  changeGrade(10);
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {" "}
                  Khối 10
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#khoi-11"
                onClick={() => {
                  changeGrade(11);
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {" "}
                  Khối 11
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#khoi-12"
                onClick={() => {
                  changeGrade(12);
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {" "}
                  Khối 12
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body style={{ minHeight: "545px" }}>
          <Tab.Container
            id="list-group-tabs-example"
            defaultActiveKey={"#" + listSubject[0]?.slug}
          >
            <Row>
              <Col
                sm={3}
                style={{
                  boxShadow: "0 0.3rem 0.5rem rgba(0, 0, 0, 0.15)",
                  borderRadius: "5px",
                  minHeight: "530px",
                }}
              >
                <span style={{ fontSize: "18px", marginBottom: "15px" }}>
                  Danh sách các môn học
                </span>
                <ListGroup style={{ margin: "15px 0px" }}>
                  {listSubject.map((subjectItem, index) => {
                    return (
                      <>
                        {" "}
                        <ListGroup.Item action href={`#${subjectItem.slug}`}>
                          {subjectItem.name}
                        </ListGroup.Item>
                      </>
                    );
                  })}
                </ListGroup>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {listSubject.map((subjectItem, index) => {
                    let persen = 33;
                    return (
                      <>
                        <Tab.Pane eventKey={`#${subjectItem.slug}`}>
                          <h4>kết quả học tập môn - {subjectItem.name}</h4>
                          <div className="progress-result-wrap">
                            {" "}
                            {persen <= 50 ? (
                              <div
                                className="progress-result"
                                style={{
                                  "--persen1": `${
                                    ((persen * 2) / 100) * 180
                                  }deg`,
                                  "--persen2": "0deg",
                                }}
                              >
                                <div className="container d-flex">
                                  <div className="row">
                                    <div className="col-md-9 col-sm-6">
                                      <div className="progress blue">
                                        <span className="progress-left">
                                          <span className="progress-bar"></span>
                                        </span>
                                        <span className="progress-right">
                                          <span className="progress-bar"></span>
                                        </span>
                                        <div className="progress-value">
                                          {persen}%
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="result-infor">
                                    <span>Tiến trình học</span> <br></br>
                                    <span>
                                      Tổng điểm tích lũy
                                    </span> <br></br> <span>Nhận xét</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="progress-result"
                                style={{
                                  "--persen1": "180deg",
                                  "--persen2": `${
                                    (((persen - 50) * 2) / 100) * 180
                                  }deg`,
                                }}
                              >
                                <div className="container d-flex justify-content-center ">
                                  <div className="row">
                                    <div className="col-md-9 col-sm-6">
                                      <div className="progress blue">
                                        <span className="progress-left">
                                          <span className="progress-bar"></span>
                                        </span>
                                        <span className="progress-right">
                                          <span className="progress-bar"></span>
                                        </span>
                                        <div className="progress-value">
                                          {persen}%
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  Tiến trình học <br></br> Tổng điểm tích lũy{" "}
                                  <br></br> Nhận xét
                                </div>
                              </div>
                            )}
                          </div>
                        </Tab.Pane>
                      </>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          {/* <div
            className="selection_list"
            style={{ marginTop: "0px", paddingTop: "0px" }}
          >
            <div className="subject_list">
              <h4>Các môn học khối: {grade}</h4>
              <Row sm={2} md={3} lg={4}>
                {listSubject.map((subjectItem, index) => {
                  return (
                    <>
                      <Col>
                        <Link href={`/Subjects/${subjectItem.slug}`}>
                          <div className="subject-item-wrap">
                            <div className="subject_item">
                              <img src={subjectItem.image}></img>
                            </div>
                            <span className="subject-title">
                              {subjectItem.name}
                            </span>
                          </div>
                        </Link>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
            <div className="subject_list">
              <h4>Bạn đang học:</h4>
              <Row sm={2} md={3} lg={4}>
                {listSubjectStudying.map((subjectItem, index) => {
                  return (
                    <>
                      <Col>
                        <Link href={`/Subjects/${subjectItem.slug}`}>
                          <div className="subject-item-wrap">
                            <div className="subject_item">
                              <img src={subjectItem.image}></img>
                            </div>
                            <span className="subject-title">
                              {subjectItem.name}
                            </span>
                          </div>
                        </Link>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
          </div> */}
        </Card.Body>
      </Card>
    </div>
  );
};
Subject.layout = "userLayout";
export default Subject;
