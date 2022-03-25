import { Form, Row, Button, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const update = () => {
    return (
        <div className="update-subject-page">
            <div className="update-subject-page-header">
                <div className="update-subject-page-header-title"><span>Cập nhật môn học</span></div>
            </div>
            <div className="update-subject-page-content">
                <div className='update-subject-page-content-add-form'>
                    <Form>
                        <Row className="mb-3"   >
                            <Form.Group controlId="formGridEmail">
                                <Col>
                                    <Form.Label>Tên môn học</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="email" placeholder="Hóa học" />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" >
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Chức vụ</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Quản trị viên</option>
                                    <option>Giáo viên</option>
                                    <option>Học sinh</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Biểu tượng</Form.Label>
                                    <Form.Control placeholder="mark" />
                                </Form.Group>
                        </Row>

                    
                        <Button style={{"margin-right": "5px"}} variant="primary" type="submit">
                            Thêm mới
                        </Button>
                        <Button variant="primary" type="submit">
                            Hủy bỏ
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    ) 
}
update.layout = "adminLayout"
export default update