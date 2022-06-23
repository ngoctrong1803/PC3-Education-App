import { Button, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Admin.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../helper/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
import Link from "next/link";
import useAdminAuth from "../../hooks/authAdminHook";
const Teacher = () => {
  const [isLoad, setIsLoad] = useState(false);
  const isAdmin = useAdminAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const [totalExam, setTotalExam] = useState(0);
  const [totalFlascard, setTotalFlascard] = useState(0);
  const [totalLession, setTotalLession] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalSubject, setTotalSubject] = useState(0);
  const [totalUnit, setTotalUnit] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalBlog, setTotalBlog] = useState(0);

  const [listStatistical, setListStatistical] = useState([]);
  async function getGoodStudent() {
    try {
      const res = await axiosJWT.get(
        "/api/statistical-of-exercise/list-statistical-result-of-all-subject"
      );
      setListStatistical(res.data.listStatistical);
    } catch (error) {}
  }
  async function getStatistical() {
    try {
      const res = await axiosJWT.get("/api/user/statistical-of-page");
      console.log("statistical", res.data.data);
      const {
        totalUser,
        totalSubject,
        totalUnit,
        totalLession,
        totalQuestion,
        totalExam,
        totalBlog,
        totalFlascard,
      } = res.data.data;

      setTotalExam(totalExam);
      setTotalFlascard(totalFlascard);
      setTotalLession(totalLession);
      setTotalQuestion(totalQuestion);
      setTotalSubject(totalSubject);
      setTotalUnit(totalUnit);
      setTotalUser(totalUser);
      setTotalBlog(totalBlog);
    } catch (error) {
      console.log("lỗi tại đây", error);
    }
  }
  useEffect(() => {
    if (isAdmin) {
      setIsLoad(true);
      getGoodStudent();
      getStatistical();
    }
  }, []);
  if (!isLoad) {
    return null;
  } else {
    return (
      <div className="admin-home-page">
        <div className="statistical-table">
          <div className="statistical-table-title">
            <span>Bảng thống kê</span>
          </div>
          <div className="statistical-table-content">
            <Row xs={2} md={3} lg={4} className="statistical-list-item">
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalUser}</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Thành Viên</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalSubject}</span>
                    <span>
                      <ion-icon name="book-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Môn Học</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalUnit}</span>
                    <span>
                      <ion-icon name="document-text-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Chuyên Đề</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalLession}</span>
                    <span>
                      <ion-icon name="documents-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Bài Học</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalQuestion}</span>
                    <span>
                      <ion-icon name="chatbubbles-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Câu Hỏi</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalExam}</span>
                    <span>
                      <ion-icon name="newspaper-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Đề Thi</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalBlog}</span>
                    <span>
                      <ion-icon name="receipt-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Bài Viết</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>{totalFlascard}</span>
                    <span>
                      <ion-icon name="id-card-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Flashcard</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="students-top">
          <div className="students-top-title">
            <span>Danh sách cách học sinh có thành tích cao</span>
          </div>
          <div className="students-top-content">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Thứ hạng</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Tổng điểm</th>
                  <th>Lớp</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {listStatistical.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.user[0].fullname}</td>
                        <td>{item.user[0].email}</td>
                        <td>{item.user[0].phone}</td>
                        <td>{item.totalScore} điểm</td>
                        <td>{item.user[0].class}</td>
                        <td>
                          <Link
                            href={`/admin/users/detail/${item.user[0]._id}`}
                          >
                            <Button variant="primary">Thông tin</Button>
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
};
Teacher.layout = "teacherLayout";
export default Teacher;
