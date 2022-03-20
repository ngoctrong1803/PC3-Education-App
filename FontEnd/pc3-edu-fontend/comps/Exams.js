import { Pagination, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const Exams = () => {
    return (
        <div className="list-exams-wrap">
            <div className="list-exams-title">
                <span>
                    Tổng hợp đề thi THPT Toán
                </span>
            </div>
            <div className="list-exams-content">
                <Row className="list-exams-content-row">
                    <Col sm= {6} md={4} lg={3}>  <div className="exams-item">
                            <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                            </div>
                            <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                        </div></Col>
                    <Col sm= {6} md={4} lg={3}>  <div className="exams-item">
                            <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                            </div>
                            <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                        </div></Col>
                    <Col  md={4} lg={3}>  <div className="exams-item">
                            <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                            </div>
                            <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                        </div>
                    </Col>
                    <Col md={4} lg={3}>  
                            <div className="exams-item">
                                <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                                </div>
                                <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                            </div>
                    </Col>
                </Row>
                <Row className="list-exams-content-row">
                <Col sm= {0} md={0} lg={3}>  
                            <div className="exams-item">
                                <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                                </div>
                                <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                            </div>
                </Col>
                <Col sm= {0} md={0} lg={3}>  
                            <div className="exams-item">
                                <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                                </div>
                                <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                            </div>
                    </Col>
                    <Col sm= {0} md={0} lg={3}>  
                            <div className="exams-item">
                                <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                                </div>
                                <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                            </div>
                    </Col>
                    <Col sm= {0} md={0} lg={3}>  
                            <div className="exams-item">
                                <div className="exams-item-img">
                                <img src="/user/default-avatar.png"></img>
                                </div>
                                <div className="exams-item-description"><span>Đề Thi Toán THPT Quốc Gia 2020</span></div>
                            </div>
                    </Col>
                </Row>
            </div>
            <div className="list-exams-footer">
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item >{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Item>{6}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
            </div>
        </div>
    ) 
}
export default Exams