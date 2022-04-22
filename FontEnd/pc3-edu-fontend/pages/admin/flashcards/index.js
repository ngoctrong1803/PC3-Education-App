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
const Topic = () => {
  const [listTopic, setListTopic] = useState([]);

  const [showAddTopic, setShowAddTopic] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  function handleCloseAddTopic() {
    setShowAddTopic(false);
  }
  function handleShowAddTopic() {
    setShowAddTopic(true);
  }
  async function handleAddTopic() {
    const newTopic = {
      topicName,
      description,
      image,
    };
    if (topicName == "" || description == "" || image == "") {
      toast.error("thông tin chưa đầy đủ để tạo chủ đề");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/topic/create",
          newTopic
        );
        toast.success("thêm mới chủ đề thành công");
        handleCloseAddTopic();
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  async function getTopic() {
    try {
      const res = await axios.get("http://localhost:8000/api/topic/list");
      console.log("res", res.data.listTopic);
      setListTopic(res.data.listTopic);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    getTopic();
  }, []);
  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh sách các chủ đề của flashcard</span>
      </div>
      <div className="admin-subjects-header">
        <div style={{ display: "flex" }}>
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="Nhập tên têm chủ đề"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="primary">Tìm kiếm</Button>
          </InputGroup>

          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
            onClick={handleShowAddTopic}
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
              <th>Tên chủ đề</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listTopic.map(function (item, index) {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.topicName}</td>
                    <td>{item.description}</td>
                    <td>
                      <img
                        style={{
                          height: "120px",
                          width: "100px",
                          "border-radius": "10px",
                        }}
                        src={`${item.image}`}
                      ></img>
                    </td>
                    <td>
                      <Link href={`/admin/flashcards/topic/${item._id}`}>
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="primary"
                        >
                          Chi tiết
                        </Button>
                      </Link>
                      <Button
                        className="admin-subjects-header-add-user"
                        variant="success"
                      >
                        Chia sẻ
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
        {/* start modal add Topic */}
        <Modal show={showAddTopic} onHide={handleCloseAddTopic}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm chủ đề mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên chủ đề</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Home"
                  autoFocus
                  value={topicName}
                  onChange={(e) => {
                    setTopicName(e.target.value);
                  }}
                />
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="This is topic will help you know many new world..."
                  autoFocus
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Form.Label>Link hình ảnh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://google/driver/your-image.png"
                  autoFocus
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddTopic}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleAddTopic}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal add Topic */}
      </div>
    </div>
  );
};

Topic.layout = "adminLayout";
export default Topic;
