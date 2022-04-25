import {
  Modal,
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Flashcard = () => {
  const url = window.location.pathname;
  const arrayTemp = url.split("/");
  const position = arrayTemp.length - 1;
  const topicID = arrayTemp[position];

  const [listFlashcard, setListFlashcard] = useState([]);
  const [topic, setTopic] = useState({});
  const [listUser, setListUser] = useState([]);
  const curentAdmin = useSelector((state) => state.auth.login.currentUser);

  const [showAddFlashcard, setShowAddFlashcard] = useState(false);
  const [showUpdateFlashcard, setShowUpdateFlashcard] = useState(false);
  const [showConfirmDeleteFlashcard, setShowConfirmDeleteFlashcard] =
    useState(false);

  const [flashcardID, setFlashcardID] = useState("");
  const [meaningInEnglish, setMeaningInEnglish] = useState("");
  const [meaningInVietnamese, setMeaningInVietnamese] = useState("");
  const [explain, setExplain] = useState("");
  const [example, setExample] = useState("");

  function handleCloseAddFlashcard() {
    setShowAddFlashcard(false);
  }
  function handleShowAddFlashcard() {
    setShowAddFlashcard(true);
  }
  function handleCloseUpdateFlashcard() {
    setShowUpdateFlashcard(false);
  }
  function handleShowUpdateFlashcard(
    flashcardID,
    meaningInVietnamese,
    meaningInEnglish,
    example,
    explain
  ) {
    setShowUpdateFlashcard(true);
    setFlashcardID(flashcardID);
    setMeaningInVietnamese(meaningInVietnamese);
    setMeaningInEnglish(meaningInEnglish);
    setExample(example);
    setExplain(explain);
  }
  function handleCloseConfirmDeleteFlashcard() {
    setShowConfirmDeleteFlashcard(false);
  }
  function handleShowConfirmDeleteFlashcard(flashcardID) {
    setShowConfirmDeleteFlashcard(true);
    setFlashcardID(flashcardID);
  }

  async function getFlashcard() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/flashcard/list/" + topicID
      );
      setListFlashcard(res.data.listFlashcard);
      console.log("list flash card:", res.data.listFlashcard);
      setTopic(res.data.topic);
      setListUser(res.data.users);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  async function handleAddFlashcard() {
    const newFlashcard = {
      meaningInVietnamese,
      meaningInEnglish,
      explain,
      example,
      star: false,
      forgetfulness: false,
      shared: false,
      topicID: topicID,
      userID: curentAdmin.userInfor._id,
    };
    if (meaningInVietnamese == "" || meaningInEnglish == "") {
      toast.error("thông tin chưa đầy đủ để tạo Flashcard");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/flashcard/create",
          newFlashcard
        );
        toast.success("thêm mới flashcard thành công");
        handleCloseAddFlashcard();
        getFlashcard();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleUpdateFlashcard() {
    const updateFlashcard = {
      meaningInVietnamese,
      meaningInEnglish,
      explain,
      example,
      userID: curentAdmin.userInfor._id,
    };
    if (meaningInVietnamese == "" || meaningInEnglish == "") {
      toast.error("vui lòng nhập đầy đủ thông tin Flashcard");
    } else {
      try {
        const res = await axios.put(
          "http://localhost:8000/api/flashcard/update/" + flashcardID,
          updateFlashcard
        );
        toast.success("cập nhật flashcard thành công");
        handleCloseUpdateFlashcard();
        getFlashcard();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleDeleteFlashcard() {
    try {
      const res = await axios.delete(
        "http://localhost:8000/api/flashcard/delete/" + flashcardID
      );
      toast.success("đã xóa flashcard");
      handleCloseConfirmDeleteFlashcard();
      getFlashcard();
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    getFlashcard();
  }, []);
  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh sách các flashcard của chủ đề {topic.topicName}</span>
      </div>
      <div className="admin-subjects-header">
        <div style={{ display: "flex" }}>
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="Nhập nghĩa tiếng anh"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="primary">Tìm kiếm</Button>
          </InputGroup>
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-success"
          >
            Excel
          </Button>
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
            onClick={handleShowAddFlashcard}
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
              <th>Tác giả</th>
              <th>Nghĩa anh</th>
              <th>Nghĩa tiếng việt</th>
              <th>Ví dụ</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listFlashcard.map(function (item, index) {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {listUser.map((userItem) => {
                        if (userItem._id == item.userID) {
                          return userItem.fullname;
                        }
                      })}
                    </td>
                    <td>{item.meaningInEnglish}</td>
                    <td>{item.meaningInVietnamese}</td>
                    <td>{item.example}</td>
                    <td>
                      <Button
                        className="admin-subjects-header-add-user"
                        variant="primary"
                        onClick={() => {
                          handleShowUpdateFlashcard(
                            item._id,
                            item.meaningInVietnamese,
                            item.meaningInEnglish,
                            item.example,
                            item.explain
                          );
                        }}
                      >
                        Chi tiết
                      </Button>

                      <Button
                        className="admin-subjects-header-add-user"
                        variant="danger"
                        onClick={() => {
                          handleShowConfirmDeleteFlashcard(item._id);
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
        {/* start modal add flash card */}
        <Modal show={showAddFlashcard} onHide={handleCloseAddFlashcard}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm Flashcard mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nghĩa tiếng việt</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="con cá"
                  autoFocus
                  value={meaningInVietnamese}
                  onChange={(e) => {
                    setMeaningInVietnamese(e.target.value);
                  }}
                />
                <Form.Label>Nghĩa tiếng anh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="fish"
                  autoFocus
                  value={meaningInEnglish}
                  onChange={(e) => {
                    setMeaningInEnglish(e.target.value);
                  }}
                />
                <Form.Label>Giải thích</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="the fish is in the river"
                  autoFocus
                  value={explain}
                  onChange={(e) => {
                    setExplain(e.target.value);
                  }}
                />
                <Form.Label>Ví dụ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="I'm eating fish"
                  autoFocus
                  value={example}
                  onChange={(e) => {
                    setExample(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddFlashcard}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleAddFlashcard}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal add flash card */}
        {/* start modal update flash card */}
        <Modal show={showUpdateFlashcard} onHide={handleCloseUpdateFlashcard}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật Flashcard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nghĩa tiếng việt</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="con cá"
                  autoFocus
                  value={meaningInVietnamese}
                  onChange={(e) => {
                    setMeaningInVietnamese(e.target.value);
                  }}
                />
                <Form.Label>Nghĩa tiếng anh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="fish"
                  autoFocus
                  value={meaningInEnglish}
                  onChange={(e) => {
                    setMeaningInEnglish(e.target.value);
                  }}
                />
                <Form.Label>Giải thích</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="the fish is in the river"
                  autoFocus
                  value={explain}
                  onChange={(e) => {
                    setExplain(e.target.value);
                  }}
                />
                <Form.Label>Ví dụ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="I'm eating fish"
                  autoFocus
                  value={example}
                  onChange={(e) => {
                    setExample(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateFlashcard}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleUpdateFlashcard}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal update flash card */}
        {/* start modal delete flash card */}
        <Modal
          show={showConfirmDeleteFlashcard}
          onHide={handleCloseConfirmDeleteFlashcard}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>
              Xác nhận xóa Flashcard
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Bạn có chắc chắn muốn xóa flashcard</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseConfirmDeleteFlashcard}
            >
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleDeleteFlashcard}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal delete flash card */}
      </div>
    </div>
  );
};

Flashcard.layout = "adminLayout";
export default Flashcard;
