import { Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

const Forum = () => {

    const [show, setShow] = useState('event');
    
    return (
        <>
        <div className='forum-wrap'>
            <Row>
                <Col xs={8} ms={8}>
                        <div className="forum-content">
                            <div className="forum-topic">
                                <ul>
                                    <li onClick={() => {
                                        setShow('event')
                                    }}>Sự Kiện</li>
                                    <li onClick={() => {
                                        setShow('question')
                                    }}>Hỏi Đáp</li>
                                </ul>
                            </div>
                            {show == 'event' ? 
                            <div className='forum-event-wrap'>
                                <div className='post-item'>
                                    <div className='post-item-header'>
                                        <div className='user-avatar'>
                                            <img src='/user/default-avatar.png'></img>
                                        </div>
                                        <div className='user-name'>Truong Ngoc Trong</div>
                                    </div>
                                    <div className='post-item-content'>
                                        <div className='post-title'><h4>Xin chào mọi người đây là bài viết đầu tiên</h4></div>
                                        <div className='post-content'>
                                            <p>Hello anh em, việc hiển thị các keystrokes (tạm dịch: “tổ hợp phím”) trong quá trình làm video hướng dẫn, highlight nội dung bạn đang gõ lên màn hình. Nếu bạn có nhu cầu đó thì đây là bài viết dành cho bạn...</p>
                                            <img src='/user/default-avatar.png'></img>
                                        </div>
                                        
                                    </div>
                                    <div className='post-item-footer'>
                                        12/03/2022 - 4:46 phút
                                    </div>
                                </div>
                                <div className='post-item'>
                                    <div className='post-item-header'>
                                        <div className='user-avatar'>
                                            <img src='/user/default-avatar.png'></img>
                                        </div>
                                        <div className='user-name'>Doan Truong THPT PC3</div>
                                    </div>
                                    <div className='post-item-content'>
                                        <div className='post-title'><h4>Xin chào mọi người đây là bài viết đầu tiên</h4></div>
                                        <div className='post-content'>
                                        <p>Hello anh em, việc hiển thị các keystrokes (tạm dịch: “tổ hợp phím”) trong quá trình làm video hướng dẫn, highlight nội dung bạn đang gõ lên màn hình. Nếu bạn có nhu cầu đó thì đây là bài viết dành cho bạn...</p>
                                        <img src='/user/default-avatar.png'></img>
                                        </div>
                                    
                                    </div>
                                    <div className='post-item-footer'>
                                        12/03/2022 - 4:46 phút
                                    </div>
                                </div>
                            </div> : null
                            }
                             {show == 'question' ? 
                            <div className='forum-question-wrap'>
                                 <div className='forum-question-item'>
                                    <div className='forum-question-item-header'>
                                        <div className='user-avatar'>
                                            <img src='/user/default-avatar.png'></img>
                                        </div>
                                        <div className='user-name'>Truong Ngoc Trong</div>
                                    </div>
                                    <div className='forum-question-item-content'>
                                        <div className='forum-question-title'><h4>Xin chào mọi người đây là bài viết đầu tiên</h4></div>
                                        <div className='forum-question-content'>
                                            <p>Hello anh em, việc hiển thị các keystrokes (tạm dịch: “tổ hợp phím”) trong quá trình làm video hướng dẫn, highlight nội dung bạn đang gõ lên màn hình. Nếu bạn có nhu cầu đó thì đây là bài viết dành cho bạn...</p>
                                        </div>
                                        
                                    </div>
                                    <div className='forum-question-item-footer'>
                                        <div className='forum-question-time'>
                                            12/03/2022 - 4:46 phút
                                        </div>
                                        <div className='forum-question-interactive'>
                                            <ion-icon  class="icon-heart" name="heart-circle-outline"></ion-icon>
                                            <ion-icon  class="icon-comment" name="chatbox-outline"></ion-icon>
                                            <ion-icon  class="icon-sharing" name="arrow-redo-outline"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                            }
                            
                            
                        </div>
                </Col>
                <Col xs={4} ms={4}>
                <div className="forum-slidebar-wrap">
                        <div className="forum-slidebar-content">
                                <div className="slidebar-title">
                                    <ul>
                                        <li>Chủ đề</li>
                                    </ul>
                                </div>
                                <div className='slidebar-content'>
                                    <div className='btn btn-light'>Thông báo đoàn trường</div>
                                    <div className='btn btn-light'>Thể thao</div>
                                    <div className='btn btn-light'>Hoạt động văn nghệ</div>
                                    <div className='btn btn-light'>Ngoại khóa</div>
                                </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    ) 
}
Forum.layout = "userLayout";
export default Forum 