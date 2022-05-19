import {
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const Statistical = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const examID = arrayTemp[position];
  const [listUser, setListUser] = useState([]);
  const [listStatistical, setListStatistical] = useState([]);
  const [contentOfExam, setContentOfExam] = useState({});

  async function getContentOfExam() {
    try {
      const res = await axios.get("http://localhost:8000/api/exam/" + examID);
      console.log("res", res.data);
      setContentOfExam(res.data.exam);
    } catch (error) {
      toast.error("Không lấy được nội dung bài học");
    }
  }
  async function getStatisticalOfExam() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/statistical-of-exam/exam/" + examID
      );

      const statisticalData = res.data.statisticalOfExam;
      console.log("statisticalData", statisticalData);
      setListUser(statisticalData.listUserInfor);
      setListStatistical(statisticalData.listStatisticalOfExam);
    } catch (err) {
      toast.error("Không lấy được hết quả thống kê");
    }
  }
  useEffect(() => {
    getStatisticalOfExam();
    getContentOfExam();
  }, []);

  return (
    <div className="admin-statistical-page">
      <div className="admin-statistical-title">
        <span>Kết quả bài kiểm tra của các thành viên </span>
        <br></br>
        <span style={{ fontSize: "20px" }}>
          Tên bài kiểm tra: {contentOfExam.title}
        </span>
      </div>
      <div className="admin-statistical-header">
        <InputGroup className="mb-3 admin-statistical-header-find ">
          <FormControl
            placeholder="Nhập tên người dùng"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary">Tìm kiếm</Button>
        </InputGroup>
        <Button
          variant="outline-warning"
          onClick={() => {
            window.history.back();
          }}
        >
          Quay lại
        </Button>
      </div>
      <div className="admin-statistical-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Lớp</th>
              <th>Điểm số</th>
              <th>Thời gian</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((userItem, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{userItem.fullname}</td>
                    <td>{userItem.class}</td>
                    <td>
                      {listStatistical.map((statisItem, index) => {
                        if (statisItem.userID == userItem._id) {
                          return <>{statisItem.score}</>;
                        }
                      })}
                    </td>
                    <td>
                      {listStatistical.map((statisItem, index) => {
                        if (statisItem.userID == userItem._id) {
                          return (
                            <>
                              {" "}
                              {/* hour */}
                              {Math.floor(statisItem.time / 60 / 60) < 10 &&
                              statisItem.time != -1 ? (
                                <span>
                                  0{Math.floor(statisItem.time / 60 / 60)}:
                                </span>
                              ) : statisItem.time != -1 ? (
                                <span>
                                  {Math.floor(statisItem.time / 60 / 60)}:
                                </span>
                              ) : null}
                              {/* minute */}
                              {Math.floor(statisItem.time / 60) < 10 &&
                              statisItem.time != -1 ? (
                                <span>
                                  0{Math.floor(statisItem.time / 60)}:
                                </span>
                              ) : statisItem.time != -1 ? (
                                <span>{Math.floor(statisItem.time / 60)}:</span>
                              ) : null}
                              {/* second */}
                              {Math.floor(statisItem.time) < 10 &&
                              statisItem.time != -1 ? (
                                <span>0{Math.floor(statisItem.time)}</span>
                              ) : statisItem.time != -1 ? (
                                <span>{Math.floor(statisItem.time)}</span>
                              ) : null}
                            </>
                          );
                        }
                      })}
                    </td>
                    <td>
                      <Link
                        href={`/admin/exams/statistical/detail/${userItem._id}-${examID}`}
                      >
                        <Button>Chi tiết</Button>
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className="main-statistical-list-pagination">
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </div>
    </div>
  );
};
Statistical.layout = "adminLayout";
export default Statistical;
