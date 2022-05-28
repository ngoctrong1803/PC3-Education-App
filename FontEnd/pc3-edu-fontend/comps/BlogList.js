// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

// import required modules
import { Navigation, Scrollbar } from "swiper";

const BlogList = () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const [listBlog, setListBlog] = useState([]);
  async function getListBlog() {
    try {
      const res = await axios.get(host + "/api/blog/list-blog-index");
      console.log("blog list:", res.data);
      setListBlog(res.data.listBlog);
    } catch (error) {
      const errMessage = error.response.data.message;
      toast.error(errMessage);
    }
  }
  useEffect(() => {
    getListBlog();
  }, []);
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
        {listBlog.map((blogItem, index) => {
          return (
            <>
              <SwiperSlide key={index + 1}>
                <Link href={`/Forum/blog-${blogItem._id}`}>
                  <div className="comps-blog-item">
                    <img src={`${blogItem.image}`}></img>
                    <div className="title">
                      <h5>
                        {blogItem.title.length < 60
                          ? blogItem.title
                          : blogItem.title.substr(0, 60) + "..."}
                      </h5>
                    </div>
                    <div className="author">
                      {blogItem.author[0].fullname} -{" "}
                      {new Date(blogItem.createdAt).getDate() > 9
                        ? new Date(blogItem.createdAt).getDate()
                        : "0" + new Date(blogItem.createdAt).getDate()}
                      /
                      {new Date(blogItem.createdAt).getMonth() + 1 > 9
                        ? new Date(blogItem.createdAt).getMonth() + 1
                        : "0" + (new Date(blogItem.createdAt).getMonth() + 1)}
                      /{new Date(blogItem.createdAt).getFullYear()}
                    </div>
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
export default BlogList;
