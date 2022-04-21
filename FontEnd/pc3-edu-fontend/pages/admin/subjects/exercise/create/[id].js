import { Form, Row, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Editor from "../../../../../comps/Ckeditor";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const CreateExercise = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];

  const [lession, setLession] = useState();
  const [unit, setUnit] = useState();
  const [subject, setSubject] = useState();
  const [categoryOfExercise, setCategoryOfExercise] = useState();

  // data to create exercise
  const [contentOfExercise, setContentOfExercise] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [cateExerID, setCateExerID] = useState("");
  const [recommend, setRecommend] = useState("");
  const [explain, setExplain] = useState("");

  // handel get content
  async function getInforOfLession() {
    try {
      const url = "http://localhost:8000/api/lession/" + lessionID;
      const res = await axios.get(url);
      setSubject(res.data.subjectOfUnit);
      setUnit(res.data.unitOfLession);
      setLession(res.data.lession);
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }
  async function getCategoryOfExercise() {
    try {
      const url = "http://localhost:8000/api/category-exercise/list";
      const res = await axios.get(url);
      console.log("data:", res.data.listCateExer);
      setCategoryOfExercise(res.data.listCateExer);
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }
  async function handleAddMCExercise() {
    if (
      contentOfExercise == "" ||
      option1 == "" ||
      option2 == "" ||
      option3 == "" ||
      option4 == "" ||
      answer == ""
    ) {
      toast.error("bài tập chưa đủ thông tin để tạo mới vui lòng kiểm tra lại");
    } else {
      alert("thêm mới bài tập");
      const newExercise = {
        question: contentOfExercise,
        option1,
        option2,
        option3,
        option4,
        answer,
        catExeID: cateExerID,
        recommend,
        explain,
        lessionID,
      };
      try {
        const res = await axios.post(
          "http://localhost:8000/api/mcexercise/create",
          newExercise
        );
        console.log("res", res);
      } catch (err) {
        const errMessage = err.response?.data.message;
        toast.error(errMessage);
      }
    }
  }
  useEffect(() => {
    const newExercise = {
      contentOfExercise,
      option1,
      option2,
      option3,
      option4,
      answer,
      cateExerID,
      recommend,
      explain,
    };
    console.log("check exercise:", newExercise);
  }, [
    contentOfExercise,
    option1,
    option2,
    option3,
    option4,
    answer,
    cateExerID,
    recommend,
    explain,
  ]);

  useEffect(() => {
    getInforOfLession();
    getCategoryOfExercise();
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
            {subject?.name} lớp {subject?.gradeID} - {unit?.unitName}
          </span>
          <br></br>
          <span>{lession?.lessionName}</span>
        </div>
        <div className="admin-subject-exercise-content-question-wrap">
          <span>Nhập thông tin của câu hỏi mới</span>
          <div className="admin-subject-exercise-content-question">
            <span>Nội dung câu hỏi</span>
            <Editor
              name="description"
              onChange={(data) => {
                setContentOfExercise(data);
              }}
              value={contentOfExercise}
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
                  {categoryOfExercise?.map((item, index) => {
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
            <Button variant="primary" onClick={handleAddMCExercise}>
              Lưu lại
            </Button>
            <Button variant="primary">Hủy bỏ</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
CreateExercise.layout = "adminLayout";
export default CreateExercise;
