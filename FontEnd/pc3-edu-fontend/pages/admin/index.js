import { Button, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Admin.module.scss";
import AuthGateAdmin from "../../comps/AuthGateAdmin";
const admin = () => {
  return (
    <AuthGateAdmin>
      <div className="admin-home-page">
        <div className="statistical-table">
          <div className="statistical-table-title">
            <span>Bảng thống kê</span>
          </div>
          <div className="statistical-table-content">
            <Row xs={2} md={3} lg={4} className="statistical-list-item">
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>238</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Thành Viên</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>6</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Môn Học</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>120</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Chuyên Đề</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>400</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Bài Học</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>600</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Câu Hỏi</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>320</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Đề Thi</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>123</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Bài Viết</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="statistical-item">
                  <div className="statistical-item-content">
                    <span>800</span>
                    <span>
                      <ion-icon name="people-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="statistical-item-title">
                    <span>Flashcard</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="students-top">
          <div className="students-top-title">
            <span>Danh sách cách học sinh có thành tích cao</span>
          </div>
          <div className="students-top-content">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Ngày sinh</th>
                  <th>Lớp</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Trương Ngọc Trọng</td>
                  <td>ngoctrong1412@gmail.com</td>
                  <td>0358489850</td>
                  <td>18/03/2000</td>
                  <td>12A1</td>
                  <td>
                    <Button variant="primary">Thông tin</Button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Nguyễn Văn An</td>
                  <td>nguyenvana@gmail.com</td>
                  <td>0358489850</td>
                  <td>18/03/2000</td>
                  <td>12A1</td>
                  <td>
                    <Button variant="primary">Thông tin</Button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Trần Thanh Bình</td>
                  <td>thanhbinh1412@gmail.com</td>
                  <td>0358489850</td>
                  <td>18/03/2000</td>
                  <td>12A1</td>
                  <td>
                    <Button variant="primary">Thông tin</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </AuthGateAdmin>
  );
};
admin.layout = "adminLayout";
export default admin;
