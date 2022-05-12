import { Pagination, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/dist/client/link";

const Exams = () => {
  const [listExam, setListExam] = useState([]);

  async function getExam() {
    try {
      const res = await axios.get("http://localhost:8000/api/exam/list");
      console.log("exam", res.data.listExam);
      setListExam(res.data.listExam);
    } catch (err) {
      const errMessage = err?.response.data.message;
      toast.error(errMessage);
    }
  }
  useEffect(() => {
    getExam();
  }, []);
  return (
    <div className="list-exams-wrap">
      <div className="list-exams-title">
        <span>Tổng hợp đề thi THPT Toán</span>
      </div>
      <div className="list-exams-content">
        <Row className="list-exams-content-row">
          {listExam.map((examItem, index) => {
            return (
              <>
                {" "}
                <Link href={`/Exams/${examItem._id}`}>
                  <Col sm={6} md={4} lg={3}>
                    {""}
                    <div className="exams-item">
                      <div className="exams-item-img">
                        <img src="/user/default-avatar.png"></img>
                      </div>
                      <div className="exams-item-description">
                        <span>{examItem.title}</span>
                      </div>
                    </div>
                  </Col>
                </Link>
              </>
            );
          })}
        </Row>
      </div>
      <div className="list-exams-footer">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Item>{6}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
};
export default Exams;
