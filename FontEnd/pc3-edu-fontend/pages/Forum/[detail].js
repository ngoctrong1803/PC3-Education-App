import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = () => {
    const [showComment, setShowComment] = useState(false);
    const handelShowComment = () =>{
        setShowComment(!showComment);
        console.log(showComment)
    }
    const router = useRouter();
    const url = router.query.detail
    var type;
    var array;
    var id;
    if (url != null)
    {
        array = url.split("-");
        type = array[0];
        id = array[1];
    }
    useEffect(()=> {
        console.log("url nè:", url);
        console.log("type nè:", type);
        console.log("id nè:", id);

    },[])
    return (
        <div className="forum-wrap">
       
            <Row>
                <Col xs={8} ms={8}>
                    {/* start type = event */}
                    {type == 'event' ? <div className="forum-event-detail">
                        <div className="forum-event-detail-title-user">
                                <img src="/user/default-avatar.png"></img>
                                <span>Truong Ngoc Trong</span>
                        </div>
                        <div className="forum-event-detail-title">
                            <span>Tổ chức văn nghệ chào mừng ngày 20-11</span>
                        </div>
                        <div className="forum-event-detail-content">nội dung dài thiệ là dài.</div>
                        <div className="forum-event-detail-footer">10/11/2022 - 5 giờ trước</div>
                    </div> : null}
                    {/* end type = event */}
                    {/* start type = question */}
                    {type == 'question' ? <div className="forum-question-detail">
                        <div className="forum-question-detail-title">
                            <div className="forum-question-detail-title-user">
                                <img src="/user/default-avatar.png"></img>
                                <span>Trương Ngọc Trọng</span>
                            </div>
                            <span className="question-title">Toán lớp 10</span>
                        </div>
                        <div className="forum-question-detail-content"><span>nội dung bài toán lớp 10</span></div>
                        <div className="forum-question-detail-footer"> 
                            <div className="forum-question-interactive">
                                <ion-icon  class="icon-heart" name="heart-circle-outline"></ion-icon>
                                <ion-icon  class="icon-comment" name="chatbox-outline" onClick={handelShowComment} >
                                </ion-icon>
                                <ion-icon  class="icon-sharing" name="arrow-redo-outline"></ion-icon>
                            </div> 
                        </div>
                        {showComment ?  
                            <div className="forum-question-detail-comment">
                                <div className="forum-question-detail-user-comment">
                                    <div className="forum-question-detail-user-avatar">
                                        <img src="/user/default-avatar.png"></img>
                                    </div>
                                    <InputGroup>
                                        <FormControl
                                            placeholder="Viết bình luận"
                                            aria-label="Recipient's username with two button addons"
                                            />
                                                <Button variant="outline-secondary"><ion-icon name="image-outline"></ion-icon></Button>
                                                <Button variant="primary">Bình Luận</Button>
                                    </InputGroup>
                                </div>
                                <div className="forum-question-detail-user-commented-wrap">
                                    <ul>
                                        <li>
                                            <div className="forum-question-detail-user-commented">
                                                <div className="forum-question-detail-user-commented-title">
                                                    <img src="/user/default-avatar.png"></img>
                                                    <span>Trương Ngọc Trọng</span>
                                                </div>
                                                <div className="forum-question-detail-user-commented-content">
                                                    <span>bài này giải như thế này nè</span>
                                                </div>
                                                <div className="forum-question-detail-user-commented-footer">
                                                    <ion-icon  class="icon-heart" name="heart-circle-outline"></ion-icon>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="forum-question-detail-user-commented">
                                                <div className="forum-question-detail-user-commented-title">
                                                    <img src="/user/default-avatar.png"></img>
                                                    <span>Nguyễn Văn A</span>
                                                </div>
                                                <div className="forum-question-detail-user-commented-content">
                                                    <span>bài này bạn áp dụng công thức là ra à</span>
                                                </div>
                                                <div className="forum-question-detail-user-commented-footer">
                                                    <ion-icon  class="icon-heart" name="heart-circle-outline"></ion-icon>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div> : null }
                       
                    </div> : null}
                    {/* end type = question */}
                </Col>
                <Col xs={4} ms={4}>
                {type == 'event' ? 
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
                                : null}
                {type == 'question' ? 
                                <div className="forum-slidebar-wrap">
                                    <div className="forum-slidebar-content">
                                            <div className="slidebar-title">
                                                <ul>
                                                    <li>Chủ đề</li>
                                                </ul>
                                            </div>
                                            <div className='slidebar-content'>
                                                <div className='btn btn-light'>Toán lớp 10</div>
                                                <div className='btn btn-light'>Vật lý 12</div>
                                                <div className='btn btn-light'>Văn học</div>
                                                <div className='btn btn-light'>Hóa học</div>
                                            </div>
                                    </div>
                                </div>
                                : null}
                </Col>
            </Row>
        </div>
    )
}
Detail.layout = "userLayout";
export default Detail