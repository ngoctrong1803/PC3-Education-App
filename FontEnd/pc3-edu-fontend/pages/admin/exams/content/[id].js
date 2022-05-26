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
      getQuestionOfExam(1);
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
    setListCatExe(res.data.listCateExer);
  }
  // handle filter anh paginnation
  const [contentToFind, setContentToFind] = useState("");
  const [cateQues, setCateQues] = useState("");
  const [totalPage, setTotalPage] = useState([]);
  async function getQuestionOfExam(page) {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/exam-question/list/" + examID,
        {
          contentToFind: contentToFind,
          page: page,
          cateQues: cateQues,
        }
      );

      setListQuestion(res.data.listExamQuestion);
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPage(listTotalPage);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    getCatExe();
    getQuestionOfExam(1);
  }, []);
  useEffect(() => {
    getQuestionOfExam(1);
  }, [contentToFind, cateQues]);
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
                value={contentToFind}
                onChange={(e) => {
                  setContentToFind(e.target.value);
                }}
              />
              <Button variant="primary">Tìm kiếm</Button>
            </InputGroup>
            <Form.Select
              className="admin-subjects-header-role"
              aria-label="Default select example"
              onChange={(e) => {
                setCateQues(e.target.value);
              }}
            >
              <option value={""}> Tất cả thể loại </option>
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
                <th style={{ maxWidth: "580px" }}>Nội dung</th>

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
                      <td style={{ maxWidth: "580px" }}>
                        <MathJax>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: questionItem?.question,
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
              <Pagination.Prev />
              {totalPage.map((item) => {
                return (
                  <>
                    <Pagination.Item
                      className="pagination_item"
                      onClick={(e) => {
                        getQuestionOfExam(item);
                        const listPagination =
                          document.querySelectorAll(".pagination_item");
                        const activeItem = (itemClick) => {
                          listPagination.forEach((item) => {
                            item.classList.remove("active");
                          });
                          itemClick.classList.add("active");
                        };
                        listPagination.forEach((item) => {
                          item.addEventListener("click", function () {
                            activeItem(item);
                          });
                        });
                      }}
                    >
                      {item}
                    </Pagination.Item>
                  </>
                );
              })}
              <Pagination.Next />
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
