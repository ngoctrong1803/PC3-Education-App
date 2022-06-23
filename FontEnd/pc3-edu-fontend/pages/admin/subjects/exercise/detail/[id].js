import { Form, Row, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Editor from "../../../../../comps/Ckeditor";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../helper/axiosJWT";
import { loginSuccess } from "../../../../../redux/authSlice";
import useTeacherAuth from "../../../../../hooks/authTeacherHook";

const CreateExercise = () => {
  console.log("editer:", typeof Editor);
  if (typeof Editor !== "function") {
    window.location.reload();
  }
  const isTeacher = useTeacherAuth();
  const [editorLoaded, setEditorLoaded] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const exerciseID = arrayTemp[position];

  const [exercise, setExercise] = useState();

  const [categoryOfExercise, setCategoryOfExercise] = useState();

  const option1Ref = useRef();
  const option2Ref = useRef();
  const option3Ref = useRef();
  const option4Ref = useRef();

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

  async function getInforExercise() {
    try {
      const url = "/api/mcexercise/detail/" + exerciseID;
      const res = await axiosJWT.get(url);
      setExercise(res.data.mcExercise);
      setContentOfExercise(res.data.mcExercise.question);
      setOption1(res.data.mcExercise.option1);
      setOption2(res.data.mcExercise.option2);
      setOption3(res.data.mcExercise.option3);
      setOption4(res.data.mcExercise.option4);
      setAnswer(res.data.mcExercise.answer);
      if (res.data.mcExercise.answer == "option1") {
        option1Ref.current.checked = true;
      } else if (res.data.mcExercise.answer == "option2") {
        option2Ref.current.checked = true;
      } else if (res.data.mcExercise.answer == "option3") {
        option3Ref.current.checked = true;
      } else if (res.data.mcExercise.answer == "option4") {
        option4Ref.current.checked = true;
      }
      setCateExerID(res.data.mcExercise.catExeID);
      setRecommend(res.data.mcExercise.recommend);
      setExplain(res.data.mcExercise.explain);
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }

  async function getCategoryOfExercise() {
    try {
      const url = "/api/category-exercise/list";
      const res = await axiosJWT.get(url);
      console.log("data:", res.data.listCateExer);
      setCategoryOfExercise(res.data.listCateExer);
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }
  async function handleUpdateMCExercise() {
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
      };
      console.log("update exercise:", newExercise);
      try {
        const res = await axiosJWT.put(
          "/api/mcexercise/update/" + exerciseID,
          newExercise
        );
        toast.success("cập nhật bài tập thành công");
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
    if (isTeacher) {
      getInforExercise();
      getCategoryOfExercise();
      setEditorLoaded(true);
    }
  }, []);

  const onChangeEditor = () => {};
  return (
    <div className="admin-subject-exercise-page">
      <div className="admin-subject-exercise-header">
        <div className="admin-subject-exercise-input-file">
          <h4>Chi tiết câu hỏi</h4>
        </div>
        <div>
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
        <div className="admin-subject-exercise-content-question-wrap">
          <h5>Cập nhật nội dung câu hỏi</h5>
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
                  ref={option1Ref}
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
                  ref={option2Ref}
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
                  ref={option3Ref}
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
                  ref={option4Ref}
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
            <Button variant="primary" onClick={handleUpdateMCExercise}>
              Cập nhật
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
CreateExercise.layout = "adminLayout";
export default CreateExercise;
