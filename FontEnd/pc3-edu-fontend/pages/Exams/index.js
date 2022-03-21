import { Row, Col, SplitButton, Dropdown, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import Rank from '../../comps/Rank';
import Exams from '../../comps/Exams';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
// import required modules
import { Grid, Pagination } from "swiper";

const Exam = () => {
    return (
        <div className="exams-page">
            
            <Row>
                <Col xs={8} ms={8}>
                    <div className="exams-nav">
                    <Form.Select className="select-exam-type" aria-label="Default select example">
                        <option value="1">Khối 12</option>
                        <option value="2">Khối 11</option>
                        <option value="3">Khối 10</option>
                    </Form.Select>
                    <Form.Select className="select-exam-type" aria-label="Default select example">
                        <option>Toán Học</option>
                        <option value="1">Vật Lý</option>
                        <option value="2">Sinh Học</option>
                        <option value="3">Hóa Học</option>
                    </Form.Select>
                    <Form.Select className="select-exam-type" aria-label="Default select example">
                        <option>Kiểm tra 15 phút</option>
                        <option value="1">Kiểm tra 1 tiết</option>
                        <option value="2">Thi học kỳ</option>
                        <option value="3">Thi THPT quốc gia</option>
                    </Form.Select>
                    </div>
                    <div className="exams">
                      <Exams></Exams>
                    </div>

                </Col>
                <Col xs={4} ms={4}>
                    <div className="exams-slidebar-right">
                        <Rank></Rank>
                    </div>
                </Col>
            </Row>
        </div>
    ) 

}
Exam.layout = "userLayout";
export default Exam