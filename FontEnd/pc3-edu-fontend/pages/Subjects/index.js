import Head from "next/head";
//import { Button } from "bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectList from "../../comps/SubjectList";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
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

const Subject = () => {
  const [grade, setGrade] = useState(10);
  const [listSubject, setListSubject] = useState([]);

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

  useEffect(() => {
    getSubject();
  }, [grade]);

  return (
    <div className="subjects-page-wrap">
      <Head>
        <title>Học Tập</title>
      </Head>
      <div className="selection_list">
        <ul className="nav-grades">
          <li className="nav-item" id="grade-10">
            <Button
              variant="outline-secondary"
              onClick={() => {
                changeGrade(10);
              }}
            >
              Khối 10
            </Button>
          </li>
          <li className="nav-item" id="grade-11">
            <Button
              variant="outline-secondary"
              onClick={() => {
                changeGrade(11);
              }}
            >
              Khối 11
            </Button>
          </li>
          <li className="nav-item" id="grade-12">
            <Button
              variant="outline-secondary"
              onClick={() => {
                changeGrade(12);
              }}
            >
              Khối 12
            </Button>
          </li>
        </ul>

        <div className="subject_list">
          <h3>Các môn học khối: {grade}</h3>
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
      </div>
    </div>
  );
};
Subject.layout = "userLayout";
export default Subject;
