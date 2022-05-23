import style from "../styles/Home.module.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <span>
          <ion-icon
            name="school-outline"
            style={{ fontSize: "20px", marginRight: "5px" }}
          ></ion-icon>
          Fanpage Trường THPT Phù Cát 3
        </span>
      </div>
      <div className="footer-right">
        <span>
          {" "}
          <ion-icon name="logo-google"></ion-icon>
        </span>
        <span>
          {" "}
          <ion-icon name="logo-facebook"></ion-icon>
        </span>
      </div>
    </div>
  );
};

export default Footer;
