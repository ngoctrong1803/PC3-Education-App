import Head from "next/head";
//import { Button } from "bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectList from "../../comps/SubjectList";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
// import required modules
import { Grid, Pagination } from "swiper";
import Link from "next/dist/client/link";

const Subject = () => {
    const [grade, setGrade] = useState(10);

    const changeGrade = (grade) => {
      setGrade(grade);
    }
  
    useEffect(() => {
      console.log("khối đã chọn: ", grade);
    }, [grade]) 
  
    return (
       <div className="subjects-page-wrap">
        <Head>
          <title>Học Tập</title>
        </Head>
        <div className='selection_list'>
            <ul className='nav-grades'>
                <li className='nav-item' id='grade-10'>
                    <Button variant="outline-secondary" onClick={() =>{changeGrade(10)}}>Khối 10</Button>
                </li>
                <li className='nav-item' id='grade-11'>
                    <Button variant="outline-secondary" onClick={() =>{changeGrade(11)}}>Khối 11</Button>  
                </li>
                <li className='nav-item' id='grade-12'>
                    <Button variant="outline-secondary" onClick={() =>{changeGrade(12)}}>Khối 12</Button>
                </li>
            </ul>

        <div className="subject_list">
          <h3>Các môn học khối: {grade}</h3>  
            <Row sm={2} md={3} lg={4}>
              <Col>
                <Link href={'Subjects/'+'Toan-10'}>
                <div className="subject-item-wrap">
                  <div className="subject_item">
                    <img src="/subject/MonToanf1.jpg"></img>
                  </div>
                  <span className="subject-title">Toán học</span>
                </div>
                </Link>
              </Col>
              <Col>
                <Link href={'Subjects/'+'Ly-10'}>
                <div className="subject-item-wrap">
                    <div className="subject_item">
                      <img src="/subject/MonHoaHocf1.jpg"></img>
                    </div>
                    <span className="subject-title">Hóa học</span>
                </div>
                </Link>
              </Col>
              <Col>
                <Link href={'Subjects/'+'Hoa-10'}>
                <div className="subject-item-wrap">
                    <div className="subject_item">
                    <img src="/subject/MonSinhHocf1.jpg"></img>
                    </div>
                    <span className="subject-title">Sinh học</span>
                </div>  
                </Link>
              </Col>
              <Col>
                <Link href={'Subjects/'+'TiengAnh-10'}>
                <div className="subject-item-wrap">
                    <div className="subject_item">
                    <img src="/subject/MonTiengAnhf1.jpg"></img>
                    </div>
                    <span className="subject-title">Tiếng anh</span>
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href={'Subjects/'+'Van-10'}>
                  <div className="subject-item-wrap">
                    <div className="subject_item">
                      <img src="/subject/MonVatLyf1.jpg"></img>
                    </div>
                    <span className="subject-title">Vật lý</span>
                  </div>
                </Link>
              </Col>
            </Row>
        </div>
        </div>
      </div>
    );
}
Subject.layout = "userLayout";
export default Subject