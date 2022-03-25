import { Button, Row, Col, Table  } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Admin.module.scss'
const admin = () => {
    return (
        <div className='admin-home-page'>
            <div className='statistical-table'>
                <div className='statistical-table-title'>
                  <span>Bảng thống kê</span>
                </div>
                <div className='statistical-table-content'>
                  <Row xs={2} md={3} lg={4} className="statistical-list-item">
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Thành Viên</span></div>
                            </div>
                        </Col>
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Môn Học</span></div>
                            </div>
                        </Col>
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Chuyên Đề</span></div>
                            </div>
                        </Col>
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Bài Học</span></div>
                            </div>
                        </Col>
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Câu Hỏi</span></div>
                            </div>
                        </Col>
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Đề Thi</span></div>
                            </div>
                        </Col>
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Bài Viết</span></div>
                            </div>
                        </Col>
                        <Col>
                            <div className='statistical-item'>
                              <div className='statistical-item-content'>
                                  <span>238</span>
                                  <span><ion-icon name="people-outline"></ion-icon></span>
                              </div>
                              <div className='statistical-item-title'><span>Flashcard</span></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='students-top'>
              <div className='students-top-title'>
                <span>Danh sách cách học sinh có thành tích cao</span>
              </div>
              <div className='students-top-content'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
              </div>
            </div>
        </div>
    )
}
admin.layout = "adminLayout"
export default admin