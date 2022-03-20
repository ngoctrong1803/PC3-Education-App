// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import required modules
import { Navigation, Scrollbar } from "swiper";


const SubjectList = (props) => {
    return (
        <div className="comps-subject-list">
            <Swiper
            spaceBetween={5}
            slidesPerView= {3}
            navigation={true} 
            scrollbar={{
                hide: false,
                draggable: true,
            }}
            modules={[Navigation, Scrollbar]}
            className="mySwiper"
            >
                <SwiperSlide>
                    <div className="comps-subject-item">
                        <img src="/subject/MonToanf1.jpg"></img>
                        <span>Toán Học {props.grade}</span>
                    </div>   
                </SwiperSlide>
                <SwiperSlide>
                    <div className="comps-subject-item">
                        <img src="/subject/MonVatLyf1.jpg"></img>
                        <span>Lý Học {props.grade}</span>
                    </div>    
                </SwiperSlide>
                <SwiperSlide>
                    <div className="comps-subject-item">
                        <img src="/subject/MonHoaHocf1.jpg"></img>
                        <span>Hóa Học {props.grade}</span>
                    </div>   
                </SwiperSlide>
                <SwiperSlide>
                    <div className="comps-subject-item">    
                        <img src="/subject/MonTiengAnhf1.jpg"></img>
                        <span>Văn Học {props.grade}</span>
                    </div>   
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
export default SubjectList