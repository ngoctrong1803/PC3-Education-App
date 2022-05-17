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
const Content = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const slug = arrayTemp[position];

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

  // handel get content
  async function getConentOfSubject() {
    try {
      console.log("slug trong efect: ", slug);
      const url = "http://localhost:8000/api/subjects/content/" + slug;
      console.log("url:", url);
      const res = await axios.get(url);
      setSubject(res.data.subject);
      setUnits(res.data.units);
      console.log("nội dung bài học:", res.data.lessions);
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
        const res = await axios.post(
          "http://localhost:8000/api/units/create",
          newUnit
        );
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
        const res = await axios.put(
          "http://localhost:8000/api/units/update/" + unitID,
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
        const res = await axios.post(
          "http://localhost:8000/api/lession/create",
          newLession
        );
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
        const res = await axios.put(
          "http://localhost:8000/api/lession/update/" + lessionID,
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
        const url = "http://localhost:8000/api/lession/delete/" + lessionID;
        const res = await axios.delete(url);
        console.log("res", res);
        handleCloseComfirmDeleteLession();
        toast.success(res.data.message);
        getConentOfSubject();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  useEffect(() => {
    getConentOfSubject();
  }, []);
  useEffect(() => {});
  return (
    <div className="subject-content-page">
      <div className="subject-content-title">
        <div>
          <span>Nội dung nôn học</span>
          <br></br>
          <h6>7 chương - 32 bài học</h6>
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
                        <ion-icon name="trash-outline"></ion-icon>
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
                                    <Button variant="primary">Thống kê</Button>
                                  </Col>
                                </Row>
                              </li>
                            ) : null}
                          </>
                        );
                      })}

                      <li>
                        {" "}
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleShowAddLession();
                            setUnitID(unitItem._id);
                          }}
                        >
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
          <Modal.Title style={{ color: "red" }}>Xóa môn học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bạn có chắc chắn muốn xóa môn học này</Form.Label>
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
    </div>
  );
};
Content.layout = "adminLayout";
export default Content;
