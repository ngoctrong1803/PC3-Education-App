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
  async function getListUser() {
    try {
      const res = await axios.get("http://localhost:8000/api/user/list-user");
      setListUser(res.data.listUser);
    } catch (err) {
      const errMsg = err.response.data.message;
      console.log("err: ", err.response.data.message);
    }
  }
  useEffect(() => {
    getListRole();
    getListUser();
  }, []);
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
    getListUser();
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
          />
          <Button variant="primary">Tìm kiếm</Button>
        </InputGroup>
        <Form.Select
          className="admin-users-header-role"
          aria-label="Default select example"
        >
          <option>-- Chức vụ --</option>
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
        <Button
          className="admin-users-header-list-role"
          variant="outline-warning"
        >
          Danh sách chức vụ
        </Button>
        <Button
          className="admin-users-header-export-excel"
          variant="outline-success"
        >
          Xuất excel
        </Button>
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
                      <Button variant="primary">Sửa</Button>
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
