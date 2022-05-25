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
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const [listRole, setListRole] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [userIDToDelete, setUserIDToDelete] = useState("");
  const [comfirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const handleCloseComfirmDeleteUser = () => {
    setConfirmDeleteUser(false);
  };
  const handleShowComfirmDeleteUser = () => {
    setConfirmDeleteUser(true);
  };

  async function getListRole() {
    try {
      const res = await axios.get("http://localhost:8000/api/role/list");
      setListRole(res.data.listRole);
      console.log("list role:", res.data.listRole);
    } catch (err) {
      const errMsg = err.response.data.message;
      console.log("err: ", err.response.data.message);
    }
  }
  // handle filter and pagination
  const [contentToFind, setContentToFind] = useState("");
  const [roleToFind, setRoleToFind] = useState("all");
  const [totalPage, setTotalPage] = useState([]);
  async function getListUser(page) {
    try {
      const res = await axios.post("http://localhost:8000/api/user/list-user", {
        page: page,
        contentToFind,
        roleToFind,
      });
      const listTotalPage = [];
      for (let i = 0; i < res.data.totalPage; i++) {
        listTotalPage.push(i + 1);
      }
      setTotalPage(listTotalPage);
      setListUser(res.data.listUser);
    } catch (err) {
      const errMsg = err.response.data.message;
      console.log("err: ", err.response.data.message);
    }
  }
  useEffect(() => {
    getListRole();
  }, []);
  useEffect(() => {
    getListUser(1);
  }, [contentToFind, roleToFind]);
  async function handleDeleteUser() {
    try {
      await axios.delete(
        "http://localhost:8000/api/user/delete/" + userIDToDelete
      );
      toast.success("Xóa người dùng thành công!");
    } catch (err) {
      const errMessage = err.response.data.message;
      toast.error(errMessage);
    }
    handleCloseComfirmDeleteUser();
    getListUser(1);
  }
  return (
    <div className="admin-users-page">
      <div className="admin-users-title">
        <span>Danh sách người dùng</span>
      </div>
      <div className="admin-users-header">
        <InputGroup className="mb-3 admin-users-header-find ">
          <FormControl
            placeholder="Nhập tên người dùng"
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
          className="admin-users-header-role"
          aria-label="Default select example"
          onChange={(e) => {
            setRoleToFind(e.target.value);
          }}
        >
          <option value="all">Tất cả chức vụ</option>
          {listRole.map((roleItem, index) => {
            return (
              <>
                {" "}
                <option value={roleItem.roleName}>
                  {roleItem.description}
                </option>
              </>
            );
          })}
        </Form.Select>

        <Link href="users/create">
          <Button
            className="admin-users-header-add-user"
            variant="outline-info"
          >
            Thêm mới
          </Button>
        </Link>
      </div>
      <div className="admin-users-list">
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Lớp</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((userItem, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{userItem.fullname}</td>
                    <td>
                      {listRole.map((roleItem, index) => {
                        if (roleItem.roleName == userItem.role)
                          return <>{roleItem.description}</>;
                      })}
                    </td>
                    <td>{userItem.email}</td>
                    <td>{userItem.phone}</td>
                    <td>
                      {new Date(userItem.birthday).getDate() +
                        "/" +
                        (new Date(userItem.birthday).getMonth() + 1) +
                        "/" +
                        new Date(userItem.birthday).getFullYear()}
                    </td>
                    <td>{userItem.class}</td>
                    <td>
                      <Link href={`/admin/users/detail/${userItem._id}`}>
                        <Button variant="primary">Chi tiết</Button>
                      </Link>

                      <Button
                        variant="danger"
                        onClick={() => {
                          setUserIDToDelete(userItem._id);
                          handleShowComfirmDeleteUser();
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
        <div className="main-users-list-pagination">
          <Pagination>
            <Pagination.Prev />
            {totalPage.map((item) => {
              return (
                <>
                  <Pagination.Item
                    className="pagination_item"
                    onClick={(e) => {
                      getListUser(item);
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
        {/* start modal comfirm delete user */}
        <Modal show={comfirmDeleteUser} onHide={handleCloseComfirmDeleteUser}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Xóa người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Khi xóa người dùng toàn bộ dữ liệu liên quan đến người dùng
                  này sẽ bị xóa. Bạn có chắc chắn muốn xóa!
                </Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseComfirmDeleteUser}>
              Hủy bỏ
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteUser();
              }}
            >
              Đồng ý
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end modal comfirm delete user */}
      </div>
    </div>
  );
};

Users.layout = "adminLayout";
export default Users;
