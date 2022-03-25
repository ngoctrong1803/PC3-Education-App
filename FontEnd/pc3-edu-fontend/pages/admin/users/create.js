import { Form, Row, Button, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const create = () =>{
    return (
        <div className="create-user-page">
            <div className="create-user-page-header">
                <div className="create-user-page-header-title"><span>Thêm mới người dùng</span></div>
                <div className="create-user-page-header-button"> <Button variant="outline-success">Excel mẫu</Button></div>
            </div>
            <div className="create-user-page-content">
                <div className="create-user-page-content-add-file">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Thêm file Excel</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </div>
                <div className='create-user-page-content-add-form'>
                    <Form>
                        <Row className="mb-3" xs={2} md={2} lg={2}>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" xs={2} md={2} lg={2}>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Chức vụ</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Quản trị viên</option>
                                    <option>Giáo viên</option>
                                    <option>Học sinh</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Nhập lại mật khẩu</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" xs={2} md={2} lg={2}>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control placeholder="191 Hoàng diệu 2" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control placeholder="18/03/2000" />
                                </Form.Group>
                        </Row>
                        <Row className="mb-3" xs={2} md={2} lg={2} >
                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control placeholder="0358489850" />
                                </Form.Group>
                        </Row>

                      
                        <Button variant="primary" type="submit">
                            Thêm mới
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    ) 
}

create.layout = "adminLayout"
export default create
