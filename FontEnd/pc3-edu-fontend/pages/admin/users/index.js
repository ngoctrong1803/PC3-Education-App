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
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../helper/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
import useTeacherAuth from "../../../hooks/authTeacherHook";

const Users = () => {
  const isTeacher = useTeacherAuth();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
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
      const res = await axiosJWT.get("/api/role/list");
      setListRole(res.data.listRole);
    } catch (err) {
      const errMsg = err.response.data.message;
    }
  }
  // handle filter and pagination
  const [contentToFind, setContentToFind] = useState("");
  const [roleToFind, setRoleToFind] = useState("all");
  const [totalPage, setTotalPage] = useState([]);
  async function getListUser(page) {
    try {
      const res = await axiosJWT.post("/api/user/list-user", {
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
    if (isTeacher) {
      getListRole();
    }
  }, []);
  useEffect(() => {
    if (isTeacher) {
      getListUser(1);
    }
  }, [contentToFind, roleToFind]);
  async function handleDeleteUser() {
    try {
      await axiosJWT.delete("/api/user/delete/" + userIDToDelete);
      toast.success("X??a ng?????i d??ng th??nh c??ng!");
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
        <span>Danh s??ch ng?????i d??ng</span>
      </div>
      <div className="admin-users-header">
        <InputGroup className="mb-3 admin-users-header-find ">
          <FormControl
            placeholder="Nh???p t??n ng?????i d??ng"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={contentToFind}
            onChange={(e) => {
              setContentToFind(e.target.value);
            }}
          />
          <Button variant="primary">T??m ki???m</Button>
        </InputGroup>
        <Form.Select
          className="admin-users-header-role"
          aria-label="Default select example"
          onChange={(e) => {
            setRoleToFind(e.target.value);
          }}
        >
          <option value="all">T???t c??? ch???c v???</option>
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
            Th??m m???i
          </Button>
        </Link>
      </div>
      <div className="admin-users-list">
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
              <th>STT</th>
              <th>H??? v?? t??n</th>
              <th>Ch???c v???</th>
              <th>Email</th>
              <th>S??? ??i???n tho???i</th>
              <th>Ng??y sinh</th>
              <th>L???p</th>
              <th>Ch???c n??ng</th>
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
                        <Button variant="primary">Chi ti???t</Button>
                      </Link>

                      <Button
                        variant="danger"
                        onClick={() => {
                          setUserIDToDelete(userItem._id);
                          handleShowComfirmDeleteUser();
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
            <Modal.Title style={{ color: "red" }}>X??a ng?????i d??ng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Khi x??a ng?????i d??ng to??n b??? d??? li???u li??n quan ?????n ng?????i d??ng
                  n??y s??? b??? x??a. B???n c?? ch???c ch???n mu???n x??a!
                </Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseComfirmDeleteUser}>
              H???y b???
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteUser();
              }}
            >
              ?????ng ??
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
