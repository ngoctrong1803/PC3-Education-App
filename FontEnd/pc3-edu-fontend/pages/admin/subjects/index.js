import { Button, Row, Col, Table, InputGroup, FormControl, Form,Pagination  } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/dist/client/link';
const subjects = () =>{
    return (
        <div className="admin-subjects-page">
        <div className="admin-subjects-title">
            <span>Danh sách các môn học</span>
        </div>
        <div className="admin-subjects-header">
        <InputGroup className="mb-3 admin-subjects-header-find " >
            <FormControl
            placeholder="Nhập tên môn học"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
            <Button variant="primary">Tìm kiếm</Button>
        </InputGroup>
        <Form.Select className='admin-subjects-header-role' aria-label="Default select example">
            <option>Tìm kiếm theo Khối</option>
            <option value="1">Khối 10</option>
            <option value="2">Khối 11</option>
            <option value="3">Khối 12</option>
        </Form.Select>
        <Link href="subjects/create">
            <Button className='admin-subjects-header-add-user' variant="outline-info">Thêm mới</Button>
        </Link>
        </div>
        <div className="admin-subjects-list">
            <Table bordered  className='admin-subjects-list-table'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Tên môn học</th>
                    <th>Khối</th>
                    <th>Biểu tượng</th>
                    <th>Đường dẫn</th>
                    <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Toán học</td>
                    <td>Khối 10</td>
                    <td>không có</td>
                    <td>Toan-khoi-10</td>
                    <td>
                        <Link href="subjects/content">
                            <Button className='admin-subjects-header-add-user' variant="primary">Nội dung</Button>
                        </Link>
                        <Link href="subjects/statistical">
                            <Button className='admin-subjects-header-add-user' variant="success">Thống kê</Button>
                        </Link>
                        
                        <Link href="subjects/update">
                            <Button className='admin-subjects-header-add-user' variant="warning">Sửa</Button>
                        </Link>
                        <Button className='admin-subjects-header-add-user' variant="danger">Xóa</Button>
                    </td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Vật Lý</td>
                    <td>Khối 10</td>
                    <td>không có</td>
                    <td>vat-ly-khoi-10</td>
                    <td>
                        <Button className='admin-subjects-header-add-user' variant="primary">Nội dung</Button>
                        <Button className='admin-subjects-header-add-user' variant="success">Thống kê</Button>
                        <Button className='admin-subjects-header-add-user' variant="warning">Sửa</Button>
                        <Button className='admin-subjects-header-add-user' variant="danger">Xóa</Button>
                    </td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>Hóa học</td>
                    <td>Khối 10</td>
                    <td>không có</td>
                    <td>hoa-hoc-khoi-10</td>
                    <td>
                        <Button className='admin-subjects-header-add-user' variant="primary">Nội dung</Button>
                        <Button className='admin-subjects-header-add-user' variant="success">Thống kê</Button>
                        <Button className='admin-subjects-header-add-user' variant="warning">Sửa</Button>
                        <Button className='admin-subjects-header-add-user' variant="danger">Xóa</Button>
                    </td>
                    </tr>
                </tbody>
            </Table>
            <div className='main-subjects-list-pagination'>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item >{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
            </div>
        </div>
    </div>
    )
}



subjects.layout = "adminLayout"
export default subjects