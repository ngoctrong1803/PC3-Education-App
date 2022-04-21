import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/dist/client/link";

const Flashcard = () => {
  return (
    <div className="flashcard-page-wrap">
      <div className="flashcard-page-title">
        <span>Flash Card Đã Được Tạo</span>
      </div>
      <div className="flashcard-page-content">
        <Row sm={2} md={3} lg={5} className="list-flashcard-topic-item">
          <Col>
            <Link href="Flashcards/id">
              <div className="flashcard-topic-item">
                <img src="/user/default-avatar.png"></img>
                <div className="flashcard-topic-item-title">
                  <span>Home</span>
                </div>
              </div>
            </Link>
          </Col>
          <Col>
            <div className="flashcard-topic-item">
              <img src="/user/default-avatar.png"></img>
              <div className="flashcard-topic-item-title">
                <span>Music</span>
              </div>
            </div>
          </Col>
          <Col>
            <div className="flashcard-topic-item">
              <img src="/user/default-avatar.png"></img>
              <div className="flashcard-topic-item-title">
                <span>Animal</span>
              </div>
            </div>
          </Col>
          <Col>
            <div className="flashcard-topic-item">
              <img src="/user/default-avatar.png"></img>
              <div className="flashcard-topic-item-title">
                <span>Technology</span>
              </div>
            </div>
          </Col>
          <Col>
            <div className="flashcard-topic">
              <img src="/user/default-avatar.png"></img>
              <div className="flashcard-topic-item-title">
                <span>Your Life</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
Flashcard.layout = "userLayout";
export default Flashcard;
