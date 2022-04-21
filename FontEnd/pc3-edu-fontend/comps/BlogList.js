// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import required modules
import { Navigation, Scrollbar } from "swiper";

const BlogList = () => {
  return (
    <div className="comps-blog-list">
      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        navigation={true}
        scrollbar={{
          hide: false,
          draggable: true,
        }}
        modules={[Navigation, Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="comps-blog-item">
            <img src="/background/background-mutilcolor.jpg"></img>
            <div className="title">
              <h5>tiêu đề của blog </h5>
            </div>
            <div className="author">Ngoc Trong - 5 giờ trước</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="comps-blog-item">
            <img src="/background/background-prink.jpg"></img>
            <div className="title">
              <h5>tiêu đề của blog nằm ở đây nhé</h5>
            </div>
            <div className="author">Ngoc Trong - 5 giờ trước</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="comps-blog-item">
            <img src="/background/background-login2.jpg"></img>
            <div className="title">
              <h5>tiêu đề của blog nằm ở đây nhé</h5>
            </div>
            <div className="author">Ngoc Trong - 5 giờ trước</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="comps-blog-item">
            <img src="/user/default-avatar.png"></img>
            <div className="title">
              <h5>tiêu đề của blog nằm ở đây nhé</h5>
            </div>
            <div className="author">Ngoc Trong - 5 giờ trước</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default BlogList;
