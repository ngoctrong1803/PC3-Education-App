const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    console.log(req);
    const token = req.headers.accesstoken;
    console.log(token);
    if (token) {
      const accesstoken = token.split(" ")[1];
      jwt.verify(
        accesstoken,
        process.env.JWT_KEY_ACCESSTOKEN,
        (err, payload) => {
          if (err) {
            res.status(403).json("Token không hợp lệ");
          }
          req.data = payload;
          next();
        }
      );
    } else {
      res.status(401).json("bạn cần phải đăng nhập");
    }
  },
  checkAdmin: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if (req.payload.role == "admin") {
        next();
      } else {
        res.status(403).json("bạn không được phép truy cập");
      }
    });
  },
};

module.exports = authMiddleware;
