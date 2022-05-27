import Head from "next/head";
//import { Button } from "bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectList from "../../comps/SubjectList";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Card, Nav } from "react-bootstrap";
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
import AuthGate from "../../comps/Gate/AuthGate";

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
    if (currentUser) {
      getSubject();
      getSubjectStudying();
    }
  }, [grade]);
  return (
    <AuthGate>
      <div className="subjects-page-wrap">
        <Head>
          <title>Học Tập</title>
        </Head>
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#khoi-10">
              <Nav.Item>
                <Nav.Link
                  href="#khoi-10"
                  onClick={() => {
                    changeGrade(10);
                  }}
                >
                  Khối 10
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#khoi-11"
                  onClick={() => {
                    changeGrade(11);
                  }}
                >
                  Khối 11
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#khoi-12"
                  onClick={() => {
                    changeGrade(12);
                  }}
                >
                  Khối 12
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <div className="selection_list">
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
              <div className="subject_list mt-4">
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
            </div>
          </Card.Body>
        </Card>
      </div>
    </AuthGate>
  );
};
Subject.layout = "userLayout";
export default Subject;
