import Link from "next/link";
import style from "../styles/Home.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { loginResetFunc } from "../redux/apiRequest";


const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("header -----------------------------");
  });
  const [stateMenuInfor, setStateMenuInfor] = useState(false);

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  useEffect(() => {
    console.log("-------------------curent user ", currentUser);
  }, [currentUser]);
  const avatarRef = useRef();
  const handleAvatarClick = () => {
    setStateMenuInfor(!stateMenuInfor);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    loginResetFunc(dispatch);
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
  };
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src="/background/background-mutilcolor.jpg" alt="" />
          <h4>Trường THPT Phù Cát 3</h4>
        </div>
        <div className="header__body">
          <div className="header__search">
            <ion-icon name="search"></ion-icon>
            <input type="text" name="search" placeholder="Tìm kiếm" />
          </div>
        </div>
        <div className="header__actions">
          {currentUser?.userInfor.fullname ? (
            <>
              <div className="header__actions__noti">
                <ion-icon name="notifications"></ion-icon>
              </div>
              <div
                className="header__actions__avatar"
                onClick={handleAvatarClick}
              >
                <img src="/user/default-avatar.png" alt="" />
              </div>
              {/* start user menu */}
              <div
                className={
                  stateMenuInfor
                    ? "header__actions__userMenu shadow show"
                    : "header__actions__userMenu shadow "
                }
              >
                <div className="user">
                  <div className="user__avatar">
                    <img src="/user/default-avatar.png" alt="" />
                  </div>
                  <div className="user__info">
                    <div className="name">
                      {currentUser?.userInfor.fullname}
                    </div>
                    <div className="username">
                      {currentUser?.userInfor.email}
                    </div>
                  </div>
                </div>
                <hr />
                <ul className="list">
                  <li className="list__item">
                    <a className="list__link" href="">
                      Thông tin cá nhân
                    </a>
                  </li>
                  {currentUser?.userInfor.role == "admin" ||
                  currentUser?.userInfor.role == "teacher" ? (
                    <Link href="/admin">
                      <li className="list__item">
                        <a className="list__link" href="">
                          Trang quản lý
                        </a>
                      </li>
                    </Link>
                  ) : null}
                  <li className="list__item">
                    <a className="list__link" href="">
                      Kết quả học tập
                    </a>
                  </li>
                </ul>
                <hr />
                <ul className="list">
                  <li className="list__item" onClick={handleLogout}>
                    <a className="list__link" href="">
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button variant="primary">đăng nhập</Button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
