import { Row, Col, Accordion, Button } from "react-bootstrap";
import Rank from "../../comps/Rank";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AuthGate from "../../comps/Gate/AuthGate";
import withAuth from "../../comps/HOC/withAuth";
import useAuth from "../../hooks/authHook";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
const Learning = () => {
  const isAuth = useAuth();

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const router = useRouter();
  const lessionID = router.query.lessionId;

  const config = {
    loader: { load: ["input/asciimath"] },
  };
  // const url = window.location.pathname;
  // const arrayTemp = url.split("/");
  // const position = arrayTemp.length - 1;
  // const lessionID = arrayTemp[position];
  let subjectTemp = {};

  const [subject, setSubject] = useState([]);
  const [lession, setLession] = useState({});
  const [theory, setTheory] = useState({});
  const [listUnit, setListUnit] = useState([]);
  const [listLession, setListLession] = useState([]);
  const [statistical, setStatistical] = useState(null);
  const [changeLession, setChangeLession] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  async function getContentOfSubject(subjectTemp) {
    try {
      if (subjectTemp.slug) {
        const res = await axiosJWT.get(
          "/api/subjects/content/" + subjectTemp.slug
        );
        setSubject(res.data.subject);
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
        const url = "/api/lession/" + lessionID;
        const res = await axiosJWT.get(url);

        setLession(res.data.lession);
        setTheory(res.data.theory);
        subjectTemp = res.data.subjectOfUnit;

        getContentOfSubject(subjectTemp);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function getStatistical() {
    if (lessionID) {
      try {
        const dataToFind = {
          userID: currentUser.userInfor._id,
          lessionID: lessionID,
        };
        const res = await axiosJWT.post(
          "/api/statistical-of-exercise/by-user-and-lession",
          dataToFind
        );
        console.log("đã lấy thống kê", res.data);
        if (res.data.statisticalOfExercise) {
          console.log("có thống kê");
          setStatistical(res.data.statisticalOfExercise);
        } else {
          console.log("không có thống kê");
          setStatistical(false);
        }
        setIsLoaded(true);
      } catch (err) {
        console.log("err: ", err);
        const errMessage = err?.response?.data?.message;
        toast.error(errMessage || "Đã xảy ra ngoại lệ ");
        setIsLoaded(true);
      }
    }
  }

  function handleChangeLession() {
    setChangeLession(true);
  }

  useEffect(() => {
    if (isAuth) {
      console.log("lấy thống kê");
      getStatistical();
    }
  }, [lessionID]);
  useEffect(() => {
    if (isAuth) {
      getContentOfLession();
    }
  }, [lessionID]);
  if (!isAuth) {
    return null;
  }
  if (!isLoaded) return null;
  return (
    <>
      {/* <AuthGate> */}
      <MathJaxContext config={config}>
        <Row>
          <Col xs={9} md={9}>
            <div className="learning-detail-wrap">
              <div className="learning-detail-title mb-4 pb-2">
                <h3>{lession.lessionName}</h3>
                <div>
                  {!statistical ? (
                    <Link href={`/Exercises/${lessionID}`}>
                      <button type="button" className="btn btn-primary">
                        Bài tập vận dụng
                      </button>
                    </Link>
                  ) : (
                    <Link href={`/Exercises/Result/${lessionID}`}>
                      <button type="button" className="btn btn-success">
                        Xem kết quả
                      </button>
                    </Link>
                  )}

                  <Link href={`/Subjects/${subject?.slug}`}>
                    <Button
                      variant="outline-warning"
                      style={{ marginLeft: "2px" }}
                    >
                      Quay lại
                    </Button>
                  </Link>
                </div>
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
                {!statistical ? (
                  <Link href={`/Exercises/${lessionID}`}>
                    <button type="button" className="btn btn-primary">
                      Bài tập vận dụng
                    </button>
                  </Link>
                ) : (
                  <Link href={`/Exercises/Result/${lessionID}`}>
                    <button type="button" className="btn btn-success">
                      Xem kết quả
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Col>
          <Col xs={3} md={3}>
            <div className="learning-slidebar-right">
              <div>
                <h5 className=" mt-2 mb-3">
                  Mục lục
                  {/* {listUnit.length} chương - {listLession.length} bài học */}
                </h5>
                <Accordion defaultActiveKey={0}>
                  {listUnit.map((unitItem, index) => {
                    return (
                      <>
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            <span className="fw-bold">
                              {" "}
                              {unitItem.unitName}
                            </span>
                          </Accordion.Header>
                          <Accordion.Body className="p-0">
                            {listLession.map((lessionItem, index) => {
                              if (lessionItem.unitID == unitItem._id)
                                return (
                                  <>
                                    <Link href={`/Learning/${lessionItem._id}`}>
                                      <div
                                        className="lession-item"
                                        onClick={() => {
                                          handleChangeLession();
                                        }}
                                      >
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
      {/* </AuthGate> */}
    </>
  );
};
Learning.layout = "userLayout";
export default Learning;
