import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginResetFunc } from "../redux/apiRequest";
import { useRouter } from "next/router";

const AdminNavbar = () => {
  const [stateMenuInfor, setStateMenuInfor] = useState(false);
  const router = useRouter();
  const avatarRef = useRef();
  const handleAvatarClick = () => {
    setStateMenuInfor(!stateMenuInfor);
  };

  const curentAdmin = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    loginResetFunc(dispatch);
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    router.push("/");
  };
  return (
    <>
      <div className="admin-header">
        <Navbar className="admin-header-nav" bg="light" expand="lg">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <span
                  style={{ fontSize: "18px", color: "#fff", fontWeight: "600" }}
                >
                  Trường THPT Phù Cát 3
                </span>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">Search</Button>
              </Form>
              {curentAdmin ? (
                <>
                  {" "}
                  <div
                    className="admin-navbar-user"
                    onClick={handleAvatarClick}
                  >
                    <span>
                      <ion-icon name="notifications-outline"></ion-icon>
                    </span>
                    <img src="/user/default-avatar.png"></img>
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
                          {curentAdmin?.userInfor.fullname}
                        </div>
                        <div className="username">
                          {curentAdmin?.userInfor.email}
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
                  {/* finish user menu */}
                </>
              ) : null}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default AdminNavbar;
