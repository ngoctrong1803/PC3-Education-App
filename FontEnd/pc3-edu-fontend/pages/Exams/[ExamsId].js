import { Row, Col, Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const Exam = () => {
    return (
        <div className="detail-exam-page">
        <Row>
            <Col xs={8} ms={8} >
                <div className="exam-wrap">
                    <div className="exam-title"><h3>Đề Thi</h3></div>
                    <div className="exam-content">
                        {/* start question */}
                        <div className="exam-item-wrap">
                            {/* <div className="exam-item-type">Nhận biết</div> */}
                            <div className="exam-item-title mt-4"><h4>câu 1: như thế nào là hàm số nghịch biến </h4></div>
                            <div className="exam-item-content">
                                <Form className="answers-of-question">
                                    <Row>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="A. Câu trả lời thứ 1"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-1`}
                                            />
                                            </div>
                                        </Col>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="B. Câu trả lời thứ 2"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-2`}
                                            />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="C. câu trả lời thứ 3"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-3`}
                                            />
                                            </div>
                                        </Col>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="D. câu trả lời thứ 4"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-3`}
                                            />
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                        {/* end question */}
                          {/* start question */}
                          <div className="exam-item-wrap">
                            {/* <div className="exam-item-type">Nhận biết</div> */}
                            <div className="exam-item-title mt-4"><h4>câu 2: Nhận định nào sau đây đúng về hàm số </h4></div>
                            <div className="exam-item-content">
                                <Form className="answers-of-question">
                                    <Row>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="A. Câu trả lời thứ 1"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-1`}
                                            />
                                            </div>
                                        </Col>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="B. Câu trả lời thứ 2"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-2`}
                                            />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="C. câu trả lời thứ 3"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-3`}
                                            />
                                            </div>
                                        </Col>
                                        <Col xs={6} ms={6}>
                                            <div className="answer">
                                            <Form.Check
                                                inline
                                                label="D. câu trả lời thứ 4"
                                                name="group1"
                                                type='radio'
                                                id={`inline-radio-3`}
                                            />
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                        {/* end question */}
                    </div>
                </div>
            </Col>
            <Col xs={4} ms={4}>
                <div className="exam-slidebar-wrap">
                    <div className="slidebar-title"><h4>Đề thi THPT Toán Học 2019</h4></div>
                    <div className="slidebar-content">
                        <h5>Tổng số câu: 60 câu</h5>
                        <h5>Thời gian: 90 phút</h5>
                        <h5>Số câu đã làm: 35/60</h5>
                        <div className="slidebar-nav">
                            <div className="timer mt-4">
                                <div className="timer-title">
                                    <h4>Thời gian</h4>
                                </div>
                                <div className="timer-content">
                                <h4>45:26</h4>
                                </div>
                            </div>
                            <div className="button-nav mt-4">
                            <Button variant="info">Lưu bài <ion-icon name="save-outline"></ion-icon></Button>
                            <Button variant="success">Nộp bài <ion-icon name="enter-outline"></ion-icon></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        </div>
    ) 
}
Exam.layout = "userLayout";
export default Exam