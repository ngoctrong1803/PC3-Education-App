import { Row, Col, Form, Button, Table } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import Rank from '../../comps/Rank'
import Link from "next/dist/client/link";

const Match = () => {
    return (
        <div className="match-page">
            <Row>
                <Col xs={8} md={8}>
                <div className="match-page-nav">
                    <Form.Select className="select-grade-match" aria-label="Default select example">
                        <option value="1">Khối 12</option>
                        <option value="2">Khối 11</option>
                        <option value="3">Khối 10</option>
                    </Form.Select>
                    <Form.Select className="select-subject-match" aria-label="Default select example">
                        <option value="1">Toán Học</option>
                        <option value="2">Vật Lý</option>
                        <option value="3">Hóa Học</option>
                        <option value="4">Sinh Học</option>
                        <option value="5">Tiếng Anh</option>
                        <option value="6">Văn Học</option>

                    </Form.Select>
                    <Form.Select className="select-unit-match" aria-label="Default select example">
                        <option value="1">Chương 1: Đồng Biến Nghịch Biến</option>
                        <option value="2">Chương 2: Đạo Hàm Nguyên Hàm</option>
                    </Form.Select>
                    <Link href={'Matches/'+'ngoctrongroom'}>
                    <Button className="btn-create-room" variant="outline-primary">Tạo Phòng <ion-icon name="add-outline"></ion-icon></Button>
                    </Link>
                </div>
                <div className="match-page-list-match">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID Phòng</th>
                            <th>Chủ Phòng</th>
                            <th>Số Lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>toan-12-daoham</td>
                        <td>Ngoc Trong</td>
                        <td>9/10</td>
                        <td className="join-room-wrap"> <Button variant="outline-success">Tham gia</Button></td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Vat-ly-10-cohoc</td>
                        <td>Ngoc Trong</td>
                        <td>Full</td>
                        <td className="join-room-wrap"> <Button variant="outline-success">Tham gia</Button></td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>hoa-hoc-ion</td>
                        <td>Ngoc Trong</td>
                        <td>6/10</td>
                        <td className="join-room-wrap"> <Button variant="outline-success">Tham gia</Button></td>
                        </tr>
                    </tbody>
                </Table>

                </div>
                </Col>
                <Col xs={4} md={4} className="match-page-slidebar-wrap">
                <div className="match-page-slidebar">
                    <Rank></Rank>
                </div>
                </Col>
            </Row>
        </div>
    )
}
Match.layout = "userLayout";
export default Match