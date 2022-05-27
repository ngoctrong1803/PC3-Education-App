import { Pagination, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/dist/client/link";

const Exams = (props) => {
  const listExam = props.listExam;
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
                        <img src={examItem.imageUrl}></img>
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
     
    </div>
  );
};
export default Exams;
