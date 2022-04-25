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
import { MathJax, MathJaxContext } from "better-react-mathjax";
const Exams = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const examID = arrayTemp[position];

  const [questionID, setQuestionID] = useState();
  const [comfirmDeleteQues, setComfirmDeleteQues] = useState(false);
  const handleShowComfirmDeleteQues = () => {
    setComfirmDeleteQues(true);
  };
  const handleCloseComfirmDeleteQues = () => {
    setComfirmDeleteQues(false);
  };
  async function handleDeleteQuestion() {
    try {
      const res = await axios.delete(
        "http://localhost:8000/api/exam-question/delete/" + questionID
      );
      getQuestionOfExam();
      handleCloseComfirmDeleteQues();
      toast.success("xóa câu hỏi thành công");
    } catch (err) {
      const errMessage = err.response?.data.message;
      toast.error(errMessage);
    }
  }

  const [exaTypID, setExaTypID] = useState("");
  const [listCatExe, setListCatExe] = useState([]);
  const [listQuestion, setListQuestion] = useState([]);

  async function getCatExe() {
    const res = await axios.get(
      "http://localhost:8000/api/category-exercise/list"
    );
    console.log("listCatExe:", res.data.listCateExer);
    setListCatExe(res.data.listCateExer);
  }
  async function getQuestionOfExam() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/exam-question/list/" + examID
      );
      console.log("list question:", res);
      setListQuestion(res.data.listExamQuestion);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    getCatExe();
    getQuestionOfExam();
  }, []);
  const config = {
    loader: { load: ["input/asciimath"] },
  };
  return (
    <MathJaxContext config={config}>
      <div className="admin-subjects-page">
        <div className="admin-subjects-title">
          <span>Danh sách các câu hỏi </span>
        </div>
        <div className="admin-subjects-header">
          <div style={{ display: "flex" }}>
            <InputGroup className="mb-3 admin-subjects-header-find ">
              <FormControl
                placeholder="Nhập nội dung câu hỏi"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary">Tìm kiếm</Button>
            </InputGroup>
            <Form.Select
              className="admin-subjects-header-role"
              aria-label="Default select example"
            >
              <option> Thể loại câu hỏi </option>
              {listCatExe.map((item, index) => {
                return (
                  <>
                    <option value={item._id}>{item.description}</option>
                  </>
                );
              })}
            </Form.Select>
          </div>
          <div>
            <Link href={`/admin/exams/content/create/${examID}`}>
              <Button
                className="admin-subjects-header-add-user"
                variant="outline-info"
              >
                Thêm mới
              </Button>
            </Link>
            <Link href="/admin/exams">
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
                <th>Nội dung</th>
                <th>Đáp án</th>
                <th>Thể loại</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {listQuestion.map(function (questionItem, index) {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <MathJax>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: questionItem?.question,
                            }}
                          />
                        </MathJax>
                      </td>
                      <td>
                        {" "}
                        <MathJax>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: questionItem?.answer,
                            }}
                          />
                        </MathJax>
                      </td>
                      <td>
                        {listCatExe.map((catExeItem, index) => {
                          if (questionItem.catExeID == catExeItem._id)
                            return <>{catExeItem.description}</>;
                        })}
                      </td>

                      <td>
                        <Link
                          href={`/admin/exams/content/detail/${questionItem._id}`}
                        >
                          <Button
                            className="admin-subjects-header-add-user"
                            variant="primary"
                          >
                            Chi tiết
                          </Button>
                        </Link>

                        <Button
                          className="admin-subjects-header-add-user"
                          variant="danger"
                          onClick={() => {
                            handleShowComfirmDeleteQues();
                            setQuestionID(questionItem._id);
                          }}
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
        </div>
      </div>
      {/* start modal comfirm delete lesssion */}
      <Modal show={comfirmDeleteQues} onHide={handleCloseComfirmDeleteQues}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Xóa môn học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bạn có chắc chắn muốn xóa bài tập này</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button letiant="secondary" onClick={handleCloseComfirmDeleteQues}>
            Hủy bỏ
          </Button>
          <Button letiant="danger" onClick={handleDeleteQuestion}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal comfirm delete lesssion */}
    </MathJaxContext>
  );
};

Exams.layout = "adminLayout";
export default Exams;
