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
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../redux/authSlice";
import useTeacherAuth from "../../../../hooks/authTeacherHook";
const Statistical = () => {
  const isTeacher = useTeacherAuth();
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const examID = arrayTemp[position];
  const [listUser, setListUser] = useState([]);
  const [listStatistical, setListStatistical] = useState([]);
  const [contentOfExam, setContentOfExam] = useState({});

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  async function getContentOfExam() {
    try {
      const res = await axiosJWT.get("/api/exam/" + examID);
      console.log("res", res.data);
      setContentOfExam(res.data.exam);
    } catch (error) {
      toast.error("Không lấy được nội dung bài học");
    }
  }

  // handle filter and pagination
  const [contentToFind, setContentToFind] = useState("");
  const [totalPage, setTotalPage] = useState([]);
  async function getStatisticalOfExam(page) {
    try {
      const res = await axiosJWT.post(
        "/api/statistical-of-exam/exam/" + examID,
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

      const statisticalData = res.data.statisticalOfExam;
      setListUser(statisticalData.listUserInfor);
      setListStatistical(statisticalData.listStatisticalOfExam);
    } catch (err) {
      toast.error("Không lấy được hết quả thống kê");
    }
  }
  useEffect(() => {
    if (isTeacher) {
      getContentOfExam();
    }
  }, []);
  useEffect(() => {
    if (isTeacher) {
      getStatisticalOfExam(1);
    }
  }, [contentToFind]);
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
            value={contentToFind}
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
                              {Math.floor(statisItem.time) -
                                Math.floor(statisItem.time / 60) * 60 <
                                10 && statisItem.time != -1 ? (
                                <span>
                                  0
                                  {Math.floor(statisItem.time) -
                                    Math.floor(statisItem.time / 60) * 60}
                                </span>
                              ) : statisItem.time != -1 ? (
                                <span>
                                  {Math.floor(statisItem.time) -
                                    Math.floor(statisItem.time / 60) * 60}
                                </span>
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
            <Pagination.Prev />
            {totalPage.map((item) => {
              return (
                <>
                  <Pagination.Item
                    className="pagination_item"
                    onClick={(e) => {
                      getStatisticalOfExam(item);
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
