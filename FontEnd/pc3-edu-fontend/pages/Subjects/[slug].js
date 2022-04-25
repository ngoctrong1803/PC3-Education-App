import { useRouter } from "next/router";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Rank from "../../comps/Rank";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Detail = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const slugOfSubject = arrayTemp[position];
  const [subject, setSubject] = useState();
  const [listUnit, setListUnit] = useState([]);
  const [listLession, setListLession] = useState([]);

  async function getContentOfSubject() {
    console.log("slug", slugOfSubject);
    if (slugOfSubject) {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/subjects/content/" + slugOfSubject
        );
        setSubject(res.data.subject);
        setListUnit(res.data.units);
        setListLession(res.data.lessions);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  useEffect(() => {
    getContentOfSubject();
  }, []);
  return (
    <>
      <Row>
        <Col xs={9} md={9}>
          <div className="subject-detail-wrap">
            <div className="subject-detail-title">
              <h3>
                {subject?.name} - Lớp {subject?.gradeID}
              </h3>
            </div>
            <div className="subject-detail-content">
              <h5>Nội dung môn học</h5>
              <div className="mt-4">
                <span>{listUnit.length} chương</span>
                <span>-</span>
                <span>{listLession.length} bài học</span>
              </div>
              <Accordion defaultActiveKey={0}>
                {listUnit.map((unitItem, index) => {
                  return (
                    <>
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>{unitItem.unitName}</Accordion.Header>
                        <Accordion.Body>
                          {listLession.map((lessionItem, index) => {
                            if (lessionItem.unitID == unitItem._id)
                              return (
                                <>
                                  <Link href={`/Learning/${lessionItem._id}`}>
                                    <div className="lession-item">
                                      {lessionItem.lessionName}
                                    </div>
                                  </Link>
                                </>
                              );
                          })}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </Col>
        <Col xs={3} md={3}>
          <div className="subject-slidebar-right">
            <h3 className="mt-4">Miễn phí</h3>
            <div className="description-item">
              <ion-icon name="school-outline"></ion-icon>
              Tổng: 5 Chương - 72 bài học
            </div>
            <div className="btn btn-primary mt-4">Ôn tập miễn phí</div>
            <div className="mt-4">
              <Rank></Rank>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
Detail.layout = "userLayout";
export default Detail;
