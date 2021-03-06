import { Form, Row, Button, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Editor from "../../../../../comps/Ckeditor";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/dist/client/link";
import * as XLSX from "xlsx";
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
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const lessionID = arrayTemp[position];

  const [listMCExercise, setListMCExercise] = useState([]);

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
      const url = "/api/lession/" + lessionID;
      const res = await axiosJWT.get(url);
      setSubject(res.data.subjectOfUnit);
      setUnit(res.data.unitOfLession);
      setLession(res.data.lession);
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }
  async function getListMCExercise() {
    try {
      const res = await axiosJWT.get("/api/mcexercise/list/" + lessionID);
      setListMCExercise(res.data.listMCExercise);
    } catch (err) {
      const errMessage = err.response.data.message;
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
  async function handleAddMCExercise() {
    if (
      contentOfExercise == "" ||
      option1 == "" ||
      option2 == "" ||
      option3 == "" ||
      option4 == "" ||
      answer == ""
    ) {
      toast.error("B??i t???p ch??a ????? th??ng tin ????? t???o m???i vui l??ng ki???m tra l???i");
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
        lessionID,
      };
      try {
        const res = await axiosJWT.post("/api/mcexercise/create", newExercise);
        toast.success("th??m m???i b??i t???p th??nh c??ng");
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
      getInforOfLession();
      getCategoryOfExercise();
      getListMCExercise();
      setEditorLoaded(true);
    }
  }, []);

  // handle upload file excel
  const [importExcel, setImportExcel] = useState(false);
  const [listQuestionInExcelValid, setListQuestionInExcelValid] = useState([]);
  const [listQuestionInExcelInvalid, setListQuestionInExcelInvalid] = useState(
    []
  );
  const [listQuestionExist, setListQuestionExist] = useState([]);
  const uploadFile = useRef();

  async function readExcel(e) {
    e.preventDefault();
    const reader = new FileReader();
    const fileName = e.target.files[0].name;
    const arrayTemp = fileName.split(".");
    const extend = arrayTemp[arrayTemp.length - 1];
    if (extend == "xlsx") {
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        json.shift();
        const questionArray = json;
        const questionArrayValid = [];
        const questionExist = [];
        const questionArrayInvalid = [];

        console.log(questionArray);
        // handle question in excel
        if (questionArray != 0) {
          questionArray.map((quesItem, index) => {
            let check = true;
            let temp = -1;
            const dataToPush = {
              question: quesItem?.question_content ?? "",
              option1:
                quesItem?.option_1 == undefined ? "" : "" + quesItem?.option_1,
              option2:
                quesItem?.option_2 == undefined ? "" : "" + quesItem?.option_2,
              option3:
                quesItem?.option_3 == undefined ? "" : "" + quesItem?.option_3,
              option4:
                quesItem?.option_4 == undefined ? "" : "" + quesItem?.option_4,
              answer:
                quesItem?.answer > 0 && quesItem?.answer <= 4
                  ? "option" + quesItem?.answer
                  : "" ?? "",
              explain: quesItem?.explain ?? "",
              recommend: quesItem?.explain ?? "",
              lessionID: lessionID,
              catExeID:
                categoryOfExercise.map((cateItem, index) => {
                  if (cateItem.description == quesItem.category) {
                    temp = index;
                    return cateItem._id;
                  }
                })[temp] ?? "",
            };
            listMCExercise.map((exerciseItem, index) => {
              if (
                dataToPush.question == exerciseItem.question &&
                dataToPush.option1 == exerciseItem.option1 &&
                dataToPush.option2 == exerciseItem.option2 &&
                dataToPush.option3 == exerciseItem.option3 &&
                dataToPush.option4 == exerciseItem.option4 &&
                dataToPush.answer == exerciseItem.answer &&
                dataToPush.catExeID == exerciseItem.catExeID &&
                dataToPush.lessionID == exerciseItem.lessionID
              ) {
                check = false;
              }
            });
            if (
              dataToPush.question != "" &&
              dataToPush.option1 != "" &&
              dataToPush.option2 != "" &&
              dataToPush.option3 != "" &&
              dataToPush.option4 != "" &&
              dataToPush.answer != "" &&
              dataToPush.catExeID != "" &&
              check == true
            ) {
              questionArrayValid.push(dataToPush);
            } else if (
              dataToPush.question != "" &&
              dataToPush.option1 != "" &&
              dataToPush.option2 != "" &&
              dataToPush.option3 != "" &&
              dataToPush.option4 != "" &&
              dataToPush.answer != "" &&
              dataToPush.catExeID != "" &&
              check == false
            ) {
              questionExist.push(dataToPush);
            } else {
              questionArrayInvalid.push(dataToPush);
            }
          });
          if (questionArrayValid.length == 0) {
            uploadFile.current.value = "";
          }
          setListQuestionInExcelValid(questionArrayValid);
          setListQuestionInExcelInvalid(questionArrayInvalid);
          setListQuestionExist(questionExist);
          setImportExcel(true);
        } else {
          toast.error("File r???ng vui l??ng ki???m tra l???i!");
          uploadFile.current.value = "";
        }
      };
    } else {
      toast.error("File kh??ng ????ng ?????nh d???ng!");
      uploadFile.current.value = "";
    }
  }

  async function handleUploadQuestion() {
    if (listQuestionInExcelValid.length != 0) {
      let counter = 0;
      let checkError = false;
      for (let i = 0; i < listQuestionInExcelValid.length; i++) {
        try {
          const res = await axiosJWT.post(
            "/api/mcexercise/create",
            listQuestionInExcelValid[i]
          );
          counter++;
        } catch (err) {
          checkError = true;
        }
      }
      if (counter > 0) {
        toast.success("Th??m m???i b??i t???p th??nh c??ng");
      }
      if (checkError) {
        toast.warning(
          "???? c?? c??u h???i b??? tr??ng l???p trong file excel. C??u h???i tr??ng l???p ch??? ???????c th??m 1 l???n"
        );
      }
    } else {
      toast.error("Danh s??ch c??c c??u h???i h???p l??? r???ng!");
    }
  }

  const onChangeEditor = () => {};
  return (
    <div className="admin-subject-exercise-page">
      <div className="admin-subject-exercise-header">
        <div className="admin-subject-exercise-input-file">
          <span>Th??m m???i c??u h???i b???ng excel</span>
          <Form.Group controlId="formFile" className="import-excel">
            <Form.Control
              ref={uploadFile}
              type="file"
              onChange={(e) => {
                readExcel(e);
              }}
            />
          </Form.Group>
        </div>
        <div>
          {/* <Link to="/Excel/Exercise.xlsx" target="_blank" download> */}
          <a href="/Excel/Exercises.xlsx" download>
            {" "}
            <Button variant="outline-success" style={{ "margin-right": "5px" }}>
              Excel m???u
            </Button>
          </a>

          {/* </Link> */}
          <Button
            variant="outline-warning"
            onClick={() => {
              window.history.back();
            }}
          >
            Quay l???i
          </Button>
        </div>
      </div>
      {!importExcel ? (
        <div className="admin-subject-exercise-content-wrap">
          <div className="admin-subject-exercise-content-title">
            <span>
              {subject?.name} l???p {subject?.gradeID} - {unit?.unitName}
            </span>
            <br></br>
            <span>{lession?.lessionName}</span>
          </div>
          <div className="admin-subject-exercise-content-question-wrap">
            <span>Nh???p th??ng tin c???a c??u h???i m???i</span>
            <div className="admin-subject-exercise-content-question">
              <span>N???i dung c??u h???i</span>
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
              <span>????p ??n:</span>
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
                <Form.Group
                  controlId="formGridState"
                  style={{ width: "300px" }}
                >
                  <Form.Label>Th??? lo???i c??u h???i</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    value={cateExerID}
                    onChange={(e) => {
                      setCateExerID(e.target.value);
                    }}
                  >
                    <option>-- ch???n th??? lo???i --</option>;
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
                <span>G???i ??</span>
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
              <span>L???i gi???i:</span>
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
                L??u l???i
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  window.history.back();
                }}
              >
                H???y b???
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h5 style={{ color: "#198754" }}>C??c c??u h???i h???p l???</h5>

          <Table striped bordered hover className="valid-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>N???i dung</th>
                <th>L???a ch???n 1</th>
                <th>L???a ch???n 2</th>
                <th>L???a ch???n 3</th>
                <th>L???a ch???n 4</th>
                <th>????p ??n</th>
                <th>Th??? lo???i</th>
                <th>Ch???c n??ng</th>
              </tr>
            </thead>
            <tbody>
              {listQuestionInExcelValid.map((quesItem, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{quesItem.question}</td>
                      <td>{quesItem.option1}</td>
                      <td>{quesItem.option2}</td>
                      <td>{quesItem.option3}</td>
                      <td>{quesItem.option4}</td>
                      <td>
                        {quesItem.answer == "option1"
                          ? quesItem.option1
                          : quesItem.answer == "option2"
                          ? quesItem.option2
                          : quesItem.answer == "option3"
                          ? quesItem.option3
                          : quesItem.answer == "option4"
                          ? quesItem.option4
                          : null}
                      </td>
                      <td>
                        {categoryOfExercise.map((cateItem, index) => {
                          if (quesItem.catExeID == cateItem._id) {
                            return <>{cateItem.description}</>;
                          }
                        })}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            const newList = listQuestionInExcelValid;
                            newList.splice(index, 1);
                            setListQuestionInExcelValid([...newList]);
                          }}
                        >
                          X??a
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          <div className="btn-upload-excel">
            <Button
              style={{ marginRight: "5px" }}
              variant="secondary"
              onClick={() => {
                window.history.back();
              }}
            >
              H???y b???
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handleUploadQuestion();
              }}
            >
              T???i l??n
            </Button>
          </div>

          <h5 style={{ color: "#dc3545" }}>C??c c??u h???i ???? t???n t???i</h5>
          <Table striped bordered hover className="invalid-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>N???i dung</th>
                <th>L???a ch???n 1</th>
                <th>L???a ch???n 2</th>
                <th>L???a ch???n 3</th>
                <th>L???a ch???n 4</th>
                <th>????p ??n</th>
                <th>Th??? lo???i</th>
              </tr>
            </thead>
            <tbody>
              {listQuestionExist.map((quesItem, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{quesItem.question}</td>
                      <td>{quesItem.option1}</td>
                      <td>{quesItem.option2}</td>
                      <td>{quesItem.option3}</td>
                      <td>{quesItem.option4}</td>
                      <td>
                        {quesItem.answer == "option1"
                          ? quesItem.option1
                          : quesItem.answer == "option2"
                          ? quesItem.option2
                          : quesItem.answer == "option3"
                          ? quesItem.option3
                          : quesItem.answer == "option4"
                          ? quesItem.option4
                          : null}
                      </td>
                      <td>
                        {categoryOfExercise.map((cateItem, index) => {
                          if (quesItem.catExeID == cateItem._id) {
                            return <>{cateItem.description}</>;
                          }
                        })}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>

          <h5 style={{ color: "#dc3545" }}>
            C??c c??u h???i ch??a h???p l???
            <span style={{ fontSize: "16px" }}>
              {" "}
              (thi???u c??c th??nh ph???n c???u t???o n??n c??u h???i)
            </span>
          </h5>
          <Table striped bordered hover className="invalid-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>N???i dung</th>
                <th>L???a ch???n 1</th>
                <th>L???a ch???n 2</th>
                <th>L???a ch???n 3</th>
                <th>L???a ch???n 4</th>
                <th>????p ??n</th>
                <th>Th??? lo???i</th>
              </tr>
            </thead>
            <tbody>
              {listQuestionInExcelInvalid.map((quesItem, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{quesItem.question}</td>
                      <td>{quesItem.option1}</td>
                      <td>{quesItem.option2}</td>
                      <td>{quesItem.option3}</td>
                      <td>{quesItem.option4}</td>
                      <td>
                        {quesItem.answer == "option1"
                          ? quesItem.option1
                          : quesItem.answer == "option2"
                          ? quesItem.option2
                          : quesItem.answer == "option3"
                          ? quesItem.option3
                          : quesItem.answer == "option4"
                          ? quesItem.option4
                          : null}
                      </td>
                      <td>
                        {categoryOfExercise.map((cateItem, index) => {
                          if (quesItem.catExeID == cateItem._id) {
                            return <>{cateItem.description}</>;
                          }
                        })}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};
CreateExercise.layout = "adminLayout";
export default CreateExercise;
