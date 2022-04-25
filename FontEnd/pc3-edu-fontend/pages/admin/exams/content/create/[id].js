import { Form, Row, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Editor from "../../../../../comps/Ckeditor";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CreateQuestion = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const examID = arrayTemp[position];
  const [exam, setExam] = useState();
  const [categoryOfQuestion, setCategoryOfQuestion] = useState();
  // data to create Question
  const [contentOfQuestion, setContentOfQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [cateExerID, setCateExerID] = useState("");
  const [recommend, setRecommend] = useState("");
  const [explain, setExplain] = useState("");

  // handel get content
  async function getInforOfExam() {
    try {
      const url = "http://localhost:8000/api/exam/" + examID;
      const res = await axios.get(url);
      setExam(res.data.exam);
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }
  async function getCategoryOfQuestion() {
    try {
      const url = "http://localhost:8000/api/category-exercise/list";
      const res = await axios.get(url);
      setCategoryOfQuestion(res.data.listCateExer);
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }
  async function handleAddQuestion() {
    if (
      contentOfQuestion == "" ||
      option1 == "" ||
      option2 == "" ||
      option3 == "" ||
      option4 == "" ||
      answer == ""
    ) {
      toast.error(
        "bài tập chưa đủ thông tin để tạo mới câu hỏi vui lòng kiểm tra lại"
      );
    } else {
      const newQuestion = {
        question: contentOfQuestion,
        option1,
        option2,
        option3,
        option4,
        answer,
        catExeID: cateExerID,
        recommend,
        explain,
        examID,
      };
      try {
        const res = await axios.post(
          "http://localhost:8000/api/exam-question/create",
          newQuestion
        );
        toast.success("thêm mới câu hỏi thành công");
      } catch (err) {
        const errMessage = err.response?.data.message;
        toast.error(errMessage);
      }
    }
  }

  useEffect(() => {
    getInforOfExam();
    getCategoryOfQuestion();
    setEditorLoaded(true);
  }, []);

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
          <Button variant="outline-success" style={{ "margin-right": "5px" }}>
            Excel mẫu
          </Button>
          <Button
            variant="outline-warning"
            onClick={() => {
              window.history.back();
            }}
          >
            quay lại
          </Button>
        </div>
      </div>
      <div className="admin-subject-exercise-content-wrap">
        <div className="admin-subject-exercise-content-title">
          <span>{exam?.title}</span>
        </div>
        <div className="admin-subject-exercise-content-question-wrap">
          <span>Nhập thông tin của câu hỏi mới</span>
          <div className="admin-subject-exercise-content-question">
            <span>Nội dung câu hỏi</span>
            <Editor
              name="description"
              onChange={(data) => {
                setContentOfQuestion(data);
              }}
              value={contentOfQuestion}
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
                  onClick={() => {
                    setAnswer("option1");
                  }}
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    setOption1(data);
                  }}
                  value={option1}
                  editorLoaded={editorLoaded}
                />
              </Col>
              <Col>
                <Form.Check
                  label="B"
                  inline
                  name="group1"
                  type="radio"
                  id="option2"
                  onClick={() => {
                    setAnswer("option2");
                  }}
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    setOption2(data);
                  }}
                  value={option2}
                  editorLoaded={editorLoaded}
                />
              </Col>
              <Col>
                <Form.Check
                  label="C"
                  inline
                  name="group1"
                  type="radio"
                  id="option3"
                  onClick={() => {
                    setAnswer("option3");
                  }}
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    setOption3(data);
                  }}
                  value={option3}
                  editorLoaded={editorLoaded}
                />
              </Col>
              <Col>
                <Form.Check
                  label="D"
                  inline
                  name="group1"
                  type="radio"
                  id="option4"
                  onClick={() => {
                    setAnswer("option4");
                  }}
                />
                <Editor
                  name="description"
                  onChange={(data) => {
                    setOption4(data);
                  }}
                  value={option4}
                  editorLoaded={editorLoaded}
                />
              </Col>
            </Row>
          </div>
          <div className="admin-subject-exercise-content-type-and-recommend">
            <div className="admin-subject-exercise-content-type">
              <Form.Group controlId="formGridState" style={{ width: "300px" }}>
                <Form.Label>Thể loại câu hỏi</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  value={cateExerID}
                  onChange={(e) => {
                    setCateExerID(e.target.value);
                  }}
                >
                  <option>-- chọn thể loại --</option>;
                  {categoryOfQuestion?.map((item, index) => {
                    return (
                      <>
                        {
                          <option key={index} value={item._id}>
                            {item.description}
                          </option>
                        }
                      </>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="admin-subject-exercise-content-recommend">
              <span>Gợi ý</span>
              <Editor
                name="description"
                onChange={(data) => {
                  setRecommend(data);
                }}
                value={recommend}
                editorLoaded={editorLoaded}
              />
            </div>
          </div>
          <div className="admin-subject-exercise-content-explain">
            <span>Lời giải:</span>
            <Editor
              name="description"
              onChange={(data) => {
                setExplain(data);
              }}
              value={explain}
              editorLoaded={editorLoaded}
            />
          </div>
          <div className="admin-subject-exercise-footer">
            <Button variant="primary" onClick={handleAddQuestion}>
              Lưu lại
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                window.history.back();
              }}
            >
              Hủy bỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
CreateQuestion.layout = "adminLayout";
export default CreateQuestion;
