import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
const login = () =>{
    return (
        <div className="container-fluid background">
        <div className="login-wrap">
            <div className="col-md-4 row-container">
                <form action="">
                    <div className="text-center">
                        <h3 className="fw-bold mt-4 mb-5">Đăng nhập</h3>
                    </div>
                    <div className="form-field">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Tài khoản"
                            id="username"
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Mật khẩu"
                        />
                    </div>
                    <div className="form-check d-flex align-items-center fs-7">
                        <input
                            type="checkbox"
                            className="form-check-input mt-0"
                            id="rememberMe"
                        />
                        <label
                            className="form-check-label ms-2"
                            >Lưu đăng nhập</label>
                    </div>
                    <div className="d-grid mt-4">
                        <Button variant="primary">Đăng nhập</Button>
                    </div>
                    <div className="text-center mt-4">
                        <div className="fs-7">
                            <span>Bạn chưa có tài khoản?</span>
                            <a
                                href="mailto:pc3@gmail.com"
                                className="text-primary"
                                >Đăng ký</a>
                        </div>
                        <hr />
                        <div className="fs-8 mt-2">
                            <a href="about.html">Giới thiệu về PC3</a>
                            <span className="ms-1 me-1">|</span>
                            <a href="about.html">PC3 trên Facebook</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
login.layout = "noLayout"
export default login