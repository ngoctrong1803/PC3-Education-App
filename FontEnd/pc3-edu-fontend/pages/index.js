import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import Banner from '../comps/Banner'
import SubjectList from '../comps/SubjectList'
import styles  from '../styles/Home.module.scss';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Rank from '../comps/Rank'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from '../comps/Questions'
import Event from '../comps/Events'
import BlogList from '../comps/BlogList'


export default function Home() {


  const [grade, setGrade] = useState(10);

  const changeGrade = (grade) => {
    setGrade(grade);
  }

  useEffect(() => {
    console.log("khối đã chọn: ", grade);
  }, [grade]) 

  return (
    <>
    <Head>
      <>
        <title>Trang chủ</title>
        {/* add img in title bar */}
        <link rel="shortcut icon" href="https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.18172-8/22382352_1885071128422367_293877343415302519_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=p8hyhQioNJYAX_N4WRD&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8Nce2WFC4rdY9GU_9mGu6jZP6nDlNWg9e25g9Rx-y6hw&oe=62432F21"></link>
      </>
    </Head>
    <div className={styles.home_wrapper}>
        <div className={styles.banner_wrapper}>
          <div className={styles.banner}>
               {/* image of slider start */}
                  <Banner></Banner>
                {/* image of slider end */}
          </div>

        </div>
        <div className={styles.content_wrapper}>
            <div className={styles.content}>
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
                  {/* start swiper */}
                  <div className='selection_list_title'>
                      <h4>môn học khối {grade}</h4>
                      <a href='#'>xem tất cả</a>
                  </div>
                  {grade==10 ?  <SubjectList grade="10"></SubjectList> : null}
                  {grade==11 ?  <SubjectList grade="11"></SubjectList> : null}
                  {grade==12 ?  <SubjectList grade="12"></SubjectList> : null}
                  {/* end swiper */}
                </div>
                <div className='selection_list'>
                  <div className='selection_list_title'>
                    <h4>Các bài viết nổi bậc</h4>
                      <a href='#'>xem tất cả</a>
                  </div>
                  <BlogList></BlogList>
                </div> 
            </div>
            <div className={styles.sidebar_right}>
              <Rank></Rank>
              <div className='mt-4'>
                <Question></Question>
              </div>
              <div className='mt-4'>
                <Event></Event>
              </div>
            </div>
        </div>
    </div>
    </>
   
  )
}
