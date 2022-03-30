import {
  Button,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Form,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";

const content = () => {
  return (
    <div className="subject-content-page">
      <div className="subject-content-title">
        <span>Nội dung nôn học</span>
        <br></br>
        <h6>7 chương - 32 bài học</h6>
      </div>
      <div className="subject-content-content">
        <div className="subject-content-item">
          {/* start unit item */}
          <div className="subject-content-item-unit">
            <div className="subject-content-item-unit-title-wrap">
              <span className="subject-content-item-unit-title">
                Chương 1: Đồng Biến Nghịch Biến Của Hàm Số (5 bài học)
              </span>
              <span className="subject-content-item-unit-edit">
                <ion-icon name="build-outline"></ion-icon>
              </span>
              <span className="subject-content-item-unit-delete">
                <ion-icon name="trash-outline"></ion-icon>
              </span>
            </div>
            <ul>
              <li className="subject-content-item-lession">
                <Row>
                  <Col
                    xs={8}
                    md={8}
                    lg={8}
                    className="subject-content-item-lession-title"
                  >
                    <span>Bài 1. sự đồng biến</span>
                    <span className="subject-content-item-unit-edit">
                      <ion-icon name="build-outline"></ion-icon>
                    </span>
                    <span className="subject-content-item-unit-delete">
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </Col>
                  <Col xs={4} md={4} lg={4}>
                    <Link href="theory">
                      <Button variant="primary">Lý thuyết</Button>
                    </Link>
                    <Link href="exercise">
                      <Button variant="primary">Bài tập</Button>
                    </Link>
                    <Button variant="primary">Thống kê</Button>
                  </Col>
                </Row>
              </li>
              <li className="subject-content-item-lession">
                <Row>
                  <Col
                    xs={8}
                    md={8}
                    lg={8}
                    className="subject-content-item-lession-title"
                  >
                    <span>Bài 2. đồ thị hàm số</span>
                    <span className="subject-content-item-unit-edit">
                      <ion-icon name="build-outline"></ion-icon>
                    </span>
                    <span className="subject-content-item-unit-delete">
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </Col>
                  <Col xs={4} md={4} lg={4}>
                    <Button variant="primary">Lý thuyết</Button>
                    <Button variant="primary">Bài tập</Button>
                    <Button variant="primary">Thống kê</Button>
                  </Col>
                </Row>
              </li>

              <li>
                {" "}
                <Button variant="primary">Thêm mới bài học</Button>
              </li>
            </ul>
          </div>
          {/* end unit item */}
          {/* start unit item */}
          <div className="subject-content-item-unit">
            <div className="subject-content-item-unit-title-wrap">
              <span className="subject-content-item-unit-title">
                Chương 2: Nguyên Hàm Đạo Hàm (5 bài học)
              </span>
              <span className="subject-content-item-unit-edit">
                <ion-icon name="build-outline"></ion-icon>
              </span>
              <span className="subject-content-item-unit-delete">
                <ion-icon name="trash-outline"></ion-icon>
              </span>
            </div>
            <ul>
              <li className="subject-content-item-lession">
                <Row>
                  <Col
                    xs={8}
                    md={8}
                    lg={8}
                    className="subject-content-item-lession-title"
                  >
                    <span>Bài 1. sự đồng biến</span>
                    <span className="subject-content-item-unit-edit">
                      <ion-icon name="build-outline"></ion-icon>
                    </span>
                    <span className="subject-content-item-unit-delete">
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </Col>
                  <Col xs={4} md={4} lg={4}>
                    <Button variant="primary">Lý thuyết</Button>
                    <Button variant="primary">Bài tập</Button>
                    <Button variant="primary">Thống kê</Button>
                  </Col>
                </Row>
              </li>
              <li className="subject-content-item-lession">
                <Row>
                  <Col
                    xs={8}
                    md={8}
                    lg={8}
                    className="subject-content-item-lession-title"
                  >
                    <span>Bài 2. đồ thị hàm số</span>
                    <span className="subject-content-item-unit-edit">
                      <ion-icon name="build-outline"></ion-icon>
                    </span>
                    <span className="subject-content-item-unit-delete">
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </Col>
                  <Col xs={4} md={4} lg={4}>
                    <Button variant="primary">Lý thuyết</Button>
                    <Button variant="primary">Bài tập</Button>
                    <Button variant="primary">Thống kê</Button>
                  </Col>
                </Row>
              </li>

              <li>
                {" "}
                <Button variant="primary">Thêm mới bài học</Button>
              </li>
            </ul>
          </div>
          {/* end unit item */}
          <div className="btn-add-new-unit-wrap">
            <Button variant="warning">Thêm mới chương mới</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
content.layout = "adminLayout";
export default content;
