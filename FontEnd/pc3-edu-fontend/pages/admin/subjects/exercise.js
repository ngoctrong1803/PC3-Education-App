import { Form, Row, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Editor from "../../../comps/Ckeditor";
import { useEffect, useRef, useState } from "react";

const Exercise = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const onChangeEditor = () => {};
  return (
    <div className="admin-subject-exercise-page">
      <div className="admin-subject-exercise-header">
        <div className="admin-subject-exercise-input-file">
          <span>Thêm mới câu hỏi bằng excel</span>
          <Form.Group controlId="formFile" className="import-excel">
            <Form.Control type="file" />
          </Form.Group>
        </div>
        <div>
          <Button variant="outline-success">Excel mẫu</Button>
        </div>
      </div>
      <div className="admin-subject-exercise-content-wrap">
        <div className="admin-subject-exercise-content-title">
          <span>
            Toán lớp 10 - Chương 1. Sự đồng biến nghịch biến của hàm số
          </span>
          <br></br>
          <span>Bài 1. sự đồng biến của hàm số</span>
        </div>
        <div className="admin-subject-exercise-content-question-wrap">
          <span>Nhập thông tin của câu hỏi mới</span>
          <div className="admin-subject-exercise-content-question">
            <span>Nội dung câu hỏi</span>
            <Editor
              name="description"
              onChange={(data) => {
                console.log(data);
              }}
              editorLoaded={editorLoaded}
            />
          </div>
          <div className="admin-subject-exercise-content-answer">
            <span>Đáp án:</span>
            <Row xs={2} md={4} lg={4}>
              <Col>
                <Form.Check
                  label="A"
                  inline
                  name="group1"
                  type="radio"
                  id="option1"
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    console.log(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </Col>
              <Col>
                <Form.Check
                  label="B"
                  inline
                  name="group1"
                  type="radio"
                  id="option1"
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    console.log(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </Col>
              <Col>
                <Form.Check
                  label="C"
                  inline
                  name="group1"
                  type="radio"
                  id="option1"
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    console.log(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </Col>
              <Col>
                <Form.Check
                  label="D"
                  inline
                  name="group1"
                  type="radio"
                  id="option1"
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    console.log(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </Col>
            </Row>
          </div>
          <div className="admin-subject-exercise-content-type-and-recommend">
            <div className="admin-subject-exercise-content-type">
              <Form.Group controlId="formGridState" style={{ width: "300px" }}>
                <Form.Label>Thể loại câu hỏi</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Nhận biết</option>
                  <option>Thông hiểu</option>
                  <option>Vận dụng</option>
                  <option>Vận dụng cao</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="admin-subject-exercise-content-recommend">
              <span>Gợi ý</span>
              <Editor
                name="description"
                onChange={(data) => {
                  console.log(data);
                }}
                editorLoaded={editorLoaded}
              />
            </div>
          </div>
          <div className="admin-subject-exercise-content-explain">
            <span>Lời giải:</span>
            <Editor
              name="description"
              onChange={(data) => {
                console.log(data);
              }}
              editorLoaded={editorLoaded}
            />
          </div>
          <div className="admin-subject-exercise-footer">
            <Button variant="primary">Lưu lại</Button>
            <Button variant="primary">Hủy bỏ</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
Exercise.layout = "adminLayout";
export default Exercise;
