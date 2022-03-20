import { Row, Col, Accordion } from "react-bootstrap"
import Rank from "../../comps/Rank"
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
const Learning = () => {
    return (
        <>
             <Row>
                <Col xs={8} md={8}>
                    <div className="learning-detail-wrap">
                        <div className="learning-detail-title">
                            <h2>Khái niệm hàm số</h2>
                            <Link href={'/Exercises/bai-tap'}>
                                <button type="button" className="btn btn-primary">Bài tập vận dụng</button>
                            </Link>
                        </div>
                        <div className="learning-detail-content-wrap">
                            <div className="learning-detail-content">
                                <h5>nội dung bài học ở đây</h5>
                            </div>
                            <Link href={'/Exercises/bai-tap'}>
                                <button type="button" className="btn btn-primary">Bài tập vận dụng</button>
                            </Link>
                        </div>
                    </div>  
                </Col>
                <Col xs={4} md={4}>
                    <div className="learning-slidebar-right">
                        <div>
                        <h5>2 chương - 6 bài học</h5>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Chương 1: Sự đồng biến nghịch biển của hàm số</Accordion.Header>
                                        <Accordion.Body>
                                            <Link href={'/Learning/bai-1'}>
                                                <div className="lession-item">Bài 1: Khái niệm hàm số</div>
                                            </Link>
                                            <Link href={'/Learning/bai-2'}>
                                                <div className="lession-item">Bài 2: sự đồng biến nghịch biến</div>
                                            </Link>
                                            <Link href={'/Learning/bai-3'}>
                                                <div className="lession-item">Bài 3: đồ thị hàm số đồng biến</div>
                                            </Link>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Chương 2: Tích phân nguyên hàm</Accordion.Header>
                                        <Accordion.Body>
                                                <div className="lession-item">Bài 1: Khái niệm tích phân</div>
                                                <div className="lession-item">Bài 2: Ứng dụng của tích phân</div>
                                                <div className="lession-item">Bài 3: Khái niệm nguyên hàm và tích phân</div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>   
                        </div> 
                    </div>
                </Col>
            </Row>
        </>
    )

}
export default Learning