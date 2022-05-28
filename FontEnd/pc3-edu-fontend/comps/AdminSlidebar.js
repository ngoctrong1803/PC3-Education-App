import {
  Button,
  Row,
  Col,
  Accordion,
  ListGroup,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/dist/client/link";
import axios from "axios";

const AdminSlidebar = () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const [listRole, setListRole] = useState([]);
  async function getRole() {
    try {
      const res = await axios.get(host + "/api/role/list");
      console.log("kkkkkkkk", res.data.listRole);
      setListRole(res.data.listRole);
    } catch (error) {}
  }
  useEffect(() => {
    getRole();
    const listSidebar = document.querySelectorAll(".admin-slidebar-function");
    const activeItem = (itemClick) => {
      listSidebar.forEach((item) => {
        item.classList.remove("show");
      });
      itemClick.classList.add("show");
    };
    listSidebar.forEach((item) => {
      item.addEventListener("click", function () {
        activeItem(item);
      });
    });
  }, []);
  return (
    <>
      <div className="admin-slidebar">
        <Link href={"/admin"}>
          <div className="admin-slidebar-header">
            <span>
              <ion-icon name="school-outline"></ion-icon>
            </span>
            <span>PC3 Admin</span>
          </div>
        </Link>

        <div className="admin-slidebar-content">
          <div className="admin-slidebar-user">
            <img src={currentUser?.userInfor?.avatar}></img>
            <div className="admin-slidebar-user-infor">
              <span>{currentUser?.userInfor?.fullname}</span>
              <span style={{ color: "#fdc867", fontSize: "17px" }}>
                {listRole.map((item) => {
                  if (item?.roleName === currentUser?.userInfor?.role) {
                    return <>- {item.description} -</>;
                  }
                })}
              </span>
            </div>
          </div>
          <div className="admin-slidebar-functions">
            <ul>
              <Link href="/admin/users">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="people-outline"></ion-icon>
                  </span>
                  <span>Người dùng</span>
                </li>
              </Link>
              <Link href="/admin/subjects">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="book"></ion-icon>
                  </span>
                  <span>Học tập</span>
                </li>
              </Link>
              <Link href="/admin/flashcards">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="rocket-outline"></ion-icon>
                  </span>
                  <span>Flashcard</span>
                </li>
              </Link>

              <Link href="/admin/exams">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="newspaper"></ion-icon>
                  </span>
                  <span>Luyện đề</span>
                </li>
              </Link>
              <Link href="/admin/forum">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="people-circle-outline"></ion-icon>
                  </span>
                  <span>Diễn Đàn</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminSlidebar;
