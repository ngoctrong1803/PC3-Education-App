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
  const lessionID = arrayTemp[position];
  const [listUser, setListUser] = useState([]);
  const [listStatistical, setListStatistical] = useState([]);
  const [contentOfLession, setContentOfLession] = useState({});

  async function getContentOfLession() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/lession/" + lessionID
      );
      console.log("res", res.data);
      setContentOfLession(res.data);
    } catch (error) {
      toast.error("Không lấy được nội dung bài học");
    }
  }
  async function getStatisticalOfLession() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/statistical-of-exercise/lession/" + lessionID
      );
      console.log("res", res.data);
      setListUser(res.data.statisticalOfExercise.listUserInfor);
      setListStatistical(
        res.data.statisticalOfExercise.listStatisticalOfExercise
      );
    } catch (err) {
      toast.error("Không lấy được hết quả thống kê");
    }
  }
  useEffect(() => {
    getStatisticalOfLession();
    getContentOfLession();
  }, []);

  return (
    <div className="admin-statistical-page">
      <div className="admin-statistical-title">
        <span>
          Kết quả học tập của các thành viên - Môn{" "}
          {contentOfLession?.subjectOfUnit?.name}
        </span>
        <br></br>
        <span style={{ fontSize: "20px" }}>
          {contentOfLession?.unitOfLession?.unitName} -{" "}
          {contentOfLession?.lession?.lessionName}{" "}
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
                      {" "}
                      {listStatistical.map((statisItem, index) => {
                        if (statisItem.userID == userItem._id) {
                          return (
                            <Link
                              href={`/admin/subjects/lession-statistical/detail/${statisItem.userID}-${statisItem.lessionID}`}
                            >
                              <Button>Chi tiết</Button>
                            </Link>
                          );
                        }
                      })}
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
