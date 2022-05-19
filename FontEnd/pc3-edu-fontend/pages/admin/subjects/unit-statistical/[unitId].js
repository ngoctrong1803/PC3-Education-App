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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Statistical = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const unitID = arrayTemp[position];
  const [unitInfor, setUnitInfor] = useState({});
  const [listUser, setListUser] = useState([]);
  const [listLession, setListLession] = useState([]);
  const [listStatistical, setListStatistical] = useState([]);
  const [counterDone, setCounterDone] = useState(0);

  const [userIDShowDetail, setUserIDShowDetail] = useState("");
  const [showDetailStatiscal, setShowDetailStatistical] = useState(false);
  const handleShowDetailStatiscal = () => {
    setShowDetailStatistical(true);
  };
  const handleCloseDetailStatistical = () => {
    setShowDetailStatistical(false);
  };

  async function getStatisticalOfUnit() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/statistical-of-exercise/unit/" + unitID
      );
      console.log("res", res.data.statisticalOfExercise);
      setUnitInfor(res.data.statisticalOfExercise.unitInfor);
      setListLession(res.data.statisticalOfExercise.listLessionOfUnit);
      setListUser(res.data.statisticalOfExercise.listUserInfor);
      setListStatistical(
        res.data.statisticalOfExercise.listStatisticalOfExercise
      );
    } catch (error) {
      toast.error("Đã xảy ra ngoại lệ");
    }
  }
  useEffect(() => {
    getStatisticalOfUnit();
  }, []);

  return (
    <div className="admin-statistical-page">
      <div className="admin-statistical-title">
        <span>Tiến trình học tập các thành viên</span>
        <br></br>
        <span style={{ fontSize: "20px" }}>{unitInfor.unitName}</span>
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
          variant="warning"
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
              <th>Đã toàn thành</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((userItem, index) => {
              const counter = 0;
              return (
                <>
                  {" "}
                  <tr>
                    <td>{index + 1}</td>
                    <td>{userItem.fullname}</td>
                    <td>{userItem.class}</td>
                    <td>
                      {listStatistical.map((statisItem, index) => {
                        if (userItem._id == statisItem.userID) {
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
                      })}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          handleShowDetailStatiscal();
                          setUserIDShowDetail(userItem._id);
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
          {/* start modal show detail statistical */}
          <Modal
            show={showDetailStatiscal}
            onHide={handleCloseDetailStatistical}
          >
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
                      Tên bài học
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width: "120px",
                        backgroundColor: "#198754",
                        color: "#fff",
                      }}
                    >
                      Hoàn thành
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listLession.map((lessionItem, index) => {
                    let flag = false;
                    return (
                      <>
                        {" "}
                        <tr>
                          <td
                            style={{
                              // textAlign: "center",

                              verticalAlign: "middle",
                            }}
                          >
                            <span>{lessionItem.lessionName}</span>
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {listStatistical.map((statisItem, index) => {
                              if (
                                statisItem.userID == userIDShowDetail &&
                                statisItem.lessionID == lessionItem._id
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
                            })}
                            {flag == false ? (
                              <ion-icon
                                name="alert-circle-outline"
                                style={{ fontSize: "22px", color: "#f2ac0d" }}
                              ></ion-icon>
                            ) : null}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseDetailStatistical}
              >
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end modal show detail statistical */}
        </div>
      </div>
    </div>
  );
};
Statistical.layout = "adminLayout";
export default Statistical;
