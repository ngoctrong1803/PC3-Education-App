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
  // handle filter and pagination
  const [contentToFind, setContentToFind] = useState("");
  const [totalPage, setTotalPage] = useState([]);
  async function getStatisticalOfLession(page) {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/statistical-of-exercise/lession/" +
          lessionID,
        {
          page: page,
          contentToFind: contentToFind,
        }
      );
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPage(listTotalPage);
      setListUser(res.data.statisticalOfExercise.listUserInfor);
      setListStatistical(
        res.data.statisticalOfExercise.listStatisticalOfExercise
      );
    } catch (err) {
      toast.error("Không lấy được hết quả thống kê");
    }
  }
  useEffect(() => {
    getContentOfLession();
  }, []);
  useEffect(() => {
    getStatisticalOfLession(1);
  }, [contentToFind]);

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
            onChange={(e) => {
              setContentToFind(e.target.value);
            }}
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
            <Pagination.Prev />
            {totalPage.map((item) => {
              return (
                <>
                  <Pagination.Item
                    className="pagination_item"
                    onClick={() => {
                      getStatisticalOfLession(item);
                      const listPagination =
                        document.querySelectorAll(".pagination_item");
                      const activeItem = (itemClick) => {
                        listPagination.forEach((item) => {
                          item.classList.remove("active");
                        });
                        itemClick.classList.add("active");
                      };
                      listPagination.forEach((item) => {
                        item.addEventListener("click", function () {
                          activeItem(item);
                        });
                      });
                    }}
                  >
                    {item}
                  </Pagination.Item>
                </>
              );
            })}

            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </div>
  );
};
Statistical.layout = "adminLayout";
export default Statistical;
