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
const Exams = () => {
  const [showAddExam, setShowAddExam] = useState(false);
  const [showUpdateExam, setShowUpdateExam] = useState(false);
  //flag
  // data to create new exam
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [totalQuestion, setTotalQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [exaTypID, setExaTypID] = useState("");
  const [listExaTyp, setListExaTyp] = useState([]);

  const [subjectID, setSubjectID] = useState("");
  const [listSubject, setListSubject] = useState([]);

  const [ExamID, setExamID] = useState("");
  const [listExam, setListExam] = useState([]);
  // end data to create new exam
  const [gradeID, setGradeID] = useState("");
  const [listGrade, setListGrade] = useState([]);

  function handleCloseAddExam() {
    setShowAddExam(false);
  }
  function handleShowAddExam() {
    setShowAddExam(true);
  }
  function handleCloseUpdateExam() {
    setShowUpdateExam(false);
  }
  function handleShowUpdateExam() {
    setShowUpdateExam(true);
  }

  async function getExams() {
    try {
      const res = await axios.get("http://localhost:8000/api/exam/list");
      console.log("list exam:", res.data.listExam);
      setListExam(res.data.listExam);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }
  async function getSubjects() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/subjects/get-list-subject"
      );
      console.log("list subject:", res.data.listSubject);
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
  async function getExaTyp() {
    const res = await axios.get("http://localhost:8000/api/exam-type/list");

    setListExaTyp(res.data.listExamType);
  }

  async function handleAddExam(e) {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng

    const totalQuestionOfExam = parseInt(totalQuestion);
    const timeOfExam = parseInt(time);
    if (!totalQuestionOfExam || totalQuestionOfExam < 0) {
      toast.error("tổng sổ câu hỏi phải là số tự nhiên lớn hơn 0");
    } else if (!timeOfExam || timeOfExam < 0) {
      toast.error("tổng số câu hỏi phải là số tự nhiên lớn hơn không");
    } else {
      const newExam = {
        title,
        time: timeOfExam,
        totalQuestion: totalQuestionOfExam,
        imageUrl,
        exaTypID,
        subjectID,
      };
      try {
        const res = await axios.post(
          "http://localhost:8000/api/exam/create",
          newExam
        );
        toast.success("thêm mới bài kiểm tra thành công");
        handleCloseAddExam();
        getExams();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleUpdateExam(e) {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    const totalQuestionOfExam = parseInt(totalQuestion);
    const timeOfExam = parseInt(time);
    if (!totalQuestionOfExam || totalQuestionOfExam < 0) {
      toast.error("tổng sổ câu hỏi phải là số tự nhiên lớn hơn 0");
    } else if (!timeOfExam || timeOfExam < 0) {
      toast.error("tổng số câu hỏi phải là số tự nhiên lớn hơn không");
    } else {
      const updateExam = {
        title,
        time: timeOfExam,
        totalQuestion: totalQuestionOfExam,
        imageUrl,
        exaTypID,
        subjectID,
      };
      try {
        const res = await axios.put(
          "http://localhost:8000/api/exam/update/" + ExamID,
          updateExam
        );
        toast.success("cập nhật bài kiểm tra thành công");
        handleCloseUpdateExam();
        getExams();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  useEffect(() => {
    getExams();
    getGrade();
    getExaTyp();
    getSubjects();
  }, []);
  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh sách các đề thi mới nhất</span>
      </div>
      <div className="admin-subjects-header">
        <div style={{ display: "flex" }}>
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="Nhập tên đề thi"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="primary">Tìm kiếm</Button>
          </InputGroup>
          <Form.Select
            className="admin-subjects-header-role"
            aria-label="Default select example"
          >
            <option> Khối </option>
            {listGrade.map((gradeItem, index) => {
              return (
                <>
                  <option value={gradeItem._id}>{gradeItem.gradeName}</option>
                </>
              );
            })}
          </Form.Select>
          <Form.Select
            className="admin-subjects-header-role"
            aria-label="Default select example"
          >
            <option> Môn học </option>
            {listSubject.map((subjectItem, index) => {
              return (
                <>
                  <option key={index} value={subjectItem._id}>
                    {subjectItem.name}
                  </option>
                </>
              );
            })}
          </Form.Select>
          <Form.Select
            className="admin-subjects-header-role"
            aria-label="Default select example"
          >
            <option> Thể loại </option>
            {listExaTyp.map((ExaTypItem, index) => {
              return (
                <>
                  <option value={ExaTypItem._id}>
                    {ExaTypItem.description}
                  </option>
                </>
              );
            })}
          </Form.Select>
        </div>
        <div>
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
            onClick={handleShowAddExam}
          >
            Thêm mới
          </Button>
          <Link href="/admin">
            <Button
              className="admin-subjects-header-add-user"
              variant="outline-warning"
            >
              quay lại
            </Button>
          </Link>
        </div>
      </div>
      <div className="admin-subjects-list">
        <Table bordered className="admin-subjects-list-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu đề</th>
              <th>Thể loại</th>
              <th>Môn học</th>
              <th>Thời gian</th>
              <th>Tổng số câu</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listExam.map(function (examItem, index) {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{examItem.title}</td>
                    <td>
                      {listExaTyp.map((exmTypItem, index) => {
                        if (examItem.exaTypID == exmTypItem._id)
                          return <>{exmTypItem.description}</>;
                      })}
                    </td>
                    <td>
                      {listSubject.map((subjectItem, index) => {
                        if (examItem.subjectID == subjectItem._id) {
                          return <>{subjectItem.name}</>;
                        }
                      })}
                    </td>
                    <td>{examItem.time} phút</td>
                    <td>{examItem.totalQuestion} câu</td>
                    <td>
                      <Link href={`/admin/exams/content/${examItem._id}`}>
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="primary"
                        >
                          Nội dung
                        </Button>
                      </Link>
                      <Link href="#">
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
                          handleShowUpdateExam();
                          setExamID(examItem._id);
                          setTitle(examItem.title);
                          setTime(examItem.time);
                          setTotalQuestion(examItem.totalQuestion);
                          setImageUrl(examItem.imageUrl);
                          setSubjectID(examItem.subjectID);
                          setExaTypID(examItem.exaTypID);
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
        {/* start modal add exam */}
        <Modal show={showAddExam} onHide={handleCloseAddExam}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm bài kiểm tra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tiêu đề bài kiểm tra</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Đề kiểm tra 1 tiết Toán"
                  autoFocus
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Form.Label>thời gian</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="15 hoặc 60,.. (nhập số phút)"
                  autoFocus
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
                <Form.Label>Tổng số câu hỏi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="40 hoặc 60,... (chỉ nhập số câu)"
                  autoFocus
                  value={totalQuestion}
                  onChange={(e) => {
                    setTotalQuestion(e.target.value);
                  }}
                />
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="/google/driver/anh.png"
                  autoFocus
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
                <Form.Label>Môn học</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSubjectID(e.target.value);
                  }}
                >
                  <option value={""}>-- môn học --</option>
                  {listSubject.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Label>Thể loại</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setExaTypID(e.target.value);
                  }}
                >
                  <option value={""}>-- Thể loại --</option>
                  {listExaTyp.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.description}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddExam}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleAddExam}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal add  */}
        {/* start modal update exam */}
        <Modal show={showUpdateExam} onHide={handleCloseUpdateExam}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật bài kiểm tra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tiêu đề bài kiểm tra</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Đề kiểm tra 1 tiết Toán"
                  autoFocus
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Form.Label>thời gian</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="15 hoặc 60,.. (nhập số phút)"
                  autoFocus
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
                <Form.Label>Tổng số câu hỏi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="40 hoặc 60,... (chỉ nhập số câu)"
                  autoFocus
                  value={totalQuestion}
                  onChange={(e) => {
                    setTotalQuestion(e.target.value);
                  }}
                />
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="/google/driver/anh.png"
                  autoFocus
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
                <Form.Label>Môn học</Form.Label>
                <Form.Select
                  value={subjectID}
                  onChange={(e) => {
                    setSubjectID(e.target.value);
                  }}
                >
                  <option value={""}>-- môn học --</option>
                  {listSubject.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Label>Thể loại</Form.Label>
                <Form.Select
                  value={exaTypID}
                  onChange={(e) => {
                    setExaTypID(e.target.value);
                  }}
                >
                  <option value={""}>-- Thể loại --</option>
                  {listExaTyp.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.description}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateExam}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleUpdateExam}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal update exam */}
      </div>
    </div>
  );
};

Exams.layout = "adminLayout";
export default Exams;