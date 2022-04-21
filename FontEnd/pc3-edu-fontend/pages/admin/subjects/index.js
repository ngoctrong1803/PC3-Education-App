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
import { useEffect, useState } from "react";
import axios from "axios";
const Subjects = () => {
  const [listSubject, setListSubject] = useState([]);
  useEffect(() => {
    async function getSubject() {
      try {
        console.log("lấy api thành công");
        const res = await axios.get(
          "http://localhost:8000/api/subjects/get-list-subject"
        );
        console.log("list subject: ", res.data.listSubject);
        setListSubject(res.data.listSubject);
      } catch (err) {
        const errMessage = err.response.data.message;
        toast.error(errMessage);
      }
    }
    getSubject();
  }, []);
  return (
    <div className="admin-subjects-page">
      <div className="admin-subjects-title">
        <span>Danh sách các môn học</span>
      </div>
      <div className="admin-subjects-header">
        <InputGroup className="mb-3 admin-subjects-header-find ">
          <FormControl
            placeholder="Nhập tên môn học"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary">Tìm kiếm</Button>
        </InputGroup>
        <Form.Select
          className="admin-subjects-header-role"
          aria-label="Default select example"
        >
          <option>Tìm kiếm theo Khối</option>
          <option value="1">Khối 10</option>
          <option value="2">Khối 11</option>
          <option value="3">Khối 12</option>
        </Form.Select>
        <Link href="subjects/create">
          <Button
            className="admin-subjects-header-add-user"
            variant="outline-info"
          >
            Thêm mới
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
                      <Link href="subjects/statistical">
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="success"
                        >
                          Thống kê
                        </Button>
                      </Link>

                      <Link href="subjects/update">
                        <Button
                          className="admin-subjects-header-add-user"
                          variant="warning"
                        >
                          Sửa
                        </Button>
                      </Link>
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
      </div>
    </div>
  );
};

Subjects.layout = "adminLayout";
export default Subjects;
