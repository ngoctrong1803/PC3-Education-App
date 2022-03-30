import {
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

const users = () => {
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
          <option value="1">Quản trị viên</option>
          <option value="2">Giáo viên</option>
          <option value="3">Học sinh</option>
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
            <tr>
              <th>#</th>
              <th>Họ và tên</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Trương Ngọc Trọng</td>
              <td>Quản trị viên</td>
              <td>ngoctrong1412@gmail.com</td>
              <td>035 848 9850</td>
              <td>18/03/200</td>
              <td>
                <Button variant="primary">Sửa</Button>
                <Button variant="primary">Xóa</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Trương Ngọc Trọng</td>
              <td>Quản trị viên</td>
              <td>ngoctrong1412@gmail.com</td>
              <td>035 848 9850</td>
              <td>18/03/200</td>
              <td>
                <Button variant="primary">Sửa</Button>
                <Button variant="primary">Xóa</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Trương Ngọc Trọng</td>
              <td>Quản trị viên</td>
              <td>ngoctrong1412@gmail.com</td>
              <td>035 848 9850</td>
              <td>18/03/200</td>
              <td>
                <Button variant="primary">Sửa</Button>
                <Button variant="primary">Xóa</Button>
              </td>
            </tr>
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
      </div>
    </div>
  );
};

users.layout = "adminLayout";
export default users;
