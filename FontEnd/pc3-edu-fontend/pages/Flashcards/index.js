import { Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const Flashcard = () => {
    return (
        <div className="flashcard-page-wrap">
            <div className="flashcard-page-title">
                <span>Flash Card Đã Được Tạo</span>
            </div>
            <div className="flashcard-page-content">
                <Row sm={2} md={3} lg={5} className="list-flashcard-topic-item">
                    <Col>
                        <div className="flashcard-topic-item">
                            <img src="/user/default-avatar.png"></img>
                            <div className="flashcard-topic-item-title">
                                <span>Chủ đề của flash card</span>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="flashcard-topic-item">
                            <img src="/user/default-avatar.png"></img>
                            <div className="flashcard-topic-item-title">
                                <span>Chủ đề của flash card</span>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="flashcard-topic-item">
                            <img src="/user/default-avatar.png"></img>
                            <div className="flashcard-topic-item-title">
                                <span>Chủ đề của flash card</span>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="flashcard-topic-item">
                            <img src="/user/default-avatar.png"></img>
                            <div className="flashcard-topic-item-title">
                                <span>Chủ đề của flash card</span>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="flashcard-topic">
                            <img src="/user/default-avatar.png"></img>
                            <div className="flashcard-topic-item-title">
                                <span>Chủ đề của flash card</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
Flashcard.layout = "userLayout";
export default Flashcard