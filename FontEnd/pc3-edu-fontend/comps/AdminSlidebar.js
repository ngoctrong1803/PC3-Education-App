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
import Link from "next/dist/client/link";

const AdminSlidebar = () => {
  useEffect(() => {
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
        <div className="admin-slidebar-header">
          <span>
            <ion-icon name="school-outline"></ion-icon>
          </span>
          <span>PC3 Admin</span>
        </div>
        <div className="admin-slidebar-content">
          <div className="admin-slidebar-user">
            <img src="/user/default-avatar.png"></img>
            <div className="admin-slidebar-user-infor">
              <span>Trương Ngọc Trọng</span>
            </div>
          </div>
          <div className="admin-slidebar-functions">
            <ul>
              <Link href="/admin/users">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="people-outline"></ion-icon>
                  </span>
                  <span>Quản lý người dùng</span>
                </li>
              </Link>
              <Link href="/admin/subjects">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="book"></ion-icon>
                  </span>
                  <span>Quản lý học tập</span>
                </li>
              </Link>
              <Link href="/admin/flashcards">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="rocket-outline"></ion-icon>
                  </span>
                  <span>Quản lý flashcard</span>
                </li>
              </Link>

              <Link href="/admin/exams">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="newspaper"></ion-icon>
                  </span>
                  <span>Quản lý luyện đề</span>
                </li>
              </Link>
              <Link href="/admin/forum">
                <li className="admin-slidebar-function">
                  <span>
                    <ion-icon name="people-circle-outline"></ion-icon>
                  </span>
                  <span>Quản lý diễn Đàn</span>
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
