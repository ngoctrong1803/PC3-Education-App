import AdminNavbar from "../AminNavbar";
import AdminSlidebar from "../AdminSlidebar";
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
import Style from "./Style";
import AuthGateAdmin from "../Gate/AuthGateAdmin";
const AdminLayout = ({ children }) => {
  const [stateMenuInfor, setStateMenuInfor] = useState(false);

  const avatarRef = useRef();
  const handleAvatarClick = () => {
    setStateMenuInfor(!stateMenuInfor);
  };

  return (
    <AuthGateAdmin>
      <Style>
        <div className="admin-page">
          <Row>
            <Col xs={2} md={2} lg={2}>
              <AdminSlidebar></AdminSlidebar>
            </Col>
            <Col xs={10} md={10} lg={10}>
              <AdminNavbar></AdminNavbar>
              <div className="admin-content">{children}</div>
            </Col>
          </Row>
        </div>
      </Style>
    </AuthGateAdmin>
  );
};
export default AdminLayout;
