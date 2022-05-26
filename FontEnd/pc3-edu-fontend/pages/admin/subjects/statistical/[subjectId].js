import {
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
  ProgressBar,
  Modal,
  Accordion,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
const Statistical = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const subjectID = arrayTemp[position];

  const [subjectInfor, setSubjetInfor] = useState({});
  const [listUnit, setListUnit] = useState([]);
  const [listLession, setListLession] = useState([]);
  const [listStatistical, setListStatistical] = useState([]);
  const [listUser, setListUser] = useState([]);
  // handle filter and pagination
  const [contentToFind, setContentToFind] = useState("");
  const [totalPage, setTotalPage] = useState([]);
  async function getStatisticalOfSubject(page) {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/statistical-of-exercise/subject/" +
          subjectID,
        {
          page: page,
          contentToFind: contentToFind,
        }
      );
      const statisticalData = res.data.statisticalOfExercise;
      setSubjetInfor(statisticalData.subjectInfor);
      setListUnit(statisticalData.listUnit);
      setListLession(statisticalData.listLessionOfUnit);
      setListStatistical(statisticalData.listStatisticalOfExercise);
      setListUser(statisticalData.listUserInfor);
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPage(listTotalPage);
    } catch (error) {
      toast.error("Lấy dữ liệu thống kê thất bại");
    }
  }
  useEffect(() => {
    getStatisticalOfSubject(1);
  }, [contentToFind]);
  const [userIDShowDetail, setUserIDShowDetail] = useState("");
  const [showDetailStatiscal, setShowDetailStatistical] = useState(false);
  const handleShowDetailStatiscal = () => {
    setShowDetailStatistical(true);
  };
  const handleCloseDetailStatistical = () => {
    setShowDetailStatistical(false);
  };
  return (
    <div className="admin-statistical-page">
      <div className="admin-statistical-title">
        <span>Tiến trình học tập các thành viên - Môn {subjectInfor.name}</span>
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
        </InputGroup>{" "}
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
              <th>Đã hoàn thành</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((userItem, index) => {
              let counter = 0;
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{userItem.fullname}</td>
                    <td>{userItem.class}</td>
                    <td>
                      {listStatistical.map((statisItem, index) => {
                        if (statisItem.userID == userItem._id) {
                          counter++;
                        }
                        if (index == listStatistical.length - 1) {
                          return (
                            <>
                              <ProgressBar
                                striped
                                variant="success"
                                now={(counter / listLession.length) * 100}
                                label={`${Math.floor(
                                  (counter / listLession.length) * 100
                                )}%`}
                              />
                            </>
                          );
                        }
                      })}{" "}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setUserIDShowDetail(userItem._id);
                          handleShowDetailStatiscal();
                        }}
                      >
                        Chi tiết
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className="main-statistical-list-pagination">
          <Pagination className="pagination-statistical">
            <Pagination.Prev />
            {totalPage.map((item) => {
              return (
                <>
                  <Pagination.Item
                    className="pagination_item"
                    onClick={() => {
                      getStatisticalOfSubject(item);
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
        {/* start modal show detail statistical */}
        <Modal show={showDetailStatiscal} onHide={handleCloseDetailStatistical}>
          <Modal.Header closeButton>
            <Modal.Title>Các bài đã hoàn thành</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover style={{ alignItems: "center" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#198754",
                      color: "#fff",
                    }}
                  >
                    Danh sách các chương
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    {" "}
                    <Accordion defaultActiveKey="" flush>
                      {listUnit.map((unitItem, index) => {
                        return (
                          <>
                            {" "}
                            <Accordion.Item eventKey={index}>
                              <Accordion.Header>
                                {unitItem.unitName}
                              </Accordion.Header>
                              <Accordion.Body>
                                {listLession.map((lessionItem, index) => {
                                  if (lessionItem.unitID == unitItem._id) {
                                    let flag = false;
                                    return (
                                      <>
                                        {" "}
                                        <div
                                          style={{
                                            margin: "7px",
                                            boxShadow:
                                              "0 0.1rem 0.2rem rgba(167, 171, 171, 0.231)",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                          }}
                                        >
                                          <td
                                            style={{
                                              // textAlign: "center",

                                              verticalAlign: "middle",
                                            }}
                                          >
                                            <span style={{ fontSize: "16px" }}>
                                              {lessionItem.lessionName}
                                            </span>
                                          </td>
                                          <td
                                            style={{
                                              textAlign: "center",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {listStatistical.map(
                                              (statisItem, index) => {
                                                if (
                                                  statisItem.userID ==
                                                    userIDShowDetail &&
                                                  statisItem.lessionID ==
                                                    lessionItem._id
                                                ) {
                                                  flag = true;
                                                  return (
                                                    <>
                                                      {" "}
                                                      <ion-icon
                                                        name="checkmark-circle-outline"
                                                        style={{
                                                          fontSize: "22px",
                                                          color: "green",
                                                        }}
                                                      ></ion-icon>
                                                    </>
                                                  );
                                                }
                                              }
                                            )}
                                            {flag == false ? (
                                              <ion-icon
                                                name="alert-circle-outline"
                                                style={{
                                                  fontSize: "22px",
                                                  color: "#f2ac0d",
                                                }}
                                              ></ion-icon>
                                            ) : null}
                                          </td>
                                        </div>
                                      </>
                                    );
                                  }
                                })}
                              </Accordion.Body>
                            </Accordion.Item>
                          </>
                        );
                      })}
                    </Accordion>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailStatistical}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal show detail statistical */}
      </div>
    </div>
  );
};
Statistical.layout = "adminLayout";
export default Statistical;
