import { useRouter } from "next/router"
import { Col, Container, Row, Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Rank from "../../comps/Rank";
import Link from "next/link"

const Detail = () => {
    const router = useRouter();
    const subjectId = router.query.subjectId
    return (
        <>
            <Row>
                <Col xs={9} md={9}>
                    <div className="subject-detail-wrap">
                        <div className="subject-detail-title">
                            <h1>Toán Học Lớp 10</h1>
                            <span>Toán lớp 10 có khó không?</span>
                        </div>
                        <div className="subject-detail-content">
                            <h5>Nội dung môn học</h5>
                            <div className="mt-4">
                                <span>5 Chương</span>
                                <span>-</span>
                                <span>36 Bài Học</span>
                            </div>
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
                <Col xs={3} md={3}>
                    <div className="subject-slidebar-right">
                        <h3 className="mt-4">Miễn phí</h3>
                        <div className="description-item">
                                <ion-icon name="school-outline"></ion-icon>
                                Tổng: 5 Chương - 72 bài học
                        </div>
                        <div className="btn btn-primary mt-4">
                            Ôn tập miễn phí
                        </div>
                        <div className="mt-4">
                            <Rank></Rank>
                        </div> 
                    </div>
                </Col>
            </Row>
        
        </>
    )
}
Detail.layout = "userLayout";
export default Detail