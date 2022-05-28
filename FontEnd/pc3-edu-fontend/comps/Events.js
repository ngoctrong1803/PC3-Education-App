import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Event = () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const [listBLog, setListBLog] = useState([]);
  async function getListBLog() {
    try {
      const res = await axios.get(host + "/api/blog/list-index");
      setListBLog(res.data.listBlog);
      console.log("res blog", res.data.listBlog);
    } catch (error) {
      const errMessage = error.response.data.message;
      toast.error(errMessage);
    }
  }
  useEffect(() => {
    getListBLog();
  }, []);
  return (
    <>
      <div className="event-list">
        <div className="event-list-title">
          <h5>Bài đăng - Sự kiện</h5>
        </div>
        <div className="event-list-content">
          <ul>
            {listBLog.map((blogItem, index) => {
              return (
                <>
                  <Link href={`/Forum/blog-${blogItem._id}`}>
                    <li>
                      <img src="/helper/blog-icon.png"></img>
                      {blogItem.title}
                    </li>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Event;
