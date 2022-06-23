import {
  Modal,
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
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../redux/authSlice";
import useTeacherAuth from "../../../../hooks/authTeacherHook";
const Content = () => {
  const isTeacher = useTeacherAuth();
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const slug = arrayTemp[position];
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  // property for function
  const [unitID, setUnitID] = useState();
  const [unitName, setUnitName] = useState();
  const [lessionID, setLessionID] = useState();
  const [lessionName, setLessionName] = useState();
  const [lessionNumber, setLessionNumber] = useState();

  // modal show
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showUpdateUnit, setShowUpdateUnit] = useState(false);

  const [showAddLession, setShowAddLession] = useState(false);
  const [showUpdateLession, setShowUpdateLession] = useState(false);
  const [comfirmDeleteLession, setConfirmDeleteLesssion] = useState(false);
  const [comfirmDeleteUnit, setConfirmDeleteUnit] = useState(false);

  // get data from server
  const [subject, setSubject] = useState({});
  const [units, setUnits] = useState([]);
  const [lessions, setLessions] = useState([]);

  // hadle modal on off
  const handleCloseAddUnit = () => setShowAddUnit(false);
  const handleShowAddUnit = () => setShowAddUnit(true);

  // hadle modal on off
  const handleCloseUpdateUnit = () => setShowUpdateUnit(false);
  const handleShowUpdateUnit = (uintID, unitName) => {
    setShowUpdateUnit(true);
    setUnitID(uintID);
    setUnitName(unitName);
  };

  // hadle modal on off
  const handleCloseAddLession = () => setShowAddLession(false);
  const handleShowAddLession = () => setShowAddLession(true);

  // hadle modal on off
  const handleCloseUpdateLession = () => setShowUpdateLession(false);
  const handleShowUpdateLession = (lessionID, lessionName, lessionNumber) => {
    setShowUpdateLession(true);
    setLessionID(lessionID);
    setLessionName(lessionName);
    setLessionNumber(lessionNumber);
  };

  // hadle modal on off
  const handleCloseComfirmDeleteLession = () => setConfirmDeleteLesssion(false);
  const handleShowConfirmDeleteLession = () => setConfirmDeleteLesssion(true);
  // hadle modal on off
  const handleCloseComfirmDeleteUnit = () => setConfirmDeleteUnit(false);
  const handleShowConfirmDeleteUnit = () => setConfirmDeleteUnit(true);

  // handel get content
  async function getConentOfSubject() {
    try {
      const url = "/api/subjects/content/" + slug;
      const res = await axiosJWT.get(url);
      setSubject(res.data.subject);
      setUnits(res.data.units);

      setLessions(res.data.lessions);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  // handle add unit
  async function handleAddUnit() {
    if (!unitName) {
      toast.error("tên chương không được để trống");
    } else {
      try {
        const newUnit = {
          unitName,
          slug,
        };
        const res = await axiosJWT.post("/api/units/create", newUnit);
        toast.success("thêm mới chương thành công");
        handleCloseAddUnit();
        getConentOfSubject();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleUpdateUnit() {
    const updateUnit = {
      unitName: unitName,
    };
    if (unitName == "") {
      toast.errror("vui lòng nhập tên chương");
    } else {
      try {
        const res = await axiosJWT.put(
          "/api/units/update/" + unitID,
          updateUnit
        );
        toast.success("cập nhật chương thành công");
        handleCloseUpdateUnit();
        getConentOfSubject();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  // handle add lession
  async function handleAddLession() {
    if (!lessionName) {
      toast.error("vui lòng nhập tên bài học");
    } else if (
      !Number.isInteger(Number(lessionNumber)) ||
      Number(lessionNumber) < 0
    ) {
      toast.error("số thứ tự bài học phải là 1 số tự nhiên lớn hơn 0");
    } else {
      try {
        const newLession = {
          unitID,
          lessionName,
          lessionNumber,
        };
        const res = await axiosJWT.post("/api/lession/create", newLession);
        toast.success("thêm mới bài học thành công");
        handleCloseAddLession();
        getConentOfSubject();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  async function handleUpdateLession() {
    const updateLession = {
      lessionName,
      lessionNumber,
    };
    if (lessionName == "") {
      toast.error("vui lòng nhập tên bài học");
    } else if (lessionNumber == "") {
      toast.error("vui lòng số thứ tự bài học");
    } else {
      try {
        const res = await axiosJWT.put(
          "/api/lession/update/" + lessionID,
          updateLession
        );
        toast.success("cập nhật bài học thành công");
        handleCloseUpdateLession();
        getConentOfSubject();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleDeleteLession() {
    if (!lessionID) {
      toast.error("lỗi lấy id");
    } else {
      try {
        const url = "/api/lession/delete/" + lessionID;
        const res = await axiosJWT.delete(url);
        handleCloseComfirmDeleteLession();
        toast.success(res.data.message);
        getConentOfSubject();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleDeleteUnit() {
    if (!unitID) {
      toast.error("lỗi lấy id");
    } else {
      try {
        const url = "/api/units/delete/" + unitID;
        const res = await axiosJWT.delete(url);
        handleCloseComfirmDeleteLession();
        toast.success(res.data.message);
        getConentOfSubject();
      } catch (err) {
        const errMessage = err.response?.data?.message;
        toast.error(errMessage);
      }
    }
  }
  useEffect(() => {
    if (isTeacher) {
      getConentOfSubject();
    }
  }, []);

  return (
    <div className="subject-content-page">
      <div className="subject-content-title">
        <div>
          <span>Nội dung nôn học</span>
          <br></br>
          <h6>
            {units.length} chương - {lessions.length} bài học
          </h6>
        </div>
        <Button
          style={{ "margin-right": "65px", height: "40px" }}
          className="admin-subjects-header-add-user"
          variant="outline-warning"
          onClick={() => {
            window.history.back();
          }}
        >
          quay lại
        </Button>
      </div>
      <div className="subject-content-content">
        <div className="subject-content-item">
          {/* start unit item */}
          <ul>
            {units.map((unitItem, index) => {
              return (
                <>
                  <div className="subject-content-item-unit">
                    <div className="subject-content-item-unit-title-wrap">
                      <span className="subject-content-item-unit-title">
                        {unitItem.unitName}
                      </span>
                      <span className="subject-content-item-unit-edit">
                        <ion-icon
                          name="build-outline"
                          onClick={() => {
                            handleShowUpdateUnit(
                              unitItem._id,
                              unitItem.unitName
                            );
                          }}
                        ></ion-icon>
                      </span>
                      <span className="subject-content-item-unit-delete">
                        <ion-icon
                          name="trash-outline"
                          onClick={() => {
                            //flag
                            setUnitID(unitItem._id);
                            handleShowConfirmDeleteUnit();
                          }}
                        ></ion-icon>
                      </span>
                    </div>
                    <ul>
                      {lessions.map((lessionItem, index) => {
                        return (
                          <>
                            {lessionItem.unitID == unitItem._id ? (
                              <li
                                className="subject-content-item-lession"
                                key={index}
                              >
                                <Row>
                                  <Col
                                    xs={8}
                                    md={8}
                                    lg={8}
                                    className="subject-content-item-lession-title"
                                  >
                                    <span>{lessionItem.lessionName}</span>
                                    <span className="subject-content-item-unit-edit">
                                      <ion-icon
                                        name="build-outline"
                                        onClick={() => {
                                          handleShowUpdateLession(
                                            lessionItem._id,
                                            lessionItem.lessionName,
                                            lessionItem.lessionNumber
                                          );
                                        }}
                                      ></ion-icon>
                                    </span>
                                    <span className="subject-content-item-unit-delete">
                                      <ion-icon
                                        name="trash-outline"
                                        onClick={() => {
                                          setLessionID(lessionItem._id);
                                          handleShowConfirmDeleteLession();
                                        }}
                                      ></ion-icon>
                                    </span>
                                  </Col>
                                  <Col xs={4} md={4} lg={4}>
                                    <Link
                                      href={`/admin/subjects/theory/${lessionItem._id}`}
                                    >
                                      <Button variant="primary">
                                        Lý thuyết
                                      </Button>
                                    </Link>
                                    <Link
                                      href={`/admin/subjects/exercise/list/${lessionItem._id}`}
                                    >
                                      <Button variant="primary">Bài tập</Button>
                                    </Link>
                                    <Link
                                      href={`/admin/subjects/lession-statistical/${lessionItem._id}`}
                                    >
                                      <Button variant="primary">
                                        Thống kê
                                      </Button>
                                    </Link>
                                  </Col>
                                </Row>
                              </li>
                            ) : null}
                          </>
                        );
                      })}

                      <li style={{ display: "flex" }}>
                        <Link
                          href={`/admin/subjects/unit-statistical/${unitItem._id}`}
                        >
                          <Button
                            variant="primary"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "5px",
                            }}
                          >
                            <ion-icon name="bar-chart-outline"></ion-icon> Thống
                            kê chương
                          </Button>
                        </Link>

                        <Button
                          variant="outline-primary"
                          onClick={() => {
                            handleShowAddLession();
                            setUnitID(unitItem._id);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "5px",
                          }}
                        >
                          <ion-icon name="add-circle-outline"></ion-icon>
                          Thêm mới bài học
                        </Button>
                      </li>
                    </ul>
                  </div>
                </>
              );
            })}
          </ul>
          {/* end unit item */}
          <div className="btn-add-new-unit-wrap">
            <Button onClick={handleShowAddUnit} variant="warning">
              Thêm mới chương mới
            </Button>
          </div>
        </div>
      </div>
      {/* start modal add unit */}
      <Modal show={showAddUnit} onHide={handleCloseAddUnit}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm chương mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên chương</Form.Label>
              <Form.Control
                type="text"
                placeholder="chương 1. tên chương"
                autoFocus
                value={unitName}
                onChange={(e) => {
                  setUnitName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddUnit}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleAddUnit}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal add unit */}

      {/* start modal update unit */}
      <Modal show={showUpdateUnit} onHide={handleCloseUpdateUnit}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm chương mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên chương</Form.Label>
              <Form.Control
                type="text"
                placeholder="chương 1. tên chương"
                autoFocus
                value={unitName}
                onChange={(e) => {
                  setUnitName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateUnit}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleUpdateUnit}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal update unit */}

      {/* start modal add lesssion */}
      <Modal show={showAddLession} onHide={handleCloseAddLession}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm bài học mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên bài học</Form.Label>
              <Form.Control
                type="text"
                placeholder="bài 1. tên bài học"
                autoFocus
                value={lessionName}
                onChange={(e) => {
                  setLessionName(e.target.value);
                }}
              />
              <Form.Label>Thứ tự bài học</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 hoặc 2 ,..."
                autoFocus
                value={lessionNumber}
                onChange={(e) => {
                  setLessionNumber(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddLession}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleAddLession}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal add lesssion */}
      {/* start modal update lesssion */}
      <Modal show={showUpdateLession} onHide={handleCloseUpdateLession}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật bài học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên bài học</Form.Label>
              <Form.Control
                type="text"
                placeholder="bài 1. tên bài học"
                autoFocus
                value={lessionName}
                onChange={(e) => {
                  setLessionName(e.target.value);
                }}
              />
              <Form.Label>Thứ tự bài học</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 hoặc 2 ,..."
                autoFocus
                value={lessionNumber}
                onChange={(e) => {
                  setLessionNumber(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateLession}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleUpdateLession}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal update lesssion */}
      {/* start modal comfirm delete lesssion */}
      <Modal
        show={comfirmDeleteLession}
        onHide={handleCloseComfirmDeleteLession}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Xóa bài học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Khi xóa bài học toàn bộ lý thuyết và bài của của bài học sẽ bị
                xóa. Bạn có chắc chắn muốn xóa bài học này
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseComfirmDeleteLession}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={handleDeleteLession}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal comfirm delete lesssion */}
      {/* start modal comfirm delete unit */}
      <Modal show={comfirmDeleteUnit} onHide={handleCloseComfirmDeleteUnit}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Xóa chương</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Khi xóa bài học toàn bộ lý thuyết, bài tập và bài học của của
                chương sẽ bị xóa. Bạn có chắc chắn muốn xóa chương này này
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseComfirmDeleteUnit}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={handleDeleteUnit}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal comfirm delete unit */}
    </div>
  );
};
Content.layout = "adminLayout";
export default Content;
