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
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../helper/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
import useTeacherAuth from "../../../hooks/authTeacherHook";
const Topic = () => {
  const isTeacher = useTeacherAuth();
  const [listTopic, setListTopic] = useState([]);

  const [showAddTopic, setShowAddTopic] = useState(false);
  const [showUpdateTopic, setShowUpdateTopic] = useState(false);
  const [showDeleteTopic, setShowDeleteTopic] = useState(false);
  const [topicID, setTopicID] = useState("");
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  function handleCloseAddTopic() {
    setShowAddTopic(false);
  }
  function handleShowAddTopic() {
    setShowAddTopic(true);
  }

  function handleCloseUpdateTopic() {
    setShowUpdateTopic(false);
  }
  function handleShowUpdateTopic() {
    setShowUpdateTopic(true);
  }

  function handleCloseDeleteTopic() {
    setShowDeleteTopic(false);
  }
  function handleShowDeleteTopic() {
    setShowDeleteTopic(true);
  }

  // handle
  const [isUpload, setIsUpload] = useState(false);
  const [imageSelected, setImageSelected] = useState();
  const instance = axios.create();
  async function handleAddTopic() {
    let topicImageCloud = "";
    try {
      const formData = new FormData();
      formData.append("file", imageSelected[0]);
      formData.append("upload_preset", "pc3_image");
      setIsUpload(true);
      const res = await instance.post(
        "https://api.cloudinary.com/v1_1/dwjhsgpt7/image/upload",
        formData
      );
      // url from clouldinary
      topicImageCloud = res.data.url;
      setIsUpload(false);
    } catch (error) {
      toast.error("L???i t???i file! Th??m m???i ch??? ????? th???t b???i");
      setIsUpload(false);
      return;
    }

    const newTopic = {
      topicName,
      description,
      image: topicImageCloud,
    };
    if (
      newTopic.topicName == "" ||
      newTopic.description == "" ||
      newTopic.image == ""
    ) {
      toast.error("th??ng tin ch??a ?????y ????? ????? t???o ch??? ?????");
    } else {
      try {
        const res = await axiosJWT.post("/api/topic/create", newTopic);
        toast.success("th??m m???i ch??? ????? th??nh c??ng");
        handleCloseAddTopic();
        getTopic(1);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  async function handleUpdateTopic() {
    try {
      if (topicID) {
        const res = await axiosJWT.put("/api/topic/update/" + topicID, {
          topicName: topicName,
          description: description,
          image: image,
        });
        toast.success("C???p nh???t th??nh c??ng");
        getTopic(1);
        handleCloseUpdateTopic();
      } else {
        toast.error("kh??ng t???n t???i topic");
      }
    } catch (error) {}
  }
  async function handleDeleteTopic() {
    try {
      if (topicID) {
        const res = await axiosJWT.delete("/api/topic/delete/" + topicID);
        toast.success("X??a ch??? ????? th??nh c??ng th??nh c??ng");
        getTopic(1);
        handleCloseDeleteTopic();
      } else {
        toast.error("kh??ng t???n t???i topic");
      }
    } catch (error) {}
  }
  //handle filter and pagination
  const [totalPage, setTotalPage] = useState([]);
  const [nameToFind, setNameToFind] = useState("");

  async function getTopic(page) {
    try {
      const res = await axiosJWT.post("/api/topic/list/" + page, {
        topicName: nameToFind,
      });
      console.log("res", res.data.listTopic);
      setListTopic(res.data.listTopic);
      const listTotalTopic = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalTopic.push(i + 1);
      }
      setTotalPage(listTotalTopic);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    if (isTeacher) {
      getTopic(1);
    }
  }, [nameToFind]);
  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh s??ch c??c ch??? ????? c???a flashcard</span>
      </div>
      <div className="admin-subjects-header">
        <div style={{ display: "flex" }}>
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="Nh???p t??n t??m ch??? ?????"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={nameToFind}
              onChange={(e) => {
                setNameToFind(e.target.value);
              }}
            />
            <Button variant="primary">T??m ki???m</Button>
          </InputGroup>

          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
            onClick={handleShowAddTopic}
          >
            Th??m m???i
          </Button>
        </div>
        <Link href="/admin">
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-warning"
            onClick={() => {
              window.history.back();
            }}
          >
            Quay l???i
          </Button>
        </Link>
      </div>
      <div className="admin-subjects-list">
        <Table bordered className="admin-subjects-list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>T??n ch??? ?????</th>
              <th>M?? t???</th>
              <th>H??nh ???nh</th>
              <th>Ch???c n??ng</th>
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
                          objectFit: "cover",
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
                          Chi ti???t
                        </Button>
                      </Link>
                      <Button
                        className="admin-subjects-header-add-user"
                        variant="warning"
                        onClick={() => {
                          setTopicID(item._id);
                          setTopicName(item.topicName);
                          setDescription(item.description);
                          setImage(item.image);
                          handleShowUpdateTopic();
                        }}
                      >
                        S???a
                      </Button>
                      <Button
                        className="admin-subjects-header-add-user"
                        variant="danger"
                        onClick={() => {
                          setTopicID(item._id);
                          handleShowDeleteTopic();
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
        <div className="main-subjects-list-pagination">
          <Pagination>
            <Pagination.Prev />
            {totalPage.map((item) => {
              return (
                <>
                  <Pagination.Item
                    className="pagination_item"
                    onClick={() => {
                      getTopic(item);
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
        {/* start modal add Topic */}
        <Modal show={showAddTopic} onHide={handleCloseAddTopic}>
          <Modal.Header closeButton>
            <Modal.Title>Th??m ch??? ????? m???i</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>T??n ch??? ?????</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Home"
                  autoFocus
                  value={topicName}
                  onChange={(e) => {
                    setTopicName(e.target.value);
                  }}
                />
                <Form.Label>M?? t???</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="This is topic will help you know many new world..."
                  autoFocus
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Form.Label>H??nh ???nh</Form.Label>{" "}
                {isUpload ? (
                  <span style={{ color: "#0d6efd" }}>
                    <Spinner animation="border" size="sm" variant="primary" />{" "}
                    Loading...
                  </span>
                ) : null}
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="file"
                    style={{
                      fontSize: "15px",
                      backgroundColor: "rgba(39, 228, 245, 0.023)",
                    }}
                    onChange={(e) => {
                      setImageSelected(e.target.files);
                    }}
                  />
                </Form.Group>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddTopic}>
              H???y b???
            </Button>
            <Button variant="primary" onClick={handleAddTopic}>
              L??u l???i
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal add Topic */}
        {/* start modal update Topic */}
        <Modal show={showUpdateTopic} onHide={handleCloseUpdateTopic}>
          <Modal.Header closeButton>
            <Modal.Title>Th??m ch??? ????? m???i</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>T??n ch??? ?????</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Home"
                  autoFocus
                  value={topicName}
                  onChange={(e) => {
                    setTopicName(e.target.value);
                  }}
                />
                <Form.Label>M?? t???</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="This is topic will help you know many new world..."
                  autoFocus
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Form.Label>Link h??nh ???nh</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder=""
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
            <Button variant="secondary" onClick={handleCloseUpdateTopic}>
              H???y b???
            </Button>
            <Button variant="primary" onClick={handleUpdateTopic}>
              C???t nh???t
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal update Topic */}
        {/* start modal delte Topic */}
        <Modal show={showDeleteTopic} onHide={handleCloseDeleteTopic}>
          <Modal.Header closeButton>
            <Modal.Title>X??a ch??? ?????</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Khi x??a ch??? ????? s??? x??a to??n b??? flashcards trong ch??? ????? n??y b???n c??
            ch???c ch???n kh??ng
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteTopic}>
              H???y b???
            </Button>
            <Button variant="danger" onClick={handleDeleteTopic}>
              X??a
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal delte Topic */}
      </div>
    </div>
  );
};

Topic.layout = "adminLayout";
export default Topic;
