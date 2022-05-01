import { Row, Col, Accordion } from "react-bootstrap";
import Rank from "../../comps/Rank";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MathJax, MathJaxContext } from "better-react-mathjax";
const Learning = () => {
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];
  let subjectTemp = {};

  const [subject, setSubject] = useState([]);
  const [lession, setLession] = useState({});
  const [theory, setTheory] = useState({});
  const [listUnit, setListUnit] = useState([]);
  const [listLession, setListLession] = useState([]);

  async function getContentOfSubject(subjectTemp) {
    try {
      console.log("mục lục:", subjectTemp.slug);
      if (subjectTemp.slug) {
        const res = await axios.get(
          "http://localhost:8000/api/subjects/content/" + subjectTemp.slug
        );
        setSubject(res.data.subjectTemp);
        setListUnit(res.data.units);
        setListLession(res.data.lessions);
      }
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function getContentOfLession() {
    if (lessionID) {
      try {
        const url = "http://localhost:8000/api/lession/" + lessionID;
        const res = await axios.get(url);
        console.log("lession res:", res.data);
        setLession(res.data.lession);
        setTheory(res.data.theory);
        subjectTemp = res.data.subjectOfUnit;
        console.log("subjectTemp", subjectTemp);
        getContentOfSubject(subjectTemp);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  useEffect(() => {
    getContentOfLession();
  }, [lessionID]);
  return (
    <>
      <MathJaxContext config={config}>
        <Row>
          <Col xs={9} md={9}>
            <div className="learning-detail-wrap">
              <div className="learning-detail-title">
                <h2>{lession.lessionName}</h2>
                <Link href={`/Exercises/${lessionID}`}>
                  <button type="button" className="btn btn-primary">
                    Bài tập vận dụng
                  </button>
                </Link>
              </div>
              <div className="learning-detail-content-wrap">
                <div className="learning-detail-content">
                  <MathJax>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: theory?.content,
                      }}
                    />
                  </MathJax>
                </div>
                <Link href={`/Exercises/${lessionID}`}>
                  <button type="button" className="btn btn-primary">
                    Bài tập vận dụng
                  </button>
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={3} md={3}>
            <div className="learning-slidebar-right">
              <div>
                <h5>
                  {listUnit.length} chương - {listLession.length} bài học
                </h5>
                <Accordion defaultActiveKey={0}>
                  {listUnit.map((unitItem, index) => {
                    return (
                      <>
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            {unitItem.unitName}
                          </Accordion.Header>
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
        </Row>
      </MathJaxContext>
    </>
  );
};
Learning.layout = "userLayout";
export default Learning;
