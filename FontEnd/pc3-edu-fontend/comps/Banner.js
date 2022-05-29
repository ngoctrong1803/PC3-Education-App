import styles from "../styles/Home.module.scss";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Banner = () => {
  return (
    <>
      <Swiper
        speed={1000}
        spaceBetween={5}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/banner2.png"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/banner3.png"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/banner4.png"></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default Banner;
