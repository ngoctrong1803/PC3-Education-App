import Link from "next/link";
import style from "../styles/Home.module.scss";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const sidebarRef = useRef();
  const homeButton = useRef();
  const learningButton = useRef();
  const flashcardButton = useRef();
  const matchButton = useRef();
  const examsButton = useRef();
  const forumButton = useRef();
  const menuToggleRef = useRef();

  const [currentPath, setCurrentPath] = useState("");
  const handleMenuToggleClick = () => {
    sidebarRef.current.classList.toggle("open");
  };
  useEffect(() => {
    const listSidebar = document.querySelectorAll(".sidebar__item");
    const activeItem = (itemClick) => {
      listSidebar.forEach((item) => {
        item.classList.remove("active");
      });
      itemClick.classList.add("active");
    };
    listSidebar.forEach((item) => {
      item.addEventListener("click", function () {
        activeItem(item);
      });
    });
  }, []);
  useEffect(() => {
    const url = window.location.pathname;

    if (
      url.includes("Subjects") ||
      url.includes("Learning") ||
      url.includes("Exercises")
      // url.includes("result-study")
    ) {
      learningButton.current.classList.add("active");
    } else if (url.includes("Flashcards")) {
      flashcardButton.current.classList.add("active");
    } else if (url.includes("Matches")) {
      //matchButton.current.classList.add("active");
    } else if (url.includes("Exams")) {
      examsButton.current.classList.add("active");
    } else if (url.includes("Forum")) {
      forumButton.current.classList.add("active");
    } else {
      homeButton.current.classList.add("active");
    }
  }, []);

  return (
    <>
      <div className="sidebar" ref={sidebarRef}>
        <div
          className="menuToggle"
          ref={menuToggleRef}
          onClick={handleMenuToggleClick}
        ></div>
        <ul className="sidebar__list">
          <li
            ref={homeButton}
            className="sidebar__item "
            style={{ "--clr": "#f44336" }}
          >
            <Link href="/" className="sidebar__link">
              <a>
                <span className="icon">
                  <ion-icon name="home"></ion-icon>
                </span>
                <span className="sidebarText">Trang chủ</span>
              </a>
            </Link>
          </li>
          <li
            ref={learningButton}
            className="sidebar__item "
            style={{ "--clr": "#ffa117" }}
          >
            <Link href="/Subjects" class="sidebar__link">
              <a>
                <span className="icon">
                  <ion-icon name="book"></ion-icon>
                </span>
                <span className="sidebarText">Học Tập</span>
              </a>
            </Link>
          </li>
          {/* <li className="sidebar__item " style={{ "--clr": "#ffdd17" }}>
            <Link href="/Students" className="sidebar__link">
              <a>
                <span className="icon">
                  <ion-icon name="bulb"></ion-icon>
                </span>
                <span className="sidebarText">Học sinh</span>
              </a>
            </Link>
          </li> */}
          <li
            ref={flashcardButton}
            className="sidebar__item "
            style={{ "--clr": "#0fc70f" }}
          >
            <Link href="/Flashcards" className="sidebar__link">
              <a>
                <span className="icon">
                  <ion-icon name="rocket-outline"></ion-icon>
                </span>
                <span className="sidebarText">Flash Card</span>
              </a>
            </Link>
          </li>
          <li
            ref={examsButton}
            className="sidebar__item "
            style={{ "--clr": "#446eb6" }}
          >
            <Link href="/Exams" className="sidebar__link">
              <a>
                <span className="icon">
                  <ion-icon name="newspaper"></ion-icon>
                </span>
                <span className="sidebarText">Luyện thi</span>
              </a>
            </Link>
          </li>
          <li
            ref={forumButton}
            className="sidebar__item "
            style={{ "--clr": "#b145e9" }}
          >
            <Link href="/Forum" className="sidebar__link">
              <a>
                <span className="icon">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span className="sidebarText">Diễn Đàn</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
