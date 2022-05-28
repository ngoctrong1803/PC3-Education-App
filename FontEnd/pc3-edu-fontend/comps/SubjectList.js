// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import required modules
import { Navigation, Scrollbar } from "swiper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";

const SubjectList = (props) => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const grade = props.grade;
  const [listSubject, setListSubject] = useState([]);
  async function getListSubject() {
    try {
      const res = await axios.get(
        host + "/api/subjects/list-subject-by-grade/" + grade
      );
      console.log("subject list:", res.data);
      setListSubject(res.data.listSubject);
    } catch (error) {
      const errMessage = error.response.data.message;
      toast.error(errMessage);
    }
  }
  useEffect(() => {
    getListSubject();
  }, []);

  return (
    <div className="comps-subject-list">
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
        {listSubject.map((subjectItem, index) => {
          return (
            <>
              <SwiperSlide>
                <Link href={`/Subjects/${subjectItem.slug}`}>
                  <div className="comps-subject-item">
                    <img src={subjectItem.image}></img>
                    <span>{subjectItem.name}</span>
                  </div>
                </Link>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
};
export default SubjectList;
