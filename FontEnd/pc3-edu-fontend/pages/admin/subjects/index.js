import {
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Subjects = () => {
  const [listSubject, setListSubject] = useState([]);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showUpdateSubject, setShowUpdateSubject] = useState(false);
  const [subjectID, setSubjectID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [gradeID, setGradeID] = useState("");
  const [listGrade, setListGrade] = useState([]);
  function handleCloseAddSubject() {
    setShowAddSubject(false);
  }
  function handleShowAddSubject() {
    setShowAddSubject(true);
  }
  function handleCloseUpdateSubject() {
    setShowUpdateSubject(false);
  }
  function handleShowUpdateSubject(subjectID, subjectName, gradeID) {
    setSubjectID(subjectID);
    setSubjectName(subjectName);
    setGradeID(gradeID);
    setShowUpdateSubject(true);
  }

  async function getSubject() {
    try {
      console.log("lấy api thành công");
      const res = await axios.get(
        "http://localhost:8000/api/subjects/get-list-subject"
      );
      console.log("list subject: ", res.data.listSubject);
      setListSubject(res.data.listSubject);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function getGrade() {
    const res = await axios.get("http://localhost:8000/api/grade/list");
    setListGrade(res.data.listGrade);
  }

  async function handleAddSubject(e) {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    const gradeIDOfSubject = parseInt(gradeID);
    const newSubject = {
      name: subjectName,
      gradeID: gradeIDOfSubject,
    };
    if (subjectName == "") {
      toast.error("vui lòng nhập tên môn học");
    } else if (gradeID == "") {
      toast.error("vui lòng chọn khối");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/subjects/create",
          newSubject
        );
        console.log("newSubject:", newSubject);
        toast.success("thêm mới môn học thành công");
        handleCloseAddSubject();
        getSubject();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
    console.log("data to add:", newSubject);
  }
  async function handleUpdateSubject(e) {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    console.log("data update:", subjectName, ":", gradeID, ":", subjectID);
    const gradeIDOfSubject = parseInt(gradeID);
    const updateSubject = {
      name: subjectName,
      gradeID: gradeIDOfSubject,
    };
  }

  useEffect(() => {
    getSubject();
    getGrade();
  }, []);
  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh sách các môn học</span>
      </div>
      <div className="admin-subjects-header">
        <div style={{ display: "flex" }}>
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="Nhập tên môn học"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="primary">Tìm kiếm</Button>
          </InputGroup>
          <Form.Select
            className="admin-subjects-header-role"
            aria-label="Default select example"
          >
            <option>Tìm kiếm theo Khối</option>
            <option value="1">Khối 10</option>
            <option value="2">Khối 11</option>
            <option value="3">Khối 12</option>
          </Form.Select>
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
            onClick={handleShowAddSubject}
          >
            Thêm mới
          </Button>
        </div>
        <Link href="/admin">
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-warning"
          >
            quay lại
          </Button>
        </Link>
      </div>
      <div className="admin-subjects-list">
        <Table bordered className="admin-subjects-list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên môn học</th>
              <th>Khối</th>
              <th>Đường dẫn</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listSubject.map(function (item, index) {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>Khối {item.gradeID}</td>
                    <td>{item.slug}</td>
                    <td>
                      <Link href={`subjects/content/${item.slug}`}>
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="primary"
                        >
                          Nội dung
                        </Button>
                      </Link>
                      <Link href="subjects/statistical">
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="success"
                        >
                          Thống kê
                        </Button>
                      </Link>

                      <Button
                        className="admin-subjects-header-add-user"
                        variant="warning"
                        onClick={() => {
                          handleShowUpdateSubject(
                            item._id,
                            item.name,
                            item.gradeID
                          );
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        className="admin-subjects-header-add-user"
                        variant="danger"
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className="main-subjects-list-pagination">
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
        {/* start modal add subject */}
        <Modal show={showAddSubject} onHide={handleCloseAddSubject}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm môn học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên môn học</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Toán học"
                  autoFocus
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                  }}
                />
                <Form.Label>Khối</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setGradeID(e.target.value);
                  }}
                >
                  <option value={""}>-- chọn khối --</option>
                  {listGrade.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.gradeName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddSubject}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleAddSubject}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal add subject */}
        {/* start modal update subject */}
        <Modal show={showUpdateSubject} onHide={handleCloseUpdateSubject}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật môn học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên môn học</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Toán học"
                  autoFocus
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                  }}
                />
                <Form.Label>Khối</Form.Label>
                <Form.Select
                  value={gradeID}
                  onChange={(e) => {
                    setGradeID(e.target.value);
                  }}
                >
                  <option value={""}>-- chọn khối --</option>
                  {listGrade.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.gradeName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateSubject}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleUpdateSubject}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal update subject */}
      </div>
    </div>
  );
};

Subjects.layout = "adminLayout";
export default Subjects;
