import { Form, Row, Button, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const create = () => {
    return(
        <div className="create-subject-page">
            <div className="create-subject-page-header">
                <div className="create-subject-page-header-title"><span>Thêm Môn Học Mới</span></div>
            </div>
            <div className="create-subject-page-content">
                <div className='create-subject-page-content-add-form'>
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
                                <Form.Label>Khối</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Khối 10</option>
                                    <option>Khối 11</option>
                                    <option>Khối 12</option>
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
create.layout = "adminLayout"
export default create