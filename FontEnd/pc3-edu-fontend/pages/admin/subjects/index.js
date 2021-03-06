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
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../helper/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
import useTeacherAuth from "../../../hooks/authTeacherHook";
const Subjects = () => {
  const isTeacher = useTeacherAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const [listImage, setListImage] = useState([
    {
      name: "Toán Học",
      link: "/subject/MonToanf1.jpg",
    },
    {
      name: "Hóa Học",
      link: "/subject/MonHoaHocf1.jpg",
    },
    {
      name: "Tiếng Anh",
      link: "/subject/MonTiengAnhf1.jpg",
    },
    {
      name: "Sinh Học",
      link: "/subject/MonSinhHocf1.jpg",
    },
    {
      name: "Vật Lý",
      link: "/subject/MonVatLyf1.jpg",
    },
  ]);
  const [listSubject, setListSubject] = useState([]);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showUpdateSubject, setShowUpdateSubject] = useState(false);
  const [subjectID, setSubjectID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectImage, setSubjectImage] = useState("");
  const [gradeID, setGradeID] = useState("");
  const [listGrade, setListGrade] = useState([]);
  function handleCloseAddSubject() {
    setShowAddSubject(false);
  }
  function handleShowAddSubject() {
    setShowAddSubject(true);
  }
  function handleCloseUpdateSubject() {
    setShowUpdateSubject(false);
  }
  function handleShowUpdateSubject(subjectID, subjectName, gradeID) {
    setSubjectID(subjectID);
    setSubjectName(subjectName);
    setGradeID(gradeID);
    setShowUpdateSubject(true);
  }
  // handle filter and pagination
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGradeShow, setCurrentGradeShow] = useState(0);
  const [currentSubjectName, setCurrentSubjectName] = useState("");

  async function getSubject(page) {
    try {
      const res = await axiosJWT.post(
        "/api/subjects/get-list-subject/" + page,
        {
          subject_name: currentSubjectName,
          grade: currentGradeShow,
        }
      );
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      console.log("total page", listTotalPage.length);
      setTotalPage(listTotalPage);
      setListSubject(res.data.listSubject);
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
  }

  async function getGrade() {
    const res = await axiosJWT.get("/api/grade/list");
    setListGrade(res.data.listGrade);
  }

  async function handleAddSubject(e) {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    const gradeIDOfSubject = parseInt(gradeID);
    const newSubject = {
      name: subjectName,
      gradeID: gradeIDOfSubject,
      image: subjectImage,
    };
    if (subjectName == "") {
      toast.error("vui lòng nhập tên môn học");
    } else if (gradeID == "") {
      toast.error("vui lòng chọn khối");
    } else if (subjectImage == "none" || subjectImage == "") {
      toast.error("vui lòng chọn hình ảnh cho môn học");
    } else {
      try {
        const res = await axiosJWT.post("/api/subjects/create", newSubject);
        console.log("newSubject:", newSubject);
        toast.success("thêm mới môn học thành công");
        handleCloseAddSubject();
        getSubject(1);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }
  async function handleUpdateSubject(e) {
    e.preventDefault(); // ngăn chặn hành động mặc định
    e.stopPropagation(); // ngăn chặn lang rộng
    const gradeIDOfSubject = parseInt(gradeID);
    const updateSubject = {
      name: subjectName,
      gradeID: gradeIDOfSubject,
      image: subjectImage,
    };
    if (subjectName == "") {
      toast.error("vui lòng nhập tên môn học");
    } else if (gradeID == "") {
      toast.error("vui lòng chọn khối");
    } else if (subjectImage == "none" || subjectImage == "") {
      toast.error("vui lòng chọn hình ảnh cho môn học");
    } else {
      try {
        const res = await axiosJWT.put(
          "/api/subjects/update/" + subjectID,
          updateSubject
        );
        toast.success("Cật nhật môn học thành công");
        handleCloseUpdateSubject();
        getSubject(1);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
  }

  useEffect(() => {
    if (isTeacher) {
      getSubject(1);
      getGrade();
    }
  }, []);

  useEffect(() => {
    if (isTeacher) {
      getSubject(1);
    }
  }, [currentGradeShow, currentSubjectName]);

  //handle delete subject
  const [subjectIDToDelete, setSubjectIDToDelete] = useState("");
  const [showComfirmDeleteSubject, setShowConfirmDeleteSubject] =
    useState(false);
  const handleShowComfirmDeleteSubject = () => {
    setShowConfirmDeleteSubject(true);
  };
  const handleCloseComfirmDeleteSubject = () => {
    setShowConfirmDeleteSubject(false);
  };
  async function handleDeleteSubject() {
    try {
      const res = await axiosJWT.delete(
        "/api/subjects/delete/" + subjectIDToDelete
      );
      toast.success("Xóa môn học thành công");
      handleCloseComfirmDeleteSubject();
      getSubject();
    } catch (error) {
      toast.error("Xóa thất bại, đã xảy ra ngoại lệ");
    }
  }
  if (!isTeacher) {
    return null;
  }

  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh sách các môn học</span>
      </div>
      <div className="admin-subjects-header">
        <div style={{ display: "flex" }}>
          <InputGroup className="mb-3 admin-subjects-header-find ">
            <FormControl
              placeholder="Nhập tên môn học"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={currentSubjectName}
              onChange={(e) => {
                setCurrentSubjectName(e.target.value);
              }}
            />
            <Button variant="primary">Tìm kiếm</Button>
          </InputGroup>
          <Form.Select
            className="admin-subjects-header-role"
            aria-label="Default select example"
            onChange={(e) => {
              setCurrentGradeShow(e.target.value);
            }}
          >
            <option value="0">Tất cả các khối</option>
            <option value="10">Khối 10</option>
            <option value="11">Khối 11</option>
            <option value="12">Khối 12</option>
          </Form.Select>
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
            onClick={handleShowAddSubject}
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
              <th>Tên môn học</th>
              <th>Khối</th>
              <th>Đường dẫn</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listSubject.map(function (item, index) {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>Khối {item.gradeID}</td>
                    <td>{item.slug}</td>
                    <td>
                      <Link href={`subjects/content/${item.slug}`}>
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="primary"
                        >
                          Nội dung
                        </Button>
                      </Link>
                      <Link href={`subjects/statistical/${item._id}`}>
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="success"
                        >
                          Thống kê
                        </Button>
                      </Link>

                      <Button
                        className="admin-subjects-header-add-user"
                        variant="warning"
                        onClick={() => {
                          handleShowUpdateSubject(
                            item._id,
                            item.name,
                            item.gradeID
                          );
                          setSubjectImage(item.image);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        className="admin-subjects-header-add-user"
                        variant="danger"
                        onClick={() => {
                          setSubjectIDToDelete(item._id);
                          handleShowComfirmDeleteSubject();
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
                      getSubject(item);
                      setCurrentPage(item);
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
        {/* start modal add subject */}
        <Modal show={showAddSubject} onHide={handleCloseAddSubject}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm môn học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên môn học</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Toán học"
                  autoFocus
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                  }}
                />
                <Form.Label>Khối</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setGradeID(e.target.value);
                  }}
                >
                  <option value={""}>-- chọn khối --</option>
                  {listGrade.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.gradeName}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSubjectImage(e.target.value);
                  }}
                  value={subjectImage}
                >
                  <option value="none">-- Hình ảnh --</option>
                  {listImage.map(function (item, i) {
                    return (
                      <>
                        <option value={item.link} key={i}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddSubject}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleAddSubject}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal add subject */}
        {/* start modal update subject */}
        <Modal show={showUpdateSubject} onHide={handleCloseUpdateSubject}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật môn học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên môn học</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Toán học"
                  autoFocus
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                  }}
                />
                <Form.Label>Khối</Form.Label>
                <Form.Select
                  value={gradeID}
                  onChange={(e) => {
                    setGradeID(e.target.value);
                  }}
                >
                  <option value={""}>-- chọn khối --</option>
                  {listGrade.map(function (item, i) {
                    return (
                      <option value={item._id} key={i}>
                        {item.gradeName}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSubjectImage(e.target.value);
                  }}
                  value={subjectImage}
                >
                  <option value="none">-- Hình ảnh --</option>
                  {listImage.map(function (item, i) {
                    return (
                      <>
                        <option value={item.link} key={i}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateSubject}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleUpdateSubject}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal update subject */}
        {/* start modal comfirm delete subject */}
        <Modal
          show={showComfirmDeleteSubject}
          onHide={handleCloseComfirmDeleteSubject}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Xóa môn học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Khi xóa môn học toàn bộ dữ liệu liên quan đến môn học sẽ bị
                  xóa. Bạn có chắc chắn muốn xóa môn học này.
                </Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseComfirmDeleteSubject}
            >
              Hủy bỏ
            </Button>
            <Button variant="danger" onClick={handleDeleteSubject}>
              Đồng ý
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal comfirm delete subject */}
      </div>
    </div>
  );
};

Subjects.layout = "adminLayout";
export default Subjects;
