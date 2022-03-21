import { Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { useEffect } from "react";

const Topic = () =>{


    useEffect (() => {
        const listSidebar = document.querySelectorAll('.flashcard-item');
        // const activeItem = (itemClick) => {
        //     listSidebar.forEach((item) => {
        //         item.classList.remove('show');
        //     })
        //     itemClick.classList.add('show');
        // }
        listSidebar.forEach((item) => {
            item.addEventListener('click', function(){
                // activeItem(item);
                item.classList.toggle('show');
            });
        })
    },[])

    return (
        <div className="flashcard-detail-page-wrap">
            <Row >
                <Col xs={3} ms={3}>
                    <div className="flashcard-detail-slidebar">
                        <div className="flashcard-detail-title">
                            <span>Flash Card</span>
                        </div>
                        <div className="flashcard-detail-function">
                            <ul>
                                <li>Thẻ ghi nhớ</li>
                                <li>trắc nghiệm</li>
                                <li>Viết từ</li>
                                <li>Ghép thẻ</li>
                                <li>Thiên thạch</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xs={9} ms={9}>
                    <div className="flashcard-detail-content">
                    <Swiper
                        pagination={{
                        type: "fraction",
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="flashcard-swiper"
                    >
                        <SwiperSlide>
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>  
                            <div className="flashcard-item">
                                <div className="flashcard-item-inner">
                                    <div className="flashcard-front">front</div>
                                    <div className="flashcard-back">back</div>
                                </div>    
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
Topic.layout = "userLayout";
export default Topic