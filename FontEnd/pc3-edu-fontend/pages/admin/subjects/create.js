import { Form, Row, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const Create = () => {
  const [subejctName, setSubjectName] = useState();
  const [grade, setGrade] = useState();
  const [listGrade, setListGrade] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function getGrade() {
      const res = await axios.get("http://localhost:8000/api/grade/list");
      setListGrade(res.data.listGrade);
    }
    getGrade();
  }, []);

  useEffect(() => {
    console.log(subejctName + " : " + grade);
  }, [subejctName, grade]);
  async function handleCreatSubject(e) {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    const gradeOfSubject = parseInt(grade);
    const subject = {
      name: subejctName,
      gradeID: gradeOfSubject,
    };
    console.log("subject: ", subject);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/subjects/create",
        subject
      );
      console.log("res in create subject: ", res);
      toast.success("thêm mới môn học thành công");
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  return (
    <div className="create-subject-page">
      <div className="create-subject-page-header">
        <div className="create-subject-page-header-title">
          <span>Thêm Môn Học Mới</span>
        </div>
      </div>
      <div className="create-subject-page-content">
        <div className="create-subject-page-content-add-form">
          <Form>
            <Row className="mb-3">
              <Form.Group controlId="formGridEmail">
                <Col>
                  <Form.Label>Tên môn học</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Hóa học"
                    value={subejctName}
                    onChange={(e) => {
                      setSubjectName(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Khối</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={(e) => {
                    setGrade(e.target.value);
                  }}
                >
                  {listGrade.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.gradeName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>

            <Button
              style={{ "margin-right": "5px" }}
              variant="primary"
              type="submit"
              onClick={handleCreatSubject}
            >
              Thêm mới
            </Button>
            <Button variant="primary" type="submit">
              Hủy bỏ
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
Create.layout = "adminLayout";
export default Create;
