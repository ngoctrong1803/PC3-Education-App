import { Row, Col, Form, Button, Table, InputGroup, FormControl } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";

const MatchDetail = () => {
    const [showChatBox, setShowChatBox] = useState(true);
    useEffect(() => {

    },[])
    return (
        <div className="match-detail-page">
             <Row>
                <Col xs={8} md={8}>
                <div className="match-detail-room-master">
                    <div className="room-master-infor">
                        <img src="/user/default-avatar.png"></img>
                        <span>Trương Ngọc Trọng</span>
                    </div>
                    <div className="room-master-func">
                        <Button variant="outline-warning">Bắt đầu</Button>
                        <Button variant="outline-success">Copy Link</Button>
                        <Button variant="outline-danger">Rời Phòng</Button>
                    </div>
                </div>
                <div className="match-detail-nemmbers">
                    <Row xs={2} md={3} lg={4}>
                        <Col>
                            <div className="player-item">
                              <div className="player-item-avatar">
                                  <img src="/user/default-avatar.png"></img>
                              </div>
                              <div className="player-item-name">
                                  <span>Trương Ngọc Trọng</span>
                              </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="player-item">
                              <div className="player-item-avatar">
                                  <img src="/user/default-avatar.png"></img>
                              </div>
                              <div className="player-item-name">
                                  <span>Tuser 1</span>
                              </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="player-item">
                              <div className="player-item-avatar">
                                  <img src="/user/default-avatar.png"></img>
                              </div>
                              <div className="player-item-name">
                                  <span>user 2</span>
                              </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                </Col>
                <Col xs={4} md={4} className="match-page-slidebar-wrap">
                {showChatBox ?
                     <div className="match-page-slidebar">
                     <div className="chat-box">
                         <div className="chat-box-haeder">
                             <span>Trò chuyện</span>
                             <span onClick={() => {setShowChatBox(false)}}> <ion-icon name="chevron-down-outline"></ion-icon></span>
                         </div>
                         <div className="chat-box-content">
                             <div className="user-chat">
                                 <span>xin chào</span>
                             </div>
                             <div className="orther-player-chat">
                                 <img src="/user/default-avatar.png"></img>
                                 <span>xin chào</span>
                             </div>
                         </div>
                         <div className="chat-box-input-content">
                             <InputGroup className="mb-3">
                                 <FormControl
                                 placeholder=""
                                 aria-label=""
                                 aria-describedby=""
                                 />
                                 <Button variant="outline-primary" id="btn-send-message">
                                     Gửi
                                 </Button>
                             </InputGroup>
                         </div>
                     </div>
                    </div>
                 : null}
                {showChatBox == false ?  
                        <div className="chat-box-min">
                                    <span>Trò chuyện</span>
                                    <span onClick={() => {setShowChatBox(true)}}> <ion-icon name="chevron-down-outline"></ion-icon></span>
                        </div> 
                    : null}
               
                </Col>
            </Row>
        </div>
    )
}
MatchDetail.layout = "userLayout";
export default MatchDetail