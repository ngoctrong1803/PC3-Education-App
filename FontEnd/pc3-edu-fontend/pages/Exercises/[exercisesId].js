import { Col, Row, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
import Rank from "../../comps/Rank";
import { useEffect, useState } from "react";
const Exercise = () => {


    const [exerciseGuideNav, setExerciseGuideNav] = useState('description');
    useEffect(() => {
        const buttonNav = document.querySelectorAll('.btn-nav');
        const activeItem = (itemClick) => {
            buttonNav.forEach((item) => {
                item.classList.remove('show');
            })
            itemClick.classList.add('show');
        }
        buttonNav.forEach((item) => {
            item.addEventListener('click', function(){
                activeItem(item);
            });
        })
    }, [])

    return (
        <>
            <Row>
                <Col xs={5} md={5} >
                    <div className="exercise-guide-wrap">
                        <div className="exercise-guide-title">
                            <h3>sự đồng biến nghịch biến của hàm số</h3>
                        </div>
                        <div className="exercise-guide-nav">
                            <ul>
                                <li className="btn-nav"><button onClick={() => {setExerciseGuideNav('description')}}>Mô tả</button></li>
                                <li className="btn-nav"><button onClick={() => {setExerciseGuideNav('rank')}}>Bảng xếp hạng</button></li>
                                <li className="btn-nav"><button onClick={() => {setExerciseGuideNav('help')}}>Trợ giúp</button></li>
                            </ul>
                            {exerciseGuideNav == 'description' ?  <div className="exercise-guide-description">đây là phần mô tả bài tập</div> : null }
                            {exerciseGuideNav == 'rank' ?  <div className="exercise-guide-rank">đây là phần bảng xếp hạng</div> : null }
                            {exerciseGuideNav == 'help' ?  <div className="exercise-guide-help">đây là phần trợ giúp</div> : null }
                        </div>
                        <div className="exercise-guide-current-result">
                            <Row>
                                <Col xs= {4} md={4}>
                                <div className="exercise-mark">
                                    <div className="top">Điểm</div>
                                    <div className="bottom">0/100</div>
                                </div>
                                </Col>
                                <Col xs= {4} md={4}>
                                <div className="exercise-answered">
                                    <div className="top">Hoàn thành</div>
                                    <div className="bottom">0/10</div>
                                </div>
                                </Col>
                                <Col xs= {4} md={4}>
                                <div className="exercise-timer">
                                    <div className="top">Thời gian</div>
                                    <div className="bottom">00:00:00 </div>
                                </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={7} md={7} >
                    <div className="exercise-wrap">
                        <div className="exercise-type">Nhận biết</div>
                        <div className="exercise-title mt-4"><h3>câu 1: như thế nào là hàm số nghịch biến </h3></div>
                        <div className="exercise-content">
                            <Form className="answers-of-question">
                                <div className="answer">
                                    <Form.Check
                                        inline
                                        label="A. Câu trả lời thứ 1"
                                        name="group1"
                                        type='radio'
                                        id={`inline-radio-1`}
                                    />
                                </div>
                                <div className="answer">
                                    <Form.Check
                                        inline
                                        label="B. Câu trả lời thứ 2"
                                        name="group1"
                                        type='radio'
                                        id={`inline-radio-2`}
                                    />
                                </div>
                                <div className="answer">
                                    <Form.Check
                                        inline
                                        label="C. câu trả lời thứ 3"
                                        name="group1"
                                        type='radio'
                                        id={`inline-radio-3`}
                                    />
                                </div>
                                <div className="answer">
                                    <Form.Check
                                        inline
                                        label="D. câu trả lời thứ 4"
                                        name="group1"
                                        type='radio'
                                        id={`inline-radio-3`}
                                    />
                                </div>
                            </Form>
                        </div>
                        <div className="exercise-footer">
                                <Button variant="warning"><ion-icon name="sunny-outline"></ion-icon><span>Gợi ý</span></Button>
                                <Button variant="success">Câu tiếp theo</Button>
                        </div>
                    </div>
                </Col>
            </Row>
           
        </>
    ) 
}
export default Exercise 